import React from 'react'
import {Col, Row} from "react-bootstrap";
import RecipeCard from "./RecipeCard";

const RecipesGrid = ({recipes}) => {
  return (
      <div>
        <center><h1>Recipe List</h1></center>
        <Row xs={3} md={3} lg={3} className="g-4">
          {Array.from(recipes, recipe => {
            return (
                <Col xs={3} md={3} lg={3}>
                  <RecipeCard recipe={recipe}/>
                </Col>)
          })}
        </Row>
      </div>
  )
};

export default RecipesGrid