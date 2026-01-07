document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

const video1 = document.getElementById('projectVideo1')
const video2 = document.getElementById('projectVideo2')
const video3 = document.getElementById('projectVideo3')
const video4 = document.getElementById('projectVideo4')
const video5 = document.getElementById('projectVideo5')


const videoList = [video1, video2, video3, video4, video5];

videoList.forEach(function (video) {
  video.addEventListener("mouseover", function () {
    video.play()
  })

  video.addEventListener("mouseout", function () {
    video.pause()
  })


})



// استخراج البريد الإلكتروني من قسم Content info
function getRecipientEmail() {
  const emailLink = document.querySelector('.content-item a[href^="mailto:"]');
  return emailLink ? emailLink.getAttribute('href').replace('mailto:', '') : 'abdullahabdullatef51@gmail.com';
}

// تهيئة EmailJS (اختياري - يحتاج إعداد)
let emailjsReady = false;
if (typeof emailjs !== 'undefined') {
  try {
    // قم بتغيير هذه القيم بعد إعداد EmailJS من https://www.emailjs.com
    emailjs.init("YOUR_PUBLIC_KEY");
    emailjsReady = true;
  } catch (e) {
    console.log('EmailJS not configured, using mailto fallback');
  }
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');

  // استخراج البريد الإلكتروني من قسم Content info
  const recipientEmail = getRecipientEmail();

  // الحصول على بيانات النموذج
  const formData = {
    from_name: document.getElementById('name').value.trim(),
    from_email: document.getElementById('email').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  // التحقق من البيانات
  if (!formData.from_name || !formData.from_email || !formData.subject || !formData.message) {
    alert('Please fill in all fields');
    return;
  }

  // تعطيل الزر أثناء الإرسال
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  submitBtn.style.opacity = '0.7';

  // محاولة إرسال البريد الإلكتروني باستخدام EmailJS إذا كان متاحاً
  if (emailjsReady && typeof emailjs !== 'undefined') {
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      to_email: recipientEmail,
      from_name: formData.from_name,
      from_email: formData.from_email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.from_email
    })
      .then(function () {
        showSuccessMessage(successMessage, form, submitBtn, originalText);
      }, function (error) {
        console.log('EmailJS error:', error);
        // استخدام mailto كبديل
        sendViaMailto(recipientEmail, formData, successMessage, form, submitBtn, originalText);
      });
  } else {
    // استخدام mailto مباشرة إذا لم يكن EmailJS متاحاً
    sendViaMailto(recipientEmail, formData, successMessage, form, submitBtn, originalText);
  }
});

// دالة لإرسال البريد عبر mailto
function sendViaMailto(recipientEmail, formData, successMessage, form, submitBtn, originalText) {
  const emailBody = `Name: ${formData.from_name}\nEmail: ${formData.from_email}\n\nMessage:\n${formData.message}`;
  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;

  // فتح بريد المستخدم
  window.location.href = mailtoLink;

  // إظهار رسالة النجاح
  showSuccessMessage(successMessage, form, submitBtn, originalText);
}

// دالة لإظهار رسالة النجاح
function showSuccessMessage(successMessage, form, submitBtn, originalText) {
  successMessage.classList.add('show');
  form.reset();

  // إعادة تفعيل الزر
  submitBtn.disabled = false;
  submitBtn.textContent = originalText;
  submitBtn.style.opacity = '1';

  // إخفاء الرسالة بعد 5 ثواني
  setTimeout(function () {
    successMessage.classList.remove('show');
  }, 5000);
}

// CV Dropdown Toggle
const cvMainBtn = document.getElementById('cvMainBtn');
const cvBottomBtn = document.getElementById('cvBottomBtn');
const cvDropdown = document.getElementById('cvDropdown');
const cvBottomDropdown = document.getElementById('cvBottomDropdown');

// Toggle dropdown on button click
if (cvMainBtn && cvDropdown) {
  cvMainBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cvMainBtn.parentElement.classList.toggle('active');
    if (cvBottomBtn) cvBottomBtn.parentElement.classList.remove('active');
  });
}

if (cvBottomBtn && cvBottomDropdown) {
  cvBottomBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    cvBottomBtn.parentElement.classList.toggle('active');
    if (cvMainBtn) cvMainBtn.parentElement.classList.remove('active');
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (cvMainBtn && !cvMainBtn.parentElement.contains(e.target)) {
    cvMainBtn.parentElement.classList.remove('active');
  }
  if (cvBottomBtn && !cvBottomBtn.parentElement.contains(e.target)) {
    cvBottomBtn.parentElement.classList.remove('active');
  }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navbar = document.querySelector('.navbar');

if (menuBtn && navbar) {
  menuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navbar.classList.contains('active')) {
      icon.className = 'bx bx-x';
    } else {
      icon.className = 'bx bx-menu';
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
      menuBtn.querySelector('i').className = 'bx bx-menu';
    });
  });
}







