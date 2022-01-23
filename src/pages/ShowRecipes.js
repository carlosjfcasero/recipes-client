import React, {Component} from 'react';
import RecipesGrid from "../components/RecipesGrid";

class ShowRecipes extends Component {

  state = {
    recipes: []
  }

  componentDidMount() {
    fetch('http://localhost:8443/recipes-manager/v1/recipes')
        .then(res => res.json())
        .then(recipes => recipes.recipes)
        .then(recipes => recipes.sort((a, b) => a.name > b.name ? 1 : -1))
        .then((data) => {
          this.setState({recipes: data})
        })
        .catch(console.log)
  }

  render() {
    return (
        <RecipesGrid recipes={this.state.recipes}/>
    );
  }

}

export default ShowRecipes;