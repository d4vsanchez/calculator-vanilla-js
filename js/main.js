(function () {
  const themeViewOptions = { darkTheme: 'theme1', lightTheme: 'theme2' };
  new ThemeView(new ThemeToggle(), themeViewOptions);
  new CalculatorView(new Calculator());
})();
