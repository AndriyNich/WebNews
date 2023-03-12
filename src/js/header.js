import { NO_VIEW_CLASS } from './globals';

const MOBILE_MENU_OPEN = 'mobile__menu--open';

/**
 * Positioning of menu items depending on the screen extension
 */
export class ManageMenuPosition {
  #POSITION_MENU = {
    MOBILE: 'mobile',
    TABLET: 'tamblet',
  };

  #currentPositionMenu = '';

  constructor() {
    this.#currentPositionMenu = this.#calculatePositionMenu();
    this.#moveNavItem(this.#currentPositionMenu);
  }

  rebuildMobileMenuByWindowResize() {
    const newPositionMenu = this.#calculatePositionMenu();

    if (this.#currentPositionMenu !== newPositionMenu) {
      this.#currentPositionMenu = newPositionMenu;
      this.#moveNavItem(this.#currentPositionMenu);
    }
  }

  #calculatePositionMenu() {
    if (window.matchMedia('(min-width: 768px)').matches) {
      return this.#POSITION_MENU.TABLET;
    }
    return this.#POSITION_MENU.MOBILE;
  }

  #moveNavItem(positionMenu) {
    let refNav = document.querySelector('.mobile__container');
    let refSwitchThemeWrap = refNav;

    if (positionMenu == this.#POSITION_MENU.TABLET) {
      refNav = document.querySelector('.nav');
      refSwitchThemeWrap = document.querySelector('.switch__wrap');
    }

    const refNavList = document.querySelector('.nav__list');
    const refSwitchTheme = document.querySelector('.switch__theme');

    refNav.append(refNavList);
    refSwitchThemeWrap.append(refSwitchTheme);
  }
}

/**
 * Mobile menu button click handler
 */
export class ClickerOnBtmMobileForm {
  #SVG_OPEN_MENU = 'icon-menu';
  #SVG_CLOSE_MENU = 'icon-cross';
  #MOBILE_FORM_CONTAINER = 'mobile__wrap';
  #IS_OPEN_CLASS = 'is-open';

  #MODAL_TYPE = {
    ON: 'on',
    OFF: 'off',
  };

  constructor() {
    const refMobileBtn = document.querySelector('.mobile__btn');
    if (!refMobileBtn) {
      return;
    }
    refMobileBtn.addEventListener('click', e => {
      this.#onChangeBtnIcon(e);
      this.#onOpenOrCloseModalForm(e);
    });
  }

  #onChangeBtnIcon(e) {
    let classOn = this.#SVG_CLOSE_MENU;
    let classOff = this.#SVG_OPEN_MENU;
    let value = this.#MODAL_TYPE.ON;
    if (e.currentTarget.dataset.mobileValue == value) {
      classOn = this.#SVG_OPEN_MENU;
      classOff = this.#SVG_CLOSE_MENU;
      value = this.#MODAL_TYPE.OFF;
    }

    document.querySelector(`.${classOn}`).classList.add(NO_VIEW_CLASS);
    document.querySelector(`.${classOff}`).classList.remove(NO_VIEW_CLASS);
    e.currentTarget.dataset.mobileValue = value;
  }

  #onOpenOrCloseModalForm(e) {
    const ref = document.querySelector(`.${this.#MOBILE_FORM_CONTAINER}`);
    if (e.currentTarget.dataset.mobileValue == this.#MODAL_TYPE.ON) {
      ref.classList.remove(this.#IS_OPEN_CLASS);
    } else {
      ref.classList.add(this.#IS_OPEN_CLASS);
    }
  }
}

/**
 * Toggle theme
 */
export class ToggleTheme {
  #VAR_THEME_NAME = 'theme';
  #DARK_THEME_CLASS = 'dark-mode';
  #TOGGLE_THEME_CLASS = 'switch__theme';
  #THEME = {
    LIGTH: 'light',
    DARK: 'dark',
  };

  #currentTheme;

  constructor() {
    this.#loadThemeToStoradge();
    this.#setTheme();
    this.#addEventListener();
  }

  #addEventListener() {
    document
      .querySelector(`.${this.#TOGGLE_THEME_CLASS}`)
      .addEventListener('click', e => {
        this.#changeToggle();
      });
  }

  #changeToggle() {
    this.#currentTheme =
      this.#currentTheme == this.#THEME.LIGTH
        ? this.#THEME.DARK
        : this.#THEME.LIGTH;
    this.#setTheme();
    this.#saveThemeToStoradge();
  }

  #saveThemeToStoradge() {
    localStorage.setItem(
      this.#VAR_THEME_NAME,
      JSON.stringify(this.#currentTheme)
    );
  }

  #loadThemeToStoradge() {
    this.#currentTheme =
      JSON.parse(localStorage.getItem(this.#VAR_THEME_NAME)) ||
      this.#THEME.LIGTH;
  }

  #setTheme() {
    if (this.#currentTheme == this.#THEME.LIGTH) {
      document.body.classList.remove(this.#DARK_THEME_CLASS);
    } else {
      document.body.classList.add(this.#DARK_THEME_CLASS);
    }
  }
}

/**
 * Clicker on menu item
 */
export class ClickerOnMenuItem {
  #CLASS_FOR_REFS = {
    news: 'header__logo',
    home: 'nav__item--home',
    favorite: 'nav__item--favorite',
    read: 'nav__item--read',
  };

  #MENU_ITEM = {
    news: 'home',
    home: 'home',
    favorite: 'favorite',
    read: 'read',
  };

  #CLASS_IS_ACTIVE = 'is-active';

  #refs = {
    news: null,
    home: null,
    favorite: null,
    read: null,
  };

  #currentSelectMenuItem;
  #onChangeMenuItem = () => {
    console.log(this.#currentSelectMenuItem);
  };

  constructor() {
    this.#setStartRefs();
    this.#addEventListeners();
    this.#setSelectedMenuItem(this.#MENU_ITEM.home);
  }

  getCurrentSelectMenuItem() {
    return this.#currentSelectMenuItem;
  }

  addEventListenerChangeMenuItem(callback) {
    this.#onChangeMenuItem = callback;
  }

  #setStartRefs() {
    this.#refs.news = document.querySelector(`.${this.#CLASS_FOR_REFS.news}`);
    this.#refs.home = document.querySelector(`.${this.#CLASS_FOR_REFS.home}`);
    this.#refs.favorite = document.querySelector(
      `.${this.#CLASS_FOR_REFS.favorite}`
    );
    this.#refs.read = document.querySelector(`.${this.#CLASS_FOR_REFS.read}`);
  }

  #addEventListeners() {
    for (const key in this.#refs) {
      this.#refs[key].addEventListener(
        'click',
        this.#onClickMenuItem.bind(this)
      );
    }
  }

  #onClickMenuItem(e) {
    for (const key in this.#CLASS_FOR_REFS) {
      if (e.currentTarget.classList.contains(this.#CLASS_FOR_REFS[key])) {
        this.#setSelectedMenuItem(this.#MENU_ITEM[key]);
        return;
      }
    }
  }

  #setSelectedMenuItem(menuImem) {
    this.#currentSelectMenuItem = menuImem;
    this.#setCurrentMenuItemIsActive();
    this.#onChangeMenuItem();
  }

  #setCurrentMenuItemIsActive() {
    for (const key in this.#CLASS_FOR_REFS) {
      if (key == this.#currentSelectMenuItem) {
        this.#refs[key].classList.add(this.#CLASS_IS_ACTIVE);
      } else {
        this.#refs[key].classList.remove(this.#CLASS_IS_ACTIVE);
      }
    }
  }
}
