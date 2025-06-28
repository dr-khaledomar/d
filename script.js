// -----------------------------
// FAQ Accordion
// -----------------------------
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;

    // إغلاق باقي الأسئلة
    document.querySelectorAll(".faq-answer").forEach(a => {
      if (a !== answer) {
        a.style.maxHeight = null;
        a.classList.remove("open");
        a.previousElementSibling.classList.remove("active");
      }
    });

    // تبديل الحالة للسؤال الحالي
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      answer.classList.remove("open");
      button.classList.remove("active");
    } else {
      answer.style.maxHeight = answer.scrollHeight + 80 + "px";
      answer.classList.add("open");
      button.classList.add("active");
    }
  });
});


// -----------------------------
// زر "رجوع إلى الأعلى"
// -----------------------------
const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener('scroll', () => {
  if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
});

if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
const encodedPassword = "b3Blbml0MTIzNA=="; // 

document.getElementById('adminBtn').addEventListener('click', () => {
  const input = prompt('أدخل كلمة المرور:');
  if (input && btoa(input) === encodedPassword) {
    window.open('admin.html', '_blank');
  } else if (input !== null) {
    alert('كلمة المرور خاطئة');
  }
});



// إعدادات Firebase الخاصة بك
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

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const visitorCountRef = db.ref('visitorCount');

function trackClick(platform) {
  const ref = firebase.database().ref('clicks/' + platform);
  ref.transaction(current => (current || 0) + 1);
}
// تحديث الرقم المعروض في الصفحة تلقائياً عند تغييره في القاعد

const visitorRef = firebase.database().ref("visitorCount");
visitorRef.transaction(count => (count || 0) + 1);


  document.getElementById('showMoreBtn').addEventListener('click', function () {
    const moreCards = document.querySelectorAll('.more-comments');
    moreCards.forEach(card => card.style.display = 'block');
    this.style.display = 'none'; // إخفاء الزر بعد الضغط
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // لإظهارها مرة واحدة فقط
      }
    });
  }, {
    threshold: 0.5 // نصف العنصر ظاهر
  });

  const testimonialSection = document.getElementById('testimonials');
  if (testimonialSection) {
    observer.observe(testimonialSection);
  }

    document.addEventListener("DOMContentLoaded", function () {
    const intro = document.querySelector('.testimonial-intro');

    if (intro) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              intro.classList.add('show');
              observer.unobserve(entry.target); // توقف المراقبة بعد ما يبان
            }
          });
        },
        { threshold: 0.5 } // نصف العنصر داخل الشاشة
      );

      observer.observe(intro);
    }
  });
