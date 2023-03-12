import { URL, API_KEY } from './globals';
import Connection from './connection';

/**
 * work with categories
 */
export class CategoriesMain {
  #refListElements = document.querySelector('.categories__list');

  #categoriesLoader;
  #categoriesList;
  #amounButton = 0;
  #leftListElements;
  #modalListElements;

  constructor() {
    this.#categoriesLoader = new CategoriesLoader();
    this.#categoriesLoader.addEventLoadData(
      this.#buildCategoriesList.bind(this)
    );
  }

  #buildCategoriesList(categoriesList) {
    this.#categoriesList = categoriesList;
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
    const section = this.#amounButton == 0 ? 'categories' : 'others';
    const display_name = this.#amounButton == 0 ? 'Categories' : 'Others';

    return `<li class="categories__item">
    <input type="radio" class="categories__input" id="${section}" name="categories" value="${display_name}"/>
    <label class="categories__label" for="${section}">${display_name}</label>
    <ul class="categories__modal-list">${innerHTML}</ul>
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
}

export class CategoriesLoader {
  #connection = null;
  #categoriesList = [];
  #callback = () => {};
  #isLoad = false;

  constructor() {
    this.#connection = new Connection();
    this.#loadCategoriesList();
  }

  addEventLoadData(callback) {
    this.#callback = callback;
  }

  getCategoriesList() {
    if (this.#isLoad) {
      this.#callback(this.#categoriesList);
      return;
    }
    this.#loadCategoriesList();
  }

  #loadCategoriesList() {
    this.#connection.getData(this.#createPath()).then(data => {
      this.#categoriesList = data;
      this.#isLoad = true;
      this.#callback(this.#categoriesList);
    });
  }

  #createPath() {
    return `${URL}/svc/news/v3/content/section-list.json?${API_KEY}`;
  }
}
