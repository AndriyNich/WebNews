import { DIRECTION_MOVE_ITEM, moveNavItem } from './header';

/**
 * Modal menu
 */
// window.addEventListener('resize', throttle(windowsResize, 300));
window.addEventListener('resize', windowsResize);
function windowsResize(e) {
  let direction = DIRECTION_MOVE_ITEM.MOBILE;
  if (window.matchMedia('(min-width: 768px)').matches) {
    direction = DIRECTION_MOVE_ITEM.ROW;
  }

  moveNavItem(direction);
}

//executeModalMenu();
