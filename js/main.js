/* Theme Toggle */
function ThemeToggle(themeForm, tipClass = '.selected-theme') {
  this.form = themeForm;
  this.themeTip = themeForm.querySelector(tipClass);

  this.moveTip();
  this.form.addEventListener('change', () => this.moveTip());
  this.animateTip();
}

ThemeToggle.prototype.getElementDimensions = function (element) {
  return element.getBoundingClientRect();
}

ThemeToggle.prototype.getSelectedThemeElement = function () {
  return this.form.querySelector('input[type="radio"]:checked');
}

ThemeToggle.prototype.animateTip = function () {
  setTimeout(() => {
    this.themeTip.style.setProperty('opacity', '1');
    this.themeTip.style.setProperty('transition', 'transform 300ms ease')
  });
}

ThemeToggle.prototype.moveTip = function () {
  const selectedThemeButton = this.getSelectedThemeElement();
  const formDimensions = this.getElementDimensions(this.form);
  const selectedThemeButtonDimensions = this.getElementDimensions(selectedThemeButton);

  const leftOffset = `${selectedThemeButtonDimensions.left - formDimensions.left}px`;
  const topOffset = `${selectedThemeButtonDimensions.top - formDimensions.top}px`;
  this.themeTip.style.setProperty('transform', `translate(${leftOffset}, ${topOffset})`);
}

/* Initial setup */
new ThemeToggle(document.querySelector('.theme-toggle'));