// --- INTERSECTION OBSERVER API
const sections = [...document.querySelectorAll('section')];
const sectionsMinusHero = sections.slice(1);

const options = {
  root: null,
  threshold: 0.25,
  rootMargin: '0px',
};

// INTERSECTING FUNCTION
const showSectionContent = (entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      if (e.target.classList.contains('whoWeAre')) {
        e.target.classList.add('slideInBottom');
      }
      if (e.target.classList.contains('whyUs')) {
        e.target.classList.add('fadeIn');
      }
      if (e.target.classList.contains('story')) {
        [...e.target.children].map((ele) => ele.classList.add('slideInLeft'));
      }
      if (e.target.classList.contains('model')) {
        [...e.target.children].map((ele) => ele.classList.add('slideInRight'));
      }
      if (e.target.classList.contains('contact')) {
        [...e.target.children].map((ele) => ele.classList.add('scale'));
      }
    }
  });
};

// CREATE INTERSECTION OBSERVER
const observer = new IntersectionObserver(showSectionContent, options);

// observe all sections
sectionsMinusHero.forEach((section) => observer.observe(section));

// --- SEND EMAIL
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstname = document.querySelector('[name="firstname"]').value;
  const lastname = document.querySelector('[name="lastname"]').value;
  const phone = document.querySelector('[name="phone"]').value;
  const budget = document.querySelector('[name="budget"]').value;
  const message = document.querySelector('[name="message"]').value;
  const submitBtn = document.querySelector('[type="submit"]');

  Email.send({
    SecureToken: '2a7d4176-cca2-4e02-b88f-b51d016afa84',
    To: '1079003217@qq.com',
    From: 'zpf9193@gmail.com',
    Subject: `QUOTATION REQUEST from ${firstname + ' ' + lastname}`,
    Body: `PHONE NUMBER: ${phone}, BUDGET: ${budget}, MESSAGE: ${message} `,
  }).then((message) => {
    if (message === 'OK') {
      submitBtn.textContent = 'Thank you!';
      submitBtn.classList.add('emailSent');
      setTimeout(() => submitBtn.classList.remove('emailSent'), 5000);
    } else {
      alert('oops, something went wrong!');
    }
  });
});
