/*globals COURSES:true */
import React, { Component } from 'react'
import Dashboard from './Dashboard'
import GlobalNav from './GlobalNav'
import store from '../../store'

class App extends Component {
  render() {
    return (
      <div>
        <GlobalNav />
        <div className="container">
          {this.props.children || <Dashboard courses={COURSES} />}
        </div>
        <h2>{store.name}</h2>
      </div>
    )
  }
}

module.exports = App
