import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data'
import { UserData } from '../api/userData'
import AddCardComponents from '../ui/SingleCard.jsx'

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

class MyScraps extends Component {

  constructor(props) {
    super(props);
    this.state = {d: []};

    this.displayScraps = this.displayScraps.bind(this);
    this.addToState = this.addToState.bind(this);
    this.mapCards = this.mapCards.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  addToState(res) {
    if(this.state.d.length !== res.length) {
      this.setState({d: res})
    }
  }


  displayScraps() {
    let getMeOut = this.addToState;
    if(this.props.user[0]) {
      Meteor.call("getUserCards", function(err, res) {
        if(err) {
          console.log(err);
        }
        getMeOut(res)
      })
    }
  }

  mapCards() {
    return this.state.d.map((c) => {
      return <AddCardComponents key={Math.random()} d={c} userName={Meteor.user().username}
                         avatar={Meteor.user().profile.avatar}/>
    })
  }

  imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
  }

  addCard() {
    let img = $("#pic").val();
    let com = $("#comment").val();

    this.imageExists(img, function(image) {
      if(image) {
        Meteor.call("addToCards", img, com)
      } else {
        console.log("Can't load that image!")
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div className="card-holder">
          <div className="add-input-group">
            <input type="text" id="pic"/>
            <input type="text" id="comment"/>
            <button onClick={this.addCard} > Add Card </button>
          </div>
          {this.displayScraps()}
          {this.mapCards()}
        </div>
      </MuiThemeProvider>
    )
  }
}



class SinglePicture extends Component {

  constructor(props) {
    super(props);

    this.getCards = this.getCards.bind(this);
    this.click_ = this.click_.bind(this);
  }

  getCards() {
    return (
      <div>
        <img src={this.props.d.url} className="my-pics" />
      </div>
    )
  }

  click_() {
    console.log(UserData.findOne({name: "SHADOW"}))
  }

  render() {
    return (
      <div className="single-picture">
        {this.props.d ? this.getCards() : "Loading data..."}
        <button className="delete-card" onClick={this.click_} > CLICK </button>
      </div>
    )
  }
}


MyScraps.propTypes = {
  user: PropTypes.array.isRequired,
  userData: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("userData");
  return {
    user: [Meteor.user()],
    userData: UserData.find({}).fetch()
  };
}, MyScraps);


