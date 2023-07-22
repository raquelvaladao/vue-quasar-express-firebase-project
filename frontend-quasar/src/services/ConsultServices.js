import { api, firebaseApi } from '../boot/axios'

export class ConsultService {
  static itemsURL = 'items/'
  static getItemById = 'items/'

  static favoriteItems = 'all'
  static setOrRemoveFavorite = 'fav'

  static async getAllElementsHome () {
    const Allfavorites = firebaseApi.get(this.favoriteItems)
    let favs = []
    favs = (await Allfavorites).data
    const displayed = []

    try {
      const recipes = api.get(this.itemsURL)
      let cards = []
      cards = (await recipes).data

      for (let index = 0; index < cards.length; index++) {
        displayed.push(cards[index])
        for (let j = 0; j < favs.length; j++) {
          if (String(cards[index].id) === favs[j].id) {
            displayed[index].fav = true
          }
        }
      }
      return displayed
    } catch (error) {
      console.error(error)
      return []
    }
  }

  static postFavorite (id) {
    const res = firebaseApi.post(this.setOrRemoveFavorite, { id: id })
    console.log(res.data)
    return res
  }

  static async getAllElementsFavorites () {
    const Allfavorites = firebaseApi.get(this.favoriteItems)
    let favs = []
    favs = (await Allfavorites).data
    const displayed = []

    try {
      const recipes = api.get(this.itemsURL)
      let cards = []
      cards = (await recipes).data

      for (let index = 0; index < cards.length; index++) {
        for (let j = 0; j < favs.length; j++) {
          if (String(cards[index].id) === favs[j].id) {
            displayed.push(cards[index])
          }
        }
      }
      return displayed
    } catch (error) {
      console.error(error)
    }
  }

  static getElementById (id) {
    return api.get(this.getItemById + id)
  }
}
