/* SERVICE TABS */
function showService(id, element) {
  document.querySelectorAll('.service-panel').forEach(function(panel) {
    panel.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
  element.classList.add('active');
}

/* GALLERY FILTER */
function filterGallery(category, element) {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  element.classList.add('active');

  document.querySelectorAll('.gallery-item').forEach(function(item) {
    if (category === 'all' || item.dataset.category === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

/* FAQ TOGGLE */
function toggleFaq(button) {
  var answer = button.nextElementSibling;
  var isOpen = button.classList.contains('open');

  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });

  if (!isOpen) {
    button.classList.add('open');
    answer.classList.add('open');
  }
}

/* BACK TO TOP BUTTON */
window.addEventListener('scroll', function() {
  var btn = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

/* VIEW TOGGLE FOR ACADEMY PLATFORM */
function showView(viewId) {
  document.querySelectorAll('.view').forEach(function(view) {
    view.classList.remove('active');
  });
  document.getElementById(viewId).classList.add('active');
  window.scrollTo(0, 0);
}

/* REDIRECT TO ACADEMY FORM */
function goToAcademyForm() {
  showView('academyView');
  setTimeout(function() {
    var form = document.getElementById('training-form');
    if(form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

/* REDIRECT TO MAIN CONTACT FORM FOR SITE VISIT */
function bookSiteVisit() {
  showView('mainView');
  setTimeout(function() {
    var contact = document.getElementById('contact');
    if(contact) {
      contact.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

/* SCROLL REVEAL ANIMATION SCRIPT */
function setupScrollAnimations() {
  var elementsToReveal = document.querySelectorAll(
    'section h2, section p, .training-intro, .project-card, .reason-card, .course-card, .giving-card, .faq-item, .gallery-item, .business-hours, .inquiry-form, .download-card'
  );

  elementsToReveal.forEach(function(el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementsToReveal.forEach(function(el) {
    observer.observe(el);
  });
}

window.addEventListener('DOMContentLoaded', setupScrollAnimations);

function setupViewObserver() {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        var activeView = document.querySelector('.view.active');
        if (activeView) {
          setupScrollAnimations();
        }
      }
    });
  });

  var views = document.querySelectorAll('.view');
  views.forEach(function(view) {
    observer.observe(view, { attributes: true });
  });
}

window.addEventListener('DOMContentLoaded', setupViewObserver);
