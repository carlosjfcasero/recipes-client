import React, {Component, Fragment} from 'react';
import {Modal} from "react-bootstrap";
import CustomSelector from "../components/CustomSelector";
import {WithContext as ReactTags} from 'react-tag-input';
import MyRichTextEditor from "../components/MyRichTextEditor";
import * as Constants from "../Constants";
import './CreateRecipe.css'

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class CreateRecipe extends Component {

  state = {
    courseValues: ['Entrante', 'Principal', 'Otros'],
    temperatureValues: ['Frío', 'Caliente'],
    originValues: [],
    recipe: {},
    currentRecipes: [],
    tags: []
  }

  constructor(props) {
    super(props);
    this.state.recipe.course = this.state.courseValues[0]
    this.state.recipe.temperature = this.state.temperatureValues[0]
    this.state.recipe.favourite = false
    this.state.showOkModal = false
    this.state.showErrorModal = false

    this.handleShowOkModal = this.handleShowOkModal.bind(this);
    this.handleHideOkModal = this.handleHideOkModal.bind(this);
    this.handleShowErrorModal = this.handleShowErrorModal.bind(this);
    this.handleHideErrorModal = this.handleHideErrorModal.bind(this);
    this.sendNewRecipe = this.sendNewRecipe.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  componentDidMount() {
    fetch(Constants.SHOW_RECIPES_URL)
        .then(res => res.json())
        .then(recipes => recipes.recipes)
        .then(data => {
          this.setState({currentRecipes: data})
          return data
        })
        .then(recipes => {
          this.setState({originValues: new Set(recipes.map(recipe => recipe.origin))})
          return recipes
        })
        .then(recipes => {
          this.state.recipe.origin = this.state.originValues.values().next().value
          let rawTags = recipes.map(recipe => recipe.tags).filter(v => v != null)
          let flattenTags = new Set(Array.prototype.concat.apply([], rawTags))
          let rawSuggestions = Array.from(flattenTags).map(tag => [{id: tag, text: tag}]);
          let flattenSuggestions = Array.prototype.concat.apply([], rawSuggestions)
          this.setState({suggestedTags: flattenSuggestions})
        })
        .catch(console.log)
  }

  handleDelete(i) {
    const {tags} = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
    this.setState(state => ({tags: [...state.tags, tag]}));
  }

  handleShowOkModal = () => {
    this.setState({showOkModal: true});
  };

  handleHideOkModal = () => {
    this.setState({showOkModal: false});
  };

  handleShowErrorModal = () => {
    this.setState({showErrorModal: true});
  };

  handleHideErrorModal = () => {
    this.setState({showErrorModal: false});
  };

  handleInputChange = (event) => {
    this.handleInputChangeWithName(event.target.value, event.target.name)
  }

  handleInputChangeWithName = (data, name) => {
    let prevState = Object.assign({}, this.state.recipe)
    prevState[name] = data
    this.setState({recipe: prevState});
  }

  handleCheckChange = () => {
    let prevState = Object.assign({}, this.state.recipe)
    prevState['favourite'] = !this.state.recipe.favourite
    this.setState({recipe: prevState});
  }

  autoResize = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  sendNewRecipe(event) {
    event.preventDefault()
    let currentRecipe = Object.assign({}, this.state.recipe)
    currentRecipe['tags'] = this.state.tags.map(tag => tag.text)
    this.setState({recipe: currentRecipe});
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(currentRecipe)
    }

    fetch(Constants.CREATE_NEW_RECIPE_URL, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then(this.handleShowOkModal)
        .catch(this.handleShowErrorModal)
        .catch(console.log)
  }

  onKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  render() {
    return (
        <>
          <Fragment>
            <h1 style={{textAlign: "center", padding: "2%", color: Constants.PRIMARY_COLOR}}>Nueva receta</h1>
            <form className="row" onSubmit={this.sendNewRecipe} onKeyPress={this.onKeyPress}>
              <div>
                <h4 style={{padding: "1%", color: Constants.PRIMARY_COLOR}}>Título</h4>
              </div>
              <div>
                <div className="col-4">
                  <input type="text" placeholder="Título" className="form-control" onChange={this.handleInputChange}
                         name="name"/>
                </div>
              </div>
              <div>
                <h4 style={{padding: "1%", color: Constants.PRIMARY_COLOR}}>Descripción</h4>
              </div>
              <div>
                <div className="col-4">
                  <MyRichTextEditor onChange={this.handleInputChangeWithName} name={"description"}/>
                </div>
              </div>
              <div>
                <h4 style={{padding: "1%", color: Constants.PRIMARY_COLOR}}>Favorito</h4>
              </div>
              <div>
                <div className="col-4">
                  <input type="checkbox" className="form-check" onChange={this.handleCheckChange} name="favourite"/>
                </div>
              </div>
              <div>
                <h4 style={{padding: "1%", color: Constants.PRIMARY_COLOR}}>Ingredientes</h4>
              </div>
              <div>
                <div className="col-4">
                  <MyRichTextEditor onChange={this.handleInputChangeWithName} name={"ingredients"}/>
                </div>
              </div>
              <CustomSelector handleInputChange={this.handleInputChange} values={this.state.originValues}
                              name={"origin"} label={"Origen"}/>
              <CustomSelector handleInputChange={this.handleInputChange} values={this.state.temperatureValues}
                              name={"temperature"} label={"Temperatura"}/>
              <div>
                <h4 style={{padding: "1%", color: Constants.PRIMARY_COLOR}}>Etiquetas</h4>
              </div>
              <div>
                <ReactTags tags={this.state.tags}
                           suggestions={this.state.suggestedTags}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           handleDrag={this.handleDrag}
                           delimiters={delimiters}/>
              </div>
              <CustomSelector handleInputChange={this.handleInputChange} values={this.state.courseValues}
                              name={"course"} label={"Plato"}/>
              <div>
                <h4 style={{padding: "1%", color: Constants.PRIMARY_COLOR}}>URL</h4>
              </div>
              <div>
                <div className="col-4">
                  <input type="text" placeholder="Url" className="form-control" onChange={this.handleInputChange}
                         name="url"/>
                </div>
              </div>
              <div>
                <h4 style={{padding: "1%", color: Constants.PRIMARY_COLOR}}>Tiempo (HH:mm)</h4>
              </div>
              <div>
                <div className="col-4">
                  <input type="text" placeholder="Tiempo" className="form-control" onChange={this.handleInputChange}
                         name="time"/>
                </div>
              </div>

              <button className="btn btn-primary">Enviar</button>
            </form>
          </Fragment>
          <Modal show={this.state.showOkModal} onHide={this.handleHideOkModal} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Receta Añadida</Modal.Title>
            </Modal.Header>
          </Modal>
          <Modal show={this.state.showErrorModal} onHide={this.handleHideErrorModal} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Error añadiendo la receta</Modal.Title>
            </Modal.Header>
          </Modal>
        </>
    );
  }
}

export default CreateRecipe;
