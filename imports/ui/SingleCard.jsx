import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';

const darkMuiTheme = getMuiTheme(darkBaseTheme);
const lightMuiTheme = getMuiTheme(lightBaseTheme);
const style = {marginRight: 20};
const pictureStyle = {width: "80%", height: "80%", marginLeft: "10%"};


export default class SingleCard extends Component {

  constructor() {
    super();

    this.mapUserCards = this.mapUserCards.bind(this);
  }

  mapUserCards() {
    if(this.props.d.cards) {
      return this.props.d.cards.map((c) => {
        return <AddCardComponents key={Math.random()} userName={this.props.d.name} avatar={this.props.d.avatar} d={c} />
      })
    }
  }

  render() {
    return (
      <div className="card-holder">
        {this.mapUserCards()}
      </div>
    )
  }
}


export default class AddCardComponents extends Component {


  render() {
    return (
      <Card  zDepth={4}>
        <CardHeader
          title={this.props.userName}
          avatar={this.props.avatar}/>
        <CardMedia mediaStyle={pictureStyle}>
          <img src={this.props.d.url} />
        </CardMedia>
        <CardText>
          {this.props.d.text}
        </CardText>
        <CardActions>
          <IconButton tooltip="Like">
            <ThumbUp />
          </IconButton>
          <IconButton tooltip="showDB">
            <ThumbDown />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}