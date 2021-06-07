(function (window) {
  function Calculator() {
    this.total = null;
    this.displayValue = '';
    this.currentOperation = null;
  }

  Calculator.prototype.addNumber = function (number) {
    this.displayValue += number;
  };

  Calculator.prototype.deleteNumber = function () {
    const size = this.displayValue.length;
    this.displayValue = this.displayValue.slice(0, size - 1);
  };

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
  };

  Calculator.prototype.reset = function () {
    this.total = null;
    this.displayValue = '';
    this.currentOperation = null;
  };

  Calculator.prototype.calculate = function () {
    if (this.currentOperation !== null) {
      this.addOperation(this.currentOperation);
    }

    this.displayValue = '';
    return this.total;
  };

  window.Calculator = Calculator;
})(this);
