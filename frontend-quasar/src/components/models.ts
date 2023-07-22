export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Recipe {
  id: number;
  calories: number;
  carbs: string;
  fat: string;
  image: string;
  protein: string;
  title: string;
}

export interface Ingredient {
  image: string;
  consistency: string;
  name: string;
  amount: number;
  unit: string;
}

// Define a interface para os detalhes da receita
export interface DetailCard {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: Ingredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  summary: string;
  cuisines: string[];
  instructions: string;
  analyzedInstructions: {
    name: string;
    steps: {
      number: number;
      step: string;
      ingredients: Ingredient[];
      equipment: any[];
      length?: {
        number: number;
        unit: string;
      };
    }[];
  }[];
  spoonacularSourceUrl: string;
}
