import React, {Component} from 'react';
import RecipesGrid from './components/RecipesGrid';

class App extends Component {
  state = {
    recipes: []
  }

  componentDidMount() {
    fetch('https://192.168.1.136:8443/recipes-manager/v1/recipes')
    // fetch('http://localhost:8443/recipes-manager/v1/recipes')
        .then(res => res.json())
        .then(recipes => recipes.recipes)
        .then((data) => {
          this.setState({recipes: data})
        })
        .catch(console.log)
  }

  render() {
    return (
        <RecipesGrid recipes={this.state.recipes}/>
    )
  }
}

export default App;