module.exports = {
  PORT: Number(process.env.PORT || 3000),
  GROQ_MODEL: process.env.GROQ_MODEL || '',
  MESSAGE_MAX_LENGTH: Number(process.env.MESSAGE_MAX_LENGTH || 1200),
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX || 30)
};
