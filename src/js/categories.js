import throttle from 'lodash.throttle';
import CategoriesLoader from './categories-loader';

import { NO_VIEW_CLASS, THROTTLE_DELAY } from './globals';

/**
 * work with categories
 */
export class CategoriesMain {
  #refListElements = document.querySelector('.categories__list');
  #SERVICE_CATEGORY_ID = 'others';
  #SERVICE_CATEGORY_CLASS = 'categories__label--modal';
  #CATEGORY_MODAL_LIST_CLASS = 'categories__modal-list';
  #CATEGORY_OTHER_SELECTED_CLASS = 'categories__other--selected';
  #ARROW_CLASS = 'category__arrow';
  #ARROW_ROTATE_CLASS = 'category_arrow--rotate';

  #categoriesLoader;
  #categoriesList;
  #amounButton = -1;
  #leftListElements;
  #modalListElements;
  #selectElementInModalListElements = '';
  #callback = () => {};

  constructor() {
    this.#categoriesLoader = new CategoriesLoader();
    this.#categoriesLoader.addEventLoadData(
      this.#buildCategoriesList.bind(this)
    );
    this.#addEventListenerOnChangeSelectCategory();
  }

  windowsResize() {
    let amountButton = 0;
    if (window.matchMedia('(min-width: 768px)').matches) {
      amountButton = 4;
    }
    if (window.matchMedia('(min-width: 1280px)').matches) {
      amountButton = 6;
    }

    if (this.#amounButton !== amountButton) {
      this.#amounButton = amountButton;
      this.#renderCategoriesList();
    }
  }

  addEventOnChangeCategory(callback) {
    this.#callback = callback;
  }

  #buildCategoriesList(categoriesList) {
    this.#categoriesList = categoriesList;
    this.windowsResize();
  }

  #renderCategoriesList() {
    this.#buildElementsArrays();
    this.#drawListElementsToHTML();
    this.#setCurrentValue();
  }

  #setCurrentValue() {
    if (this.#selectElementInModalListElements.length > 0) {
      document.querySelector('#form-categories').elements[
        this.#selectElementInModalListElements
      ].checked = true;
    }
  }

  #drawListElementsToHTML() {
    let innerHTML = this.#createHtmlElements(this.#modalListElements);
    innerHTML = this.#createHtmlModalList(innerHTML);
    innerHTML = this.#createHtmlElements(this.#leftListElements) + innerHTML;
    this.#refListElements.innerHTML = innerHTML;
  }

  #createHtmlModalList(innerHTML) {
    const section = this.#SERVICE_CATEGORY_ID;
    const display_name = this.#displayNameForOthersBtn();

    return `
      <li class="categories__item">
        <input type="radio" class="categories__input" id="${section}" name="categories" value="${display_name}"/>
        <label class="categories__label categories__label--modal" for="${section}">
          <div>${display_name}</div>
          <svg class="category__arrow" width="16" height="16" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.6667" d="M12 24l8-8-8-8"></path>
          </svg>
        </label>
        <ul class="categories__modal-list no-view">${innerHTML}</ul>
      </li>`;
  }

  #displayNameForOthersBtn() {
    return this.#amounButton == 0 ? 'Categories' : 'Others';
  }

  #createHtmlElements(array) {
    return array
      .map(({ display_name, section }) => {
        return this.#createHtmlElement({ display_name, section });
      })
      .join('');
  }

  #createHtmlElement({ display_name, section }) {
    return `<li class="categories__item">
    <input type="radio" class="categories__input" id="${section}" name="categories" value="${display_name}"/>
    <label class="categories__label" for="${section}">${display_name}</label>
  </li>`;
  }

  #buildElementsArrays() {
    this.#leftListElements = [];
    this.#modalListElements = [];
    this.#categoriesList.forEach((elem, idx) => {
      if (idx < this.#amounButton) {
        this.#leftListElements.push(elem);
      } else {
        this.#modalListElements.push(elem);
      }
    });
  }

  #addEventListenerOnChangeSelectCategory() {
    this.#refListElements.parentElement.addEventListener(
      'click',
      throttle(this.#onChangeSelectCategory.bind(this), THROTTLE_DELAY)
    );
  }

  #onChangeSelectCategory(e) {
    if (e.target.id !== this.#SERVICE_CATEGORY_ID) {
      this.#selectElementInModalListElements = e.target.id;
      if (e.target.value) {
        this.#callback(e.target.value);
      }
    }
    this.#toggleModalCategoryList(e.target.id);
  }

  #toggleModalCategoryList(selectCategoryID) {
    const modalList = this.#refListElements.querySelector(
      `.${this.#CATEGORY_MODAL_LIST_CLASS}`
    );

    if (selectCategoryID == '') {
      return;
    }

    if (selectCategoryID == this.#SERVICE_CATEGORY_ID) {
      modalList.classList.toggle(NO_VIEW_CLASS);
    } else {
      modalList.classList.add(NO_VIEW_CLASS);

      this.#changeLabelOnOtherButton(selectCategoryID);
    }

    this.#categoryArrowRotate(!modalList.classList.contains(NO_VIEW_CLASS));
  }

  #categoryArrowRotate(value) {
    const refArrowClassList = document.querySelector(
      `.${this.#ARROW_CLASS}`
    ).classList;
    if (value) {
      refArrowClassList.add(this.#ARROW_ROTATE_CLASS);
    } else {
      refArrowClassList.remove(this.#ARROW_ROTATE_CLASS);
    }
  }

  #changeLabelOnOtherButton(categoryID) {
    const selectCategory = this.#modalListElements.filter(
      ({ section }) => section == categoryID
    );

    if (selectCategory.length > 0) {
      this.#enterNewCategoryNameToBtnCaption(selectCategory[0].display_name);
    } else {
      this.#returnBaseNameOnBtnOtherWhenClickBtnNotModalList();
    }
  }

  #enterNewCategoryNameToBtnCaption(caption) {
    const categroyOthers = this.#refListElements.querySelector(
      `.${this.#SERVICE_CATEGORY_CLASS}`
    );
    categroyOthers.classList.add(this.#CATEGORY_OTHER_SELECTED_CLASS);

    categroyOthers.querySelector('div').innerHTML = caption;
  }

  #returnBaseNameOnBtnOtherWhenClickBtnNotModalList() {
    const categroyOthers = this.#refListElements.querySelector(
      `.${this.#SERVICE_CATEGORY_CLASS}`
    );
    categroyOthers.classList.remove(this.#CATEGORY_OTHER_SELECTED_CLASS);
    categroyOthers.querySelector('div').innerHTML =
      this.#displayNameForOthersBtn();
  }
}
