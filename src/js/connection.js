import { sendMessage } from './notification';

/**
 * Laod data from backend
 */
export default class Connection {
  constructor() {}

  async getData(httpRequest) {
    try {
      const requestData = await fetch(httpRequest).then(response => {
        return response.json();
      });
      return requestData.results;
    } catch (error) {
      sendMessage(error.response.statusText);
      return [];
    }
  }
}
