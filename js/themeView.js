(function (window) {
  const defaultOptions = {
    lightTheme: null,
    darkTheme: null,
    themeElement: document.body,
  };
  function ThemeView(themeToggle, options) {
    this.themeToggle = themeToggle;
    this.options = { ...defaultOptions, ...options };

    this.initializeTheme();
    this.listenSchemeColorChanges();

    this.themeToggle.onChange = this.changeTheme.bind(this);
  }

  ThemeView.prototype.initializeTheme = function () {
    const darkModeMediaQuery = this.getDarkModeMediaQuery();
    const isDarkMode = darkModeMediaQuery.matches;
    const newTheme = isDarkMode ? this.options.darkTheme : this.options.lightTheme;
    this.changeTheme(newTheme);
    this.themeToggle.selectTheme(newTheme);
  };

  ThemeView.prototype.getColorSchemeModeMediaQuery = function (colorScheme) {
    return window.matchMedia(`(prefers-color-scheme: ${colorScheme})`);
  };

  ThemeView.prototype.getDarkModeMediaQuery = function () {
    return this.getColorSchemeModeMediaQuery('dark');
  };

  ThemeView.prototype.changeTheme = function (theme) {
    if (this.options.themeElement && this.options.themeElement.nodeType === Node.ELEMENT_NODE) {
      this.options.themeElement.className = theme;
    }
  };

  ThemeView.prototype.listenSchemeColorChanges = function () {
    const darkModeMediaQuery = this.getDarkModeMediaQuery();

    darkModeMediaQuery.addEventListener('change', (ev) => {
      const isDarkMode = ev.matches;
      const newTheme = isDarkMode ? this.options.darkTheme : this.options.lightTheme;
      this.changeTheme(newTheme);
    });
  };

  window.ThemeView = ThemeView;
})(this);
