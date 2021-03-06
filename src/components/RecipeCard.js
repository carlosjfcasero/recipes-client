import React, {useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import BasicTabs from "./BasicTabs";
import * as Constants from "../Constants";
import './RecipeCard.css';

export default function RecipeCard({recipe}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
        <Card border="primary" onClick={handleShow} style={{height: "100%"}}>
          <CardActionArea style={{height: "100%", color: Constants.PRIMARY_COLOR}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {recipe.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.course}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Modal show={show} onHide={handleClose} scrollable={true} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>{recipe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BasicTabs recipe={recipe}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Actualizar receta
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Borrar receta
            </Button>
          </Modal.Footer>
        </Modal>
      </>)
};
