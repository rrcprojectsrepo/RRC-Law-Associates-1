const form = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const btn = document.getElementById("submitBtn");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  btn.innerText = "Submitting...";
  btn.disabled = true;

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.innerText = "Consultation Request Submitted";

    form.reset();
    btn.innerText = "Submit Request";
    btn.disabled = false;

    setTimeout(() => {
      toast.style.opacity = "0";
    }, 3000);
  }, 1000);
});

// footer
// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize Lucide icons
lucide.createIcons();


//header
lucide.createIcons();

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    // Open Mobile Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
        });
    }

    // Close Mobile Menu (X button)
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    }

    // Close Menu on Background Click
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('open')) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        }
    });

    // Smooth scroll for old elements that used data-link
    document.querySelectorAll("[data-link]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = document.querySelector(btn.dataset.link);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
        if (mobileMenu) {
            mobileMenu.classList.remove("open");
        }
      });
    });
});

// hero section
lucide.createIcons();

// Smooth scroll
document.querySelectorAll("[data-link]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.link);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
//ptactice section
lucide.createIcons();

//testimonial
lucide.createIcons();

const testimonials = [
  {
    name: "Ramesh Krishnan",
    location: "Chennai",
    text: "The team at Advocate Law Firm handled my property dispute with exceptional professionalism. Their expertise delivered a favorable judgment.",
    rating: 5,
  },
  {
    name: "Meena Sundaram",
    location: "Coimbatore",
    text: "The advocates guided me through a difficult divorce with empathy and clarity. Truly client-focused and professional.",
    rating: 5,
  },
  {
    name: "Karthik Rajan",
    location: "Madurai",
    text: "Their strategic corporate advice saved my business during a major dispute. Highly recommended.",
    rating: 5,
  },
  {
    name: "Anjali Venkat",
    location: "Trichy",
    text: "They handled my consumer complaint efficiently and secured full compensation. Excellent service!",
    rating: 5,
  },
];

let index = 0;

const text = document.getElementById("testimonialText");
const nameEl = document.getElementById("name");
const locationEl = document.getElementById("location");
const starsEl = document.getElementById("stars");
const dotsEl = document.getElementById("dots");

function render() {
  const t = testimonials[index];

  text.style.animation = "none";
  void text.offsetWidth;
  text.style.animation = "fadeSlide 0.6s forwards";

  text.textContent = `"${t.text}"`;
  nameEl.textContent = t.name;
  locationEl.textContent = t.location;

  starsEl.innerHTML = "";
  [...Array(t.rating)].forEach(() => {
    const star = document.createElement("span");
    star.textContent = "★";
    starsEl.appendChild(star);
  });

  dotsEl.innerHTML = "";
  testimonials.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === index) dot.classList.add("active");
    dot.onclick = () => { index = i; render(); };
    dotsEl.appendChild(dot);
  });
}

document.querySelector(".next").onclick = () => {
  index = (index + 1) % testimonials.length;
  render();
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + testimonials.length) % testimonials.length;
  render();
};

render();
//stats scroll


//testimonial scroll
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonial-slider");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  // Safety check
  if (!slider || slides.length === 0) {
    console.error("Testimonial slider elements not found");
    return;
  }

  let index = 0;
  const gap = 40; // must match CSS gap
  const autoDelay = 8000; // 8 seconds (recommended)

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + gap;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  // NEXT button
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateSlider();
      resetAutoScroll();
    });
  }

  // PREV button
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
      resetAutoScroll();
    });
  }

  // AUTO SCROLL
  let autoScroll = setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
  }, autoDelay);

  // Reset auto scroll on interaction
  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
      index = (index + 1) % slides.length;
      updateSlider();
    }, autoDelay);
  }

  // Update on resize
  window.addEventListener("resize", updateSlider);

  // Initial position
  updateSlider();
});

//testimonial


//conatct section
const reveals = document.querySelectorAll(".reveal-left, .reveal-right, .reveal-up");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("active");
      }
    });
  },
  { threshold:0.2 }
);

