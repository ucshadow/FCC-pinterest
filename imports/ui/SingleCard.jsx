import React, { Component, PropTypes } from 'react';
import AddCardComponents from '../ui/AddCardComponents.jsx'


export default class SingleCard extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.d);

    this.mapUserCards = this.mapUserCards.bind(this);
  }

  mapUserCards() {
    if(this.props.d.cards) {
      return this.props.d.cards.map((c) => {
        return <AddCardComponents key={Math.random()} userName={this.props.d.name}
                                  avatar={this.props.d.avatar} d={c} _id_={c._id_}/>
      })
    }
  }

  render() {
    return (
      <div>
        {this.mapUserCards()}
      </div>
    )
  }
}


