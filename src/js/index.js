/**
 * ToDo List
 *  зробити перехід по сторінкам при натискані пунктів меню
 *  зобити "спінер" який буде крутитися коли йде завантаження
 *  зробити так, щоб коли не було даних, щоб футер був знизу сторінки
 *  зробити згортання модального меню коли обрана якась сторінка
 *  при відкриті модального меню - відключати скрол
 *
 *  завішати на подію кліку по категорї пошук.
 *
 *  зарендирити пусту сторінку
 */

import throttle from 'lodash.throttle';

import { THROTTLE_DELAY } from './globals';
import {
  ManageMenuPosition,
  ClickerOnBtmMobileForm,
  ToggleTheme,
  ClickerOnMenuItem,
} from './header';
import { CategoriesMain } from './categories';

/**
 *
 */
// category
const categoriesMain = new CategoriesMain();
categoriesMain.addEventOnChangeCategory(value => {
  console.log(value);
});

/**
 * Modal menu
 */
// move block menu to need place
const manageMenuPosition = new ManageMenuPosition();
window.addEventListener(
  'resize',
  throttle(e => {
    manageMenuPosition.rebuildMobileMenuByWindowResize();
    categoriesMain.windowsResize();
  }, THROTTLE_DELAY)
);
// event 'click' on btn mobile form
const clickerOnBtmMobileForm = new ClickerOnBtmMobileForm();
// toggle theme
const toggleThem = new ToggleTheme();
// menu clicker
const clickerOnMenuItem = new ClickerOnMenuItem();
