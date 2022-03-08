import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import CreateRecipe from "./pages/CreateRecipe";
import Navigation from "./components/Navigation";
import ShowRecipes from "./pages/ShowRecipes";

class App extends Component {
  state = {
    searchDivVisibility: 'hidden',
    recipes: [],
    recipeNameFilter: ''
  }

  changeSearchDivVisibility = (visibility) => {
    this.setState({searchDivVisibility: visibility});
  }

  filterRecipeByName = (name) => {
    this.setState({recipeNameFilter: name});
  }

  render() {
    return (
        <>
          <Navigation searchDivVisibility={this.state.searchDivVisibility} filterRecipeByName={this.filterRecipeByName.bind()} />
          <Routes>
            <Route path='/'
                   element={<ShowRecipes
                       changeSearchDivVisibility={this.changeSearchDivVisibility.bind()}
                       recipeNameFilter={this.state.recipeNameFilter}/>}/>
            <Route path='/new-recipe' element={<CreateRecipe/>}/>
            <Route path='/show-recipes'
                   element={<ShowRecipes
                       changeSearchDivVisibility={this.changeSearchDivVisibility.bind()}
                       recipeNameFilter={this.state.recipeNameFilter}/>}/>
          </Routes>
        </>
    )
  }
}

export default App;
