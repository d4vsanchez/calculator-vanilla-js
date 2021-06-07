(function (window) {
  const defaultOptions = {
    keypadElement: '.calculator-keypad',
    keyElement: '.keypad-key',
    displayElement: '.calculator-display',
    dataAccessor: 'calculator',
    deleteKey: 'del',
    resetKey: 'reset',
    equalsKey: '=',
    operations: ['+', '-', '/', '*'],
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
    });
  }

  CalculatorView.prototype.getData = function (element) {
    return element.dataset[this.options.dataAccessor];
  };

  CalculatorView.prototype.updateDisplay = function () {
    this.displayElement.textContent = this.calculator.displayValue || this.calculator.total || 0;
  };

  CalculatorView.prototype.sendKey = function (data) {
    if (this.isOperation(data)) this.calculator.addOperation(data);
    if (this.isEquals(data)) this.calculator.calculate(data);
    if (this.isDelete(data)) this.calculator.deleteNumber();
    if (this.isReset(data)) this.calculator.reset();
    if (this.isNumber(data)) this.calculator.addNumber(data);

    this.updateDisplay();
  };

  CalculatorView.prototype.isKeypadKey = function (element) {
    const { keyElement } = this.options;
    const firstCharacter = keyElement.charAt(0);
    const firstCharacterIsLetter = firstCharacter.toUpperCase() !== firstCharacter.toLowerCase();
    const keyElementClassName = firstCharacterIsLetter ? keyElement : keyElement.slice(1);

    return element.classList.contains(keyElementClassName);
  };

  CalculatorView.prototype.isNumber = function (data) {
    return isFinite(parseFloat(data)) || data === '.';
  };

  CalculatorView.prototype.isReset = function (data) {
    return this.options.resetKey === data;
  };

  CalculatorView.prototype.isDelete = function (data) {
    return this.options.deleteKey === data;
  };

  CalculatorView.prototype.isEquals = function (data) {
    return this.options.equalsKey === data;
  };

  CalculatorView.prototype.isOperation = function (data) {
    return this.options.operations.includes(data);
  };

  window.CalculatorView = CalculatorView;
})(this);
