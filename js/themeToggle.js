(function (window) {
  const defaultOptions = {
    formElement: '.theme-toggle',
    tipElement: '.selected-theme',
    themeElement: document.body,
  };
  function ThemeToggle(options) {
    this.options = { ...defaultOptions, ...options };
    this.form = document.querySelector(this.options.formElement);
    this.themeTip = this.form.querySelector(this.options.tipElement);

    this.moveTip();
    this.form.addEventListener('change', () => this.moveTip());
    this.animateTip();
  }

  ThemeToggle.prototype.getElementDimensions = function (element) {
    return element.getBoundingClientRect();
  };

  ThemeToggle.prototype.getSelectedThemeElement = function () {
    return this.form.querySelector('input[type="radio"]:checked');
  };

  ThemeToggle.prototype.animateTip = function () {
    setTimeout(() => {
      this.themeTip.style.setProperty('opacity', '1');
      this.themeTip.style.setProperty('transition', 'transform 300ms ease');
    });
  };

  ThemeToggle.prototype.fireEvent = function (eventName, payload) {
    if (typeof this[eventName] === 'function') {
      this[eventName](payload);
    }
  };

  ThemeToggle.prototype.updateThemeClass = function (themeSuffix) {
    const themeName = `theme${themeSuffix}`;
    this.options.themeElement.className = themeName;
  };

  ThemeToggle.prototype.selectTheme = function (themeNumber) {
    const themeOptions = this.form.querySelectorAll('input[type="radio"]');
    themeOptions.forEach((themeOption) => {
      const isChecked = parseInt(themeOption.value) === themeNumber;
      if (isChecked) {
        themeOption.click();
        this.updateThemeClass(themeNumber);
      }
    });
  };

  ThemeToggle.prototype.moveTip = function () {
    const selectedThemeButton = this.getSelectedThemeElement();
    const formDimensions = this.getElementDimensions(this.form);
    const selectedThemeButtonDimensions = this.getElementDimensions(selectedThemeButton);

    const leftOffset = `${selectedThemeButtonDimensions.left - formDimensions.left}px`;
    const topOffset = `${selectedThemeButtonDimensions.top - formDimensions.top}px`;
    this.themeTip.style.setProperty('transform', `translate(${leftOffset}, ${topOffset})`);

    this.updateThemeClass(selectedThemeButton.value);
    this.fireEvent('onChange', selectedThemeButton.value);
  };

  window.ThemeToggle = ThemeToggle;
})(this);
