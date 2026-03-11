(function () {
  'use strict';

  // Burger menu
  var header = document.querySelector('.header');
  var burger = document.querySelector('.header__burger');
  if (header && burger) {
    burger.addEventListener('click', function () {
      header.classList.toggle('header--menu-open');
      document.body.classList.toggle('no-scroll', header.classList.contains('header--menu-open'));
    });
  }

  // Range slider value display
  var rangeInput = document.getElementById('range_input');
  var rangeOutput = document.querySelector('output[name="range_value"]');
  if (rangeInput && rangeOutput) {
    function updateRangeOutput() {
      rangeOutput.value = rangeInput.value;
    }
    rangeInput.addEventListener('input', updateRangeOutput);
    updateRangeOutput();
  }

  // Custom select
  var customSelects = document.querySelectorAll('[data-custom-select]');
  customSelects.forEach(function (wrap) {
    var nativeSelect = wrap.querySelector('.order__select-native');
    var trigger = wrap.querySelector('.order__select-trigger');
    var valueEl = wrap.querySelector('.order__select-value');
    var dropdown = wrap.querySelector('.order__select-dropdown');
    var options = wrap.querySelectorAll('.order__select-option');

    function open() {
      wrap.classList.add('order__custom-select--open');
      trigger.setAttribute('aria-expanded', 'true');
      dropdown.hidden = false;
    }

    function close() {
      wrap.classList.remove('order__custom-select--open');
      trigger.setAttribute('aria-expanded', 'false');
      dropdown.hidden = true;
    }

    function selectOption(option) {
      var value = option.getAttribute('data-value');
      var text = option.textContent;
      nativeSelect.value = value;
      valueEl.textContent = text;
      options.forEach(function (o) { o.classList.remove('order__select-option--selected'); });
      option.classList.add('order__select-option--selected');
      close();
    }

    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      if (wrap.classList.contains('order__custom-select--open')) {
        close();
      } else {
        open();
      }
    });

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        selectOption(option);
      });
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) {
        close();
      }
    });

    // Init selected state
    var selected = nativeSelect.options[nativeSelect.selectedIndex];
    var selectedOption = wrap.querySelector('.order__select-option[data-value="' + nativeSelect.value + '"]');
    if (selectedOption) {
      selectedOption.classList.add('order__select-option--selected');
    }
  });
})();
