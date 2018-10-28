import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import { withStyles } from 'material-ui/styles';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card';
import CardContent from 'material-ui/Card';
import CardMedia from 'material-ui/Card';
import Button from 'material-ui/Button';

import './ProjectCard.css';
/*
import Card from "react-md/lib/Cards/Card";
import Media, { MediaOverlay } from "react-md/lib/Media";
*/


const styles = {
  card: {
    margin: 20,
  },
  media: {
    height: 250,
  },
};

/**/

function ProjectCard(props) {

  const { classes } = props
  return(
    <div>
        
       <Card className={classes.card} >
          <CardMedia className={classes.media}
            title = "wahatever"
            classes = {{root: 'myProjClass'}}
            style = {{backgroundImage: `url(/images/${props.data.image})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}

          /> 

          <CardContent
            style = {{padding: '20px'}}
          >  
            <h2>{props.data.title}</h2>
            <p>{props.data.date}</p>
            <p>{props.data.description}</p>
            Built With:
            <div className="project-tools">
            {
              props.data.builtWith.map((item) => {
                return (
                    <div className="project-tool-container">
                      <img className="project-tool-icon" src={`/images/icons/${item.toLowerCase()}.png`} alt={item}/>
                    </div>
                  )
              })
            }
            </div>  
          </CardContent>
      </Card>
      
    </div>
    )
}

ProjectCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectCard);
