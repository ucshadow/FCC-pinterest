import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { UserData } from "../api/userData";
import StateHolder from '../ui/SingleCard.jsx';
import Navigation from '../ui/Navigation.jsx'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

function asd() {
  return UserData.find({}).fetch()
}


export default class AllUserPosts extends Component {

  constructor(props) {
    super(props);

    this.mapCards = this.mapCards.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.userData.length !== nextProps.userData.length;
  }

  mapCards() {
    return this.props.userData.map((card) => {
      if(card.user === this.props.params.poster) {
        return <StateHolder key={Math.random()} d={card} />
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={lightMuiTheme}>
        <div>
            <Navigation />
          <div className="card-holder" id="card-container">
            {this.mapCards()}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}




AllUserPosts.propTypes = {
  muiTheme: PropTypes.object.isRequired,
  userData: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("userData");
  return {
    muiTheme: getMuiTheme(),
    userData: UserData.find({}).fetch()
  }
}, AllUserPosts);