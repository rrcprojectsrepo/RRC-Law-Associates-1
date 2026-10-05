const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const chatRouter = require('./src/routes/chat');
const { PORT, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } = require('./src/config');

const app = express();
app.set('trust proxy', 1);
const listeningPort = PORT;
const localDevelopmentOrigins = new Set([
  'http://localhost:5501',
  'http://127.0.0.1:5501'
]);

app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: []
      }
    }
  })
);

app.use((req, res, next) => {
  const origin = req.get('Origin');
  if (!origin || !localDevelopmentOrigins.has(origin)) {
    return next();
  }

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.vary('Origin');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.sendStatus(204);
  }

  next();
});

app.use(
  express.json({
    limit: '1mb',
    strict: true
  })
);

app.use(
  rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS,
    max: RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests. Please try again later.'
    }
  })
);

app.use((req, res, next) => {
  if (req.url === '/api') {
    req.url = '/';
  } else if (req.url.startsWith('/api/')) {
    req.url = req.url.slice('/api'.length);
  }
  next();
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok'
  });
});

app.use('/chat', chatRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Not found.'
  });
});

app.use((err, req, res, next) => {
  if (err?.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON request body.'
    });
  }

  if (err?.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'Request body is too large.'
    });
  }

  const diagnostic = {
    name: typeof err?.name === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(err.name) ? err.name : undefined,
    status: Number.isInteger(err?.status) ? err.status : undefined,
    code: typeof err?.code === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(err.code) ? err.code : undefined,
    type: typeof err?.type === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(err.type) ? err.type : undefined
  };
  console.error('Unhandled server error', diagnostic);
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.'
  });
});

if (require.main === module) {
  app.listen(listeningPort, '0.0.0.0', () => {
    console.log(`RRC Law AI server listening on port ${listeningPort}`);
  });
}

module.exports = app;
