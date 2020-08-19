/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {Link} from 'gatsby'

import Header from "./header"
import '../scss/app.scss'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return(
        <>
          <Header />
          {children}
          <footer id="footer" className="mt-5">
            <div className="container">
              <hr />
              <div className="row pt-3">
                <div className="col-sm">
                  <p className="text-center text-sm-left">
                    &copy; {new Date().getFullYear()} <Link to={"/"}>Collin Bachman</Link> | <Link to="/privacy">Privacy</Link>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
