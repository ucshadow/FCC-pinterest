import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Avatar from '../ui/Avatar.jsx';
import { UserData } from "../api/userData";

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const pictureStyle = {width: "80%", height: "80%", marginLeft: "10%", border: "#223539 1px solid"};


export default class DisplayImage extends React.Component {

  render() {
    return <Container id={this.props.d._id}/>;
  }
}

class RenderImage extends Component {

    constructor(props) {
    super(props);
    this.state = {img: "/img/placeholder.svg"};


    this.imageExists(this.props.d.url, (image) =>  {
      if(image) {
        this.setState({img: this.props.d.url})
      } else {
        this.setState({img: "/img/no-image.jpg"})
      }
    })

  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  render() {
    return (
      <CardMedia mediaStyle={pictureStyle}>
        <img src={this.state.img} />
      </CardMedia>
    )
  }
}

let Container = createContainer((props) => {
  let doc = UserData.findOne({_id: props.id});
  return {
    d: doc ? doc : null
  }
}, RenderImage);