reveals.forEach(el => observer.observe(el));


//footer
lucide.createIcons();

// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

//changable gif for experience
const icons = [
  "icons/award.gif",
  "icons/scale.gif",
  "icons/shield.gif"
];

let i = 0;
setInterval(() => {
  i = (i + 1) % icons.length;
  document.getElementById("iconSwap").src = icons[i];
}, 2000);

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonial-slider");
  const slides = document.querySelectorAll(".testimonial");
  const prevBtn = document.querySelector(".test.prev");
  const nextBtn = document.querySelector(".test.next");

  if (!slider || slides.length === 0) {
    console.error("Slider or testimonials not found");
    return;
  }

  let index = 0;
  const gap = 40;

  function updateSlider() {
    const slideWidth = slides[0].offsetWidth + gap;
    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  nextBtn?.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  prevBtn?.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // AUTO SCROLL (slow & premium)
  setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
  }, 8000);

  window.addEventListener("resize", updateSlider);
});

window.addEventListener("load", () => {

  const counters = document.querySelectorAll(".stat-card h3");

  counters.forEach(counter => {
    const text = counter.textContent.trim();
    const number = parseInt(text.replace(/\D/g, ""));
    const suffix = text.replace(/[0-9]/g, "");
    let current = 0;

    const increment = Math.max(1, Math.floor(number / 80));

    const updateCount = () => {
      current += increment;

      if (current < number) {
        counter.textContent = current + suffix;
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = number + suffix;
      }
    };

    updateCount();
  });

});


// Function to accept disclaimer
function acceptDisclaimer() {
    localStorage.setItem("disclaimerAccepted", "yes"); // store in localStorage
    document.getElementById("disclaimerOverlay").style.display = "none"; // hide popup
}

// Function to close popup without accepting
function closeDisclaimer() {
    document.getElementById("disclaimerOverlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("advocatesGrid");
    const cards = document.querySelectorAll(".advocate-card");
    const prevBtn = document.querySelector(".adv-prev");
    const nextBtn = document.querySelector(".adv-next");

    let currentIndex = 0;
    const gap = 24;
    const autoDelay = 5000; // 5 seconds per slide
    let autoScrollInterval;

    function updateSlider() {
        const cardWidth = cards[0].offsetWidth + gap;
        grid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function moveNext() {
        const visibleCards = window.innerWidth > 968 ? 3 : (window.innerWidth > 768 ? 2 : 1);
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the first advocate
        }
        updateSlider();
    }

    function movePrev() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const visibleCards = window.innerWidth > 968 ? 3 : (window.innerWidth > 768 ? 2 : 1);
            currentIndex = cards.length - visibleCards;
        }
        updateSlider();
    }

  }); 

  
    document.addEventListener('DOMContentLoaded', function() {
    // Select the Practice Areas link
    const practiceLink = document.querySelector('.dropdown-toggle[href="nri-services.html"]');

    if (practiceLink && window.innerWidth > 992) {
        practiceLink.addEventListener('click', function(e) {
            // Redirect to the page immediately on click
            window.location.href = this.getAttribute('href');
        });
    }
});

    document.addEventListener('DOMContentLoaded', function() {
    // Select the Practice Areas link
    const practiceLink = document.querySelector('.dropdown-toggle[href="sectors.html"]');

    if (practiceLink && window.innerWidth > 992) {
        practiceLink.addEventListener('click', function(e) {
            // Redirect to the page immediately on click
            window.location.href = this.getAttribute('href');
        });
    }
});

    document.addEventListener('DOMContentLoaded', function() {
    // Select the Practice Areas link
    const practiceLink = document.querySelector('.dropdown-toggle[href="practiceareas.html"]');

    if (practiceLink && window.innerWidth > 992) {
        practiceLink.addEventListener('click', function(e) {
            // Redirect to the page immediately on click
            window.location.href = this.getAttribute('href');
        });
    }
});