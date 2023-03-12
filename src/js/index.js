/**
 * ToDo List
 *  зробити перехід по сторінкам при натискані пунктів меню
 *  зобити "спінер" який буде крутитися коли йде завантаження
 *  зробити так, щоб коли не було даних, щоб футер був знизу сторінки
 *  зробити згортання модального меню коли обрана якась сторінка
 *
 */

import throttle from 'lodash.throttle';
import {
  ManageMenuPosition,
  ClickerOnBtmMobileForm,
  ToggleTheme,
  ClickerOnMenuItem,
} from './header';

/**
 * Modal menu
 */
// move block menu to need place
const manageMenuPosition = new ManageMenuPosition();
window.addEventListener(
  'resize',
  throttle(e => {
    manageMenuPosition.rebuildMobileMenuByWindowResize();
  }, 250)
);
// event 'click' on btn mobile form
const clickerOnBtmMobileForm = new ClickerOnBtmMobileForm();
// toggle theme
const toggleThem = new ToggleTheme();
// menu clicker
const clickerOnMenuItem = new ClickerOnMenuItem();
