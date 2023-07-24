import { api, firebaseApi } from '../boot/axios'

export class ConsultService {
  static itemsURL = 'items/'
  static getItemById = 'itemsDetailed/'

  static favoriteItems = 'all'
  static setOrRemoveFavorite = 'fav'
  static editedRecipe = 'edited'
  static allEditedRecipes = 'alledited'

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
      return this.getAllEditedRecipes(displayed)
    } catch (error) {
      console.error(error)
      return []
    }
  }

  static postFavorite (id) {
    const res = firebaseApi.post(this.setOrRemoveFavorite, { id })
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
      return this.getAllEditedRecipes(displayed)
    } catch (error) {
      console.error(error)
    }
  }

  static async getAllEditedRecipes (displayed) {
    const responseEdited = firebaseApi.get(this.allEditedRecipes)
    const edits = (await responseEdited).data
    for (let i = 0; i < displayed.length; i++) {
      for (let j = 0; j < edits.length; j++) {
        if (String(displayed[i].id) === edits[j].id) {
          displayed[i].title = edits[j].title
          displayed[i].calories = edits[j].calories
          displayed[i].fat = edits[j].fat
          displayed[i].carbs = edits[j].carbs
          displayed[i].protein = edits[j].protein
        }
      }
    }
    return displayed
  }

  static getElementById (id) {
    const element = api.get(this.getItemById + id)
    const edited = firebaseApi.get(`${this.editedRecipe}/${id}`)
    if (edited) {
      element.title = edited.title
      element.calories = edited.calories
      element.fat = edited.fat
      element.carbs = edited.carbs
      element.protein = edited.protein
    }
    return element
  }
}
