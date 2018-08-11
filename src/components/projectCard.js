import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card';
import CardContent from 'material-ui/Card';
import CardMedia from 'material-ui/Card';
import Button from 'material-ui/Button';

/*
import Card from "react-md/lib/Cards/Card";
import Media, { MediaOverlay } from "react-md/lib/Media";
*/

const styles = {
  card: {
    /*maxWidth: 500,*/
    margin: 20,
  },
  media: {
    height: 300,
    /*paddingTop: '56.25%', // 16:9*/ 
  },
};

/**/

function ProjectCard(props) {

  const { classes } = props
  return(
    <div>
        
       <Card className={classes.card}>
          <CardMedia className={classes.media}
            title = "wahatever"
            style = {{backgroundImage: `url(/images/pulp-bg.jpg)`, backgroundSize: 'cover'}}

          /> 


          <CardContent>  
            <h2>{props.data.title}</h2>
            <p>{props.data.date}</p>
            <p>{props.data.description}</p>
            Built With:
            {
              props.data.builtWith.map((item) =>{
                return <div>{item}</div>
              })
            }  
          </CardContent>
      </Card>
      
    </div>
    )
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectCard);
