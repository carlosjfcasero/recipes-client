import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Constants from "../Constants";

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
      >
        {value === index && (
            <Box sx={{p: 3}}>
              <Typography>{children}</Typography>
            </Box>
        )}
      </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    style: {color: '#412774'},
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({recipe}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Box style={{color: Constants.PRIMARY_COLOR}} sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                TabIndicatorProps={{style: {background: Constants.PRIMARY_COLOR}}}>
            <Tab label="Ingredientes" {...a11yProps(0)} />
            <Tab label="Descripción" {...a11yProps(1)} />
            <Tab label="Detalles" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div dangerouslySetInnerHTML={{__html: recipe.ingredients}}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div dangerouslySetInnerHTML={{__html: recipe.description}}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <a style={{fontSize: Constants.RECIPE_DETAILS_KEY_SIZE}}>Plato: </a>{recipe.course}
          <br/>
          <a style={{fontSize: Constants.RECIPE_DETAILS_KEY_SIZE}}>Temperatura: </a> {recipe.temperature}
          <br/>
          <a style={{fontSize: Constants.RECIPE_DETAILS_KEY_SIZE}}>Favorito: </a>
          {
            (recipe.favourite === true)
                ? <a> Sí </a>
                : <a> No </a>
          }
          <br/>
          <a style={{fontSize: Constants.RECIPE_DETAILS_KEY_SIZE}}>Origen: </a> {recipe.origin}
          <br/>
          <a style={{fontSize: Constants.RECIPE_DETAILS_KEY_SIZE}}>Etiquetas: </a> {recipe.tags}
          <br/>
          <a style={{fontSize: Constants.RECIPE_DETAILS_KEY_SIZE}}>Tiempo (hh:mm): </a> {recipe.time}
          <br/>
          <a style={{fontSize: Constants.RECIPE_DETAILS_KEY_SIZE}}>URL:</a> <a href={recipe.url} target="_blank">Receta
          original</a>
        </TabPanel>
      </Box>
  );
}
