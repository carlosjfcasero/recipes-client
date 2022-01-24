import React, {Component} from 'react';
import RecipesGrid from "../components/RecipesGrid";
import * as Constants from "../Constants";

class ShowRecipes extends Component {

  state = {
    recipes: []
  }

  componentDidMount() {
    fetch(Constants.SHOW_RECIPES_URL)
        .then(res => res.json())
        .then(recipes => recipes.recipes)
        .then(recipes => recipes.sort((a, b) => a.name > b.name ? 1 : -1))
        .then(sortedRecipes => this.setState({recipes: sortedRecipes}))
        .catch(console.log)
  }

  render() {
    return (<RecipesGrid recipes={this.state.recipes}/>);
  }
}

export default ShowRecipes;
