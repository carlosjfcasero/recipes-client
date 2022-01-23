import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import CreateRecipe from "./pages/CreateRecipe";
import Navigation from "./components/Navigation";
import ShowRecipes from "./pages/ShowRecipes";

class App extends Component {
  state = {
    recipes: []
  }

  render() {
    return (
        <>
          <Navigation/>
          <Routes>
            <Route path='/new-recipe' element={<CreateRecipe/>}/>
            <Route path='/show-recipes' element={<ShowRecipes/>}/>
            <Route path='/home' element={<ShowRecipes/>}/>
          </Routes>
        </>
    )
  }
}

export default App;