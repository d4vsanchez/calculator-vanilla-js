/* Theme Toggle */
const themeToggleDefaultOptions = {
  tipElement: '.selected-theme',
};
function ThemeToggle(themeForm, options) {
  this.form = themeForm;
  this.options = { ...themeToggleDefaultOptions, ...options };
  this.themeTip = themeForm.querySelector(this.options.tipElement);

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

ThemeToggle.prototype.fireEvent = function (eventName, payload) {
  if (typeof this[eventName] === 'function') {
    this[eventName](payload);
  }
}

ThemeToggle.prototype.moveTip = function () {
  const selectedThemeButton = this.getSelectedThemeElement();
  const formDimensions = this.getElementDimensions(this.form);
  const selectedThemeButtonDimensions = this.getElementDimensions(selectedThemeButton);

  const leftOffset = `${selectedThemeButtonDimensions.left - formDimensions.left}px`;
  const topOffset = `${selectedThemeButtonDimensions.top - formDimensions.top}px`;
  this.themeTip.style.setProperty('transform', `translate(${leftOffset}, ${topOffset})`);

  this.fireEvent('onChange', selectedThemeButton.value);
}

/* Calculator */
function Calculator() {
  this.total = null;
  this.displayValue = '';
  this.currentOperation = null;
}

Calculator.prototype.addNumber = function (number) {
  this.displayValue += number;
}

Calculator.prototype.deleteNumber = function () {
  const size = this.displayValue.length;
  this.displayValue = this.displayValue.slice(0, size - 1);
}

Calculator.prototype.addOperation = function (operation) {
  const parsedValue = this.displayValue ? parseFloat(this.displayValue) : null;
  this.displayValue = '';

  if (this.total === null) {
    this.total = parsedValue;
  } else if (parsedValue != null) {
    switch (this.currentOperation || operation) {
      case '+':
        this.total += parsedValue;
        break;
      case '-':
        this.total -= parsedValue;
        break;
      case '*':
        this.total *= parsedValue;
        break;
      case '/':
        this.total /= parsedValue;
        break;
      default: // Do nothing
    }
  }

  this.currentOperation = operation;
}

Calculator.prototype.reset = function () {
  this.total = null;
  this.displayValue = '';
  this.currentOperation = null;
}

Calculator.prototype.calculate = function () {
  if (this.currentOperation !== null) {
    this.addOperation(this.currentOperation);
  }

  this.displayValue = '';
  return this.total;
}

/* Calculator view */
const defaultOptions = {
  keypadElement: '.calculator-keypad',
  keyElement: '.keypad-key',
  displayElement: '.calculator-display',
  dataAccessor: 'calculator',
  deleteKey: 'del',
  resetKey: 'reset',
  equalsKey: '=',
  operations: ['+', '-', '/', '*']
};
function CalculatorView(calculator, options) {
  this.calculator = calculator;
  this.options = { ...defaultOptions, ...options };
  this.keypadElement = document.querySelector(this.options.keypadElement);
  this.displayElement = document.querySelector(this.options.displayElement);

  this.keypadElement.addEventListener('click', (ev) => {
    ev.stopPropagation();
    const pressedKey = ev.target;

    if (this.isKeypadKey(pressedKey)) {
      const data = this.getData(pressedKey);
      this.sendKey(data);
    }
  })
}

CalculatorView.prototype.getData = function (element) {
  return element.dataset[this.options.dataAccessor];
}

CalculatorView.prototype.updateDisplay = function () {
  this.displayElement.textContent = this.calculator.displayValue || this.calculator.total || 0;
}

CalculatorView.prototype.sendKey = function (data) {
  if (this.isOperation(data)) this.calculator.addOperation(data);
  if (this.isEquals(data)) this.calculator.calculate(data);
  if (this.isDelete(data)) this.calculator.deleteNumber();
  if (this.isReset(data)) this.calculator.reset();
  if (this.isNumber(data)) this.calculator.addNumber(data);

  this.updateDisplay();
}

CalculatorView.prototype.isKeypadKey = function (element) {
  const { keyElement } = this.options;
  const firstCharacter = keyElement.charAt(0);
  const firstCharacterIsLetter = firstCharacter.toUpperCase() !== firstCharacter.toLowerCase();
  const keyElementClassName = firstCharacterIsLetter ? keyElement : keyElement.slice(1);

  return element.classList.contains(keyElementClassName);
}

CalculatorView.prototype.isNumber = function (data) {
  return isFinite(parseFloat(data)) || data === '.';
}

CalculatorView.prototype.isReset = function (data) {
  return this.options.resetKey === data;
}

CalculatorView.prototype.isDelete = function (data) {
  return this.options.deleteKey === data;
}

CalculatorView.prototype.isEquals = function (data) {
  return this.options.equalsKey === data;
}

CalculatorView.prototype.isOperation = function (data) {
  return this.options.operations.includes(data);
}

/* Initial setup */
function loadTheme(themeNumber) {
  const themeName = `theme${themeNumber}`;
  const themePath = `./css/theme${themeNumber}.css`;

  const links = document.head.querySelectorAll('link');
  const hasLoadedTheme = Array.from(links).find(link => link.href.includes(themeName)) !== undefined;

  if (!hasLoadedTheme) {
    document.head.insertAdjacentHTML(
      'beforeend',
      `<link rel="stylesheet" href="${themePath}" onload="document.body.className = '${themeName}'" />`,
    )
  } else {
    document.body.className = themeName;
  }
}

const themeToggle = new ThemeToggle(document.querySelector('.theme-toggle'));
themeToggle.onChange = loadTheme;

new CalculatorView(new Calculator());

