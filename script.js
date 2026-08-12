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
  if (!btn) return;

  if (window.scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
});

/* MAJOR PROJECTS FILTER */
function filterProjects(category, element) {
  document.querySelectorAll('.project-filter-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });

  if (element) {
    element.classList.add('active');
  }

  document.querySelectorAll('.project-card').forEach(function(card) {
    var cardCategory = card.dataset.category || 'all';

    if (category === 'all' || cardCategory === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

/* PROJECT DETAILS */
function toggleProjectDetails(button) {
  var card = button.closest('.project-card');
  if (!card) return;

  var details = card.querySelector('.project-details');
  if (!details) return;

  var isOpen = details.classList.contains('open');
  details.classList.toggle('open', !isOpen);
  button.setAttribute('aria-expanded', String(!isOpen));
  button.textContent = isOpen ? 'View Project Details' : 'Hide Project Details';
}

/* DOCUMENT DOWNLOAD FEEDBACK */
document.addEventListener('click', function(event) {
  var link = event.target.closest('.document-download');
  if (!link) return;

  /*
   * The browser performs the actual download.
   * This only provides a small visual confirmation.
   */
  var originalText = link.dataset.originalText || link.textContent.trim();
  link.dataset.originalText = originalText;

  link.classList.add('download-started');
  link.textContent = 'Downloading...';

  window.setTimeout(function() {
    link.classList.remove('download-started');
    link.textContent = originalText;
  }, 1600);
});

/* SMOOTH SCROLL FOR INTERNAL NAVIGATION */
document.addEventListener('click', function(event) {
  var link = event.target.closest('a[href^="#"]');
  if (!link) return;

  var targetId = link.getAttribute('href');
  if (!targetId || targetId === '#') return;

  var target = document.querySelector(targetId);
  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

/* MOBILE NAV SAFETY */
window.addEventListener('load', function() {
  document.querySelectorAll('.project-filter-btn').forEach(function(btn) {
    btn.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        btn.click();
      }
    });
  });
});
