(function () {
  const themeToggle = new ThemeToggle();
  new CalculatorView(new Calculator());

  function initializeTheme(themeToggle) {
    const lightModeTheme = 2;
    const darkModeTheme = 1;

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      themeToggle.selectTheme(lightModeTheme);
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      themeToggle.selectTheme(darkModeTheme);
    }
  }

  initializeTheme(themeToggle);
})();
