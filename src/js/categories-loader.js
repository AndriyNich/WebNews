import Connection from './connection  ';

import { URL, API_KEY } from './globals';

const API_PATH_TO_CATEGORY = '/svc/news/v3/content/section-list.json';

/**
 * Load categories list from backend
 */
export default class CategoriesLoader {
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
    return `${URL}${API_PATH_TO_CATEGORY}?${API_KEY}`;
  }
}
