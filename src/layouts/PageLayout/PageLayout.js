import React from 'react'
import { IndexLink, Link, Route, routerShape } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

const PageLayout = ({ children }) => (
  <div className="container">

    <div>
      { children }
    </div>

  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
