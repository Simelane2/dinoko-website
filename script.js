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