import React from 'react';
import Navigation from '../ui/Navigation.jsx'

export default class NotFound extends React.Component {

  render() {
    return (
      <div className="not-found">
        <Navigation />
        <strong>Error [404]</strong>: { window.location.pathname } does not exist.
        <div className="not-found-pic"></div>
      </div>
    )
  }

}