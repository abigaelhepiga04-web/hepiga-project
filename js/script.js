document.addEventListener('DOMContentLoaded', function () {

  /* Navbar active link tracker */
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });


    /* Portfolio filter */
  var filterBtns = document.querySelectorAll('.filter-btn');
  // Select the outer column wrappers containing data-category attributes
  var workCols = document.querySelectorAll('.work-grid > [data-category]');

  if (filterBtns.length && workCols.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        
        var filter = btn.getAttribute('data-filter');
        
        workCols.forEach(function (col) {
          var cat = col.getAttribute('data-category');
          var show = filter === 'all' || filter === cat;
          col.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Service card modal */
  var serviceCards = document.querySelectorAll('.svc-card');
  var modalIcon = document.getElementById('serviceModalIcon');
  var modalTitle = document.getElementById('serviceModalLabel');
  var modalShort = document.getElementById('serviceModalShort');
  var modalDetail = document.getElementById('serviceModalDetail');

  function openServiceModal(card) {
    var icon = card.querySelector('.svc-icon');
    var title = card.querySelector('h3');
    var short = card.querySelector('p');
    var detail = card.getAttribute('data-detail') || '';

    if (modalIcon && icon) modalIcon.innerHTML = icon.innerHTML;
    if (modalTitle && title) modalTitle.textContent = title.textContent;
    if (modalShort && short) modalShort.textContent = short.textContent;
    if (modalDetail) modalDetail.textContent = detail;
  }

  serviceCards.forEach(function (card) {
    card.addEventListener('click', function () {
      openServiceModal(card);
    });
    // Keyboard accessibility: Enter or Space activates the card
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openServiceModal(card);
        card.click();
      }
    });
  });

  // "Start a project" button inside the modal: close the modal first,
  // then scroll to #inquiry once it has actually finished closing.
  // (Scrolling while the modal is still closing does nothing, because
  // Bootstrap keeps the page locked with overflow:hidden until the
  // close animation completes.)
  var serviceModalEl = document.getElementById('serviceModal');
  var serviceModalCta = document.getElementById('serviceModalCta');

  if (serviceModalEl && serviceModalCta && window.bootstrap) {
    serviceModalCta.addEventListener('click', function (e) {
      e.preventDefault();

      serviceModalEl.addEventListener('hidden.bs.modal', function onHidden() {
        serviceModalEl.removeEventListener('hidden.bs.modal', onHidden);
        var target = document.querySelector('#inquiry');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });

      var modalInstance = bootstrap.Modal.getInstance(serviceModalEl);
      if (modalInstance) modalInstance.hide();
    });
  }

  /* Form handling */
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#EF4444';
        } else {
          field.style.borderColor = '';
        }
      });

      if (valid) {
        alert('Thank you! Your submission has been received.');
        form.reset();
      }
    });
  });

});