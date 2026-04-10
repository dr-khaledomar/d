const firebaseConfig = {
  apiKey: "AIzaSyAci1p0uVxkZI8K3UIxsmRXDXIRsdXNct8",
  authDomain: "visitor-counter-5c400.firebaseapp.com",
  databaseURL: "https://visitor-counter-5c400-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "visitor-counter-5c400",
  storageBucket: "visitor-counter-5c400.firebasestorage.app",
  messagingSenderId: "884458096546",
  appId: "1:884458096546:web:3f5444a1753898aab954fb",
  measurementId: "G-E0CBN6EHSG"
};

const firebaseApp = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

window.trackClick = function trackClick(platform) {
  const ref = db.ref(`clicks/${platform}`);
  ref.transaction(current => (current || 0) + 1);
};

const scrollBtn = document.getElementById("scrollToTopBtn");
const whatsappToggleBtn = document.getElementById("whatsappToggleBtn");
const whatsappFormWrapper = document.getElementById("whatsappFormWrapper");
const whatsappForm = document.getElementById("whatsappForm");
const whatsappCloseBtn = document.getElementById("whatsappCloseBtn");
const childBirthDateInput = document.getElementById("childBirthDate");
const childApproxAgeInput = document.getElementById("childApproxAge");
const adminBtn = document.getElementById("adminBtn");
const showMoreBtn = document.getElementById("showMoreBtn");
const testimonialSection = document.getElementById("testimonials");
const intro = document.querySelector(".testimonial-intro");
const mobileWhatsappBtn = document.getElementById("mobileWhatsappBtn");
const mobileContactBar = document.querySelector(".mobile-contact-bar");
const reviewLink = document.getElementById("reviewLink");
const encodedPassword = "b3Blbml0MTIzNA==";

function openWhatsappForm() {
  if (!whatsappFormWrapper || !whatsappToggleBtn) return;
  whatsappFormWrapper.removeAttribute("hidden");
  whatsappToggleBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  whatsappForm?.querySelector("input")?.focus();
}

function closeWhatsappForm() {
  if (!whatsappFormWrapper || !whatsappToggleBtn) return;
  whatsappFormWrapper.setAttribute("hidden", "");
  whatsappToggleBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

function getTodayDateString() {
  return new Date().toISOString().split("T")[0];
}

function formatChildAge(dateValue) {
  if (!dateValue) return "غير محدد";

  const birthDate = new Date(dateValue);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (today.getDate() < birthDate.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const ageParts = [];

  if (years > 0) {
    ageParts.push(`${years} سنة`);
  }

  if (months > 0) {
    ageParts.push(`${months} شهر`);
  }

  if (ageParts.length === 0) {
    ageParts.push("أقل من شهر");
  }

  return ageParts.join(" و ");
}

function countMeaningfulChars(value) {
  return (value || "").replace(/\s+/g, "").length;
}

function isValidChildName(value) {
  const cleaned = (value || "").trim();
  return /^[\u0600-\u06FFa-zA-Z\s]+$/.test(cleaned) && countMeaningfulChars(cleaned) >= 5;
}

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (childBirthDateInput) {
  childBirthDateInput.max = getTodayDateString();
}

if (whatsappToggleBtn) {
  whatsappToggleBtn.addEventListener("click", openWhatsappForm);
}

if (mobileWhatsappBtn) {
  mobileWhatsappBtn.addEventListener("click", openWhatsappForm);
}

if (mobileContactBar && reviewLink) {
  const toggleMobileBarVisibility = () => {
    if (window.innerWidth > 768) {
      mobileContactBar.classList.remove("is-visible");
      return;
    }

    const reviewTop = reviewLink.getBoundingClientRect().top + window.scrollY;
    const passedReviewSection = window.scrollY + window.innerHeight * 0.35 >= reviewTop;

    mobileContactBar.classList.toggle("is-visible", passedReviewSection);
    scrollBtn?.classList.toggle("with-mobile-bar", passedReviewSection);
  };

  window.addEventListener("scroll", toggleMobileBarVisibility, { passive: true });
  window.addEventListener("resize", toggleMobileBarVisibility);
  toggleMobileBarVisibility();
}

if (whatsappCloseBtn) {
  whatsappCloseBtn.addEventListener("click", closeWhatsappForm);
}

if (whatsappForm) {
  whatsappForm.addEventListener("click", event => {
    event.stopPropagation();
  });

  whatsappForm.addEventListener("submit", event => {
    event.preventDefault();

    const childName = document.getElementById("childName")?.value.trim();
    const childBirthDate = document.getElementById("childBirthDate")?.value;
    const childApproxAge = document.getElementById("childApproxAge")?.value.trim();
    const inquiryDetails = document.getElementById("inquiryDetails")?.value.trim();

    if (!isValidChildName(childName)) {
      alert("اكتب اسم الطفل بالكامل بحروف واضحة، على الأقل 5 حروف");
      return;
    }

    if (!inquiryDetails || countMeaningfulChars(inquiryDetails) < 5) {
      alert("الاستفسار يجب أن يكون على الأقل 5 حروف فعلية");
      return;
    }

    if (!childBirthDate && !childApproxAge) {
      alert("املأ تاريخ الميلاد أو العمر التقريبي على الأقل");
      return;
    }

    if (childBirthDate && childBirthDate > getTodayDateString()) {
      alert("تاريخ الميلاد لا يمكن أن يكون في المستقبل");
      return;
    }

    if (childApproxAge && countMeaningfulChars(childApproxAge) < 2) {
      alert("اكتب العمر التقريبي بشكل أوضح");
      return;
    }

    const childAge = childBirthDate ? formatChildAge(childBirthDate) : childApproxAge;
    const message = [
      "السلام عليكم",
      `اسم الطفل: ${childName}`,
      `عمر الطفل: ${childAge}`,
      `الاستفسار: ${inquiryDetails}`
    ].join("\n");

    const previewMessage = `راجع الرسالة قبل الإرسال:\n\n${message}`;
    if (!window.confirm(previewMessage)) {
      return;
    }

    window.trackClick("whatsapp");
    closeWhatsappForm();

    const whatsappUrl = `https://wa.me/966538770001?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

if (whatsappFormWrapper) {
  ["click", "mousedown", "touchstart"].forEach(eventName => {
    whatsappFormWrapper.addEventListener(eventName, event => {
      if (event.target === whatsappFormWrapper) {
        closeWhatsappForm();
      }
    });
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && whatsappFormWrapper && !whatsappFormWrapper.hasAttribute("hidden")) {
    closeWhatsappForm();
  }
});

if (adminBtn) {
  adminBtn.addEventListener("click", () => {
    const input = prompt("أدخل كلمة المرور:");
    if (input && btoa(input) === encodedPassword) {
      window.open("admin.html", "_blank");
    } else if (input !== null) {
      alert("كلمة المرور خاطئة");
    }
  });
}

if (showMoreBtn) {
  showMoreBtn.addEventListener("click", function () {
    document.querySelectorAll(".more-comments").forEach(card => {
      card.style.display = "block";
    });
    this.style.display = "none";
  });
}

if (testimonialSection) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  sectionObserver.observe(testimonialSection);
}

if (intro) {
  const introObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        intro.classList.add("show");
        introObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  introObserver.observe(intro);
}

db.ref("visitorCount").transaction(count => (count || 0) + 1);
