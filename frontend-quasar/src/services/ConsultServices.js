import { api } from '../boot/axios'

export class ConsultService {
  static itemsURL = 'items/'
  static favoriteItem = 'items/'
  static getItemById = 'items/'
  static getAllElementsHome () {
    return api.get(this.itemsURL)
  }

  static getAllElementsFavorites () {
    return api.get(this.favoriteItem)
  }

  static getElementById (id) {
    return api.get(this.getItemById + id)
  }
}
