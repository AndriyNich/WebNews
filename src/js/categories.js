import CategoriesLoader from './categories-loader';

import { NO_VIEW_CLASS } from './globals';

/**
 * work with categories
 */
export class CategoriesMain {
  #refListElements = document.querySelector('.categories__list');
  #SERVICE_CATEGORY_ID = 'others';
  #SERVICE_CATEGORY_CLASS = 'categories__label--modal';
  #CATEGORY_MODAL_LIST_CLASS = 'categories__modal-list';

  #categoriesLoader;
  #categoriesList;
  #amounButton = -1;
  #leftListElements;
  #modalListElements;
  #selectElementInModalListElements;

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

  #buildCategoriesList(categoriesList) {
    this.#categoriesList = categoriesList;
    this.windowsResize();
  }

  #renderCategoriesList() {
    this.#buildElementsArrays();
    this.#drawListElementsToHTML();
  }

  #drawListElementsToHTML() {
    let innerHTML = this.#createHtmlElements(this.#modalListElements);
    innerHTML = this.#createHtmlModalList(innerHTML);
    innerHTML = this.#createHtmlElements(this.#leftListElements) + innerHTML;
    this.#refListElements.innerHTML = innerHTML;
  }

  #createHtmlModalList(innerHTML) {
    const section = this.#SERVICE_CATEGORY_ID;
    const display_name = this.#amounButton == 0 ? 'Categories' : 'Others';

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
      'change',
      this.#onChangeSelectCategory.bind(this)
    );
  }

  #onChangeSelectCategory(e) {
    if (e.target.id !== this.#SERVICE_CATEGORY_ID) {
      this.#selectElementInModalListElements = e.target.id;
    }
    this.#toggleModalCategoryList(e.target.id);
  }

  #toggleModalCategoryList(selectCategoryID) {
    const modalList = this.#refListElements.querySelector(
      `.${this.#CATEGORY_MODAL_LIST_CLASS}`
    );
    if (selectCategoryID == this.#SERVICE_CATEGORY_ID) {
      modalList.classList.remove(NO_VIEW_CLASS);
    } else {
      modalList.classList.add(NO_VIEW_CLASS);

      this.#changeLabelOnOtherButton(selectCategoryID);
    }
  }

  #changeLabelOnOtherButton(categoryID) {
    const selectCategory = this.#modalListElements.filter(
      ({ section }) => section == categoryID
    );

    if (selectCategory.length > 0) {
      this.#enterNewCategoryNameToBtnCaption(selectCategory[0].display_name);
      this.#setSelectOnOtherButton();
    }
  }

  #enterNewCategoryNameToBtnCaption(caption) {
    this.#refListElements.querySelector(
      `.${this.#SERVICE_CATEGORY_CLASS} div`
    ).innerHTML = caption;
  }

  #setSelectOnOtherButton() {
    console.dir(
      document.querySelector('#form-categories').elements.categories.value
    );
    document.querySelector('#form-categories').elements.categories.value =
      'Others';
  }
}
