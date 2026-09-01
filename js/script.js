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