export const MOBILE_MENU_OPEN = 'mobile__menu--open';

export const DIRECTION_MOVE_ITEM = {
  MOBILE: 'to-mobile',
  ROW: 'row',
};

export function executeModalMenu() {
  const refMobileBtn = document.querySelector('.mobile__btn');
  if (!refMobileBtn) {
    return;
  }

  refMobileBtn.addEventListener('click', onClickModalMenu);
}

function onClickModalMenu(e) {
  if (e.currentTarget.classList.contains(MOBILE_MENU_OPEN)) {
    moveNavItem(DIRECTION_MOVE_ITEM.ROW);
    e.currentTarget.classList.remove(MOBILE_MENU_OPEN);
  } else {
    moveNavItem(DIRECTION_MOVE_ITEM.MOBILE);
    e.currentTarget.classList.add(MOBILE_MENU_OPEN);
  }

  console.log(e.currentTarget);
}

export function moveNavItem(direction) {
  let refNav = '';
  let refSwitchThemeWrap = '';
  if (direction == DIRECTION_MOVE_ITEM.MOBILE) {
    refNav = document.querySelector('.mobile__wrap');
    refSwitchThemeWrap = refNav;
  } else {
    refNav = document.querySelector('.nav');
    refSwitchThemeWrap = document.querySelector('.switch__wrap');
  }

  const refNavList = document.querySelector('.nav__list');
  const refSwitchTheme = document.querySelector('.switch__theme');

  refNav.append(refNavList);
  refSwitchThemeWrap.append(refSwitchTheme);
}
