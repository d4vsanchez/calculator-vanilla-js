(function () {
  function loadTheme(themeNumber) {
    const themeName = `theme${themeNumber}`;
    const themePath = `./css/theme${themeNumber}.css`;

    const links = document.head.querySelectorAll('link');
    const hasLoadedTheme = Array.from(links).find((link) => link.href.includes(themeName)) !== undefined;

    if (!hasLoadedTheme) {
      document.head.insertAdjacentHTML(
        'beforeend',
        `<link rel="stylesheet" href="${themePath}" onload="document.body.className = '${themeName}'" />`
      );
    } else {
      document.body.className = themeName;
    }
  }

  const themeToggle = new ThemeToggle(document.querySelector('.theme-toggle'));
  themeToggle.onChange = loadTheme;

  new CalculatorView(new Calculator());
})();
