import React, {useState} from 'react'
import {Button, Modal} from "react-bootstrap";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import BasicTabs from "./BasicTabs";

export default function RecipeCard({recipe}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
        <Card border="primary" style={{width: '18rem'}} onClick={handleShow}>
          <CardActionArea>
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

        <Modal show={show} onHide={handleClose} scrollable={true}>
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