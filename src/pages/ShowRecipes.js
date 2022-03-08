import React, {Component} from 'react';
import RecipesGrid from "../components/RecipesGrid";
import * as Constants from "../Constants";
import PropTypes from "prop-types";

class ShowRecipes extends Component {
  static propTypes = {
    changeSearchDivVisibility: PropTypes.func,
    recipeNameFilter: PropTypes.string
  };

  state = {
    recipes: []
  }

  changeSearchDivVisibility = () => {
    if (this.props.changeSearchDivVisibility) {
      this.props.changeSearchDivVisibility('visible');
    }
  }

  componentDidMount() {
    this.changeSearchDivVisibility()
    fetch(Constants.SHOW_RECIPES_URL)
        .then(res => res.json())
        .then(recipes => recipes.recipes)
        .then(recipes => recipes.filter(recipe => this.recipeNameContainingString(recipe, this.props.recipeNameFilter)))
        .then(recipes => recipes.sort((a, b) => a.name > b.name ? 1 : -1))
        .then(sortedRecipes => this.setState({recipes: sortedRecipes}))
        .catch(console.log)
  }

  recipeNameContainingString(recipe, string) {
    return recipe.name
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .includes(
            string
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
  }

  render() {
    let filteredRecipes = this.props.recipeNameFilter
        ? this.state.recipes
            .filter(recipe => this.recipeNameContainingString(recipe, this.props.recipeNameFilter))
        : this.state.recipes
    return (<RecipesGrid recipes={filteredRecipes}/>)
  }
}

export default ShowRecipes;
