import React from 'react'
import {Col, Row} from "react-bootstrap";
import RecipeCard from "./RecipeCard";

const RecipesGrid = ({recipes}) => {
  return (
      <div>
        <Row className="g-4" style={{padding: "25px"}}>
          {Array.from(recipes, recipe => {
            return (
                <Col xs={12} md={6} lg={4} xl={3} xxl={3}>
                  <RecipeCard recipe={recipe}/>
                </Col>)
          })}
        </Row>
      </div>
  )
};

export default RecipesGrid
