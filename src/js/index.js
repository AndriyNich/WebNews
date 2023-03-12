/**
 * ToDo List
 * 1. доробити виділення меню коли відкрита активна сторінка.
 * 2. зробити перехід по сторінкам при натискані пунктів меню
 * 3. зобити "спінер" який буде крутитися коли йде завантаження
 * 4. зробити так, щоб коли не було даних, щоб футер був знизу сторінки
 *
 */
import throttle from 'lodash.throttle';
import {
  ManageMenuPosition,
  ClickerOnBtmMobileForm,
  ToggleTheme,
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
