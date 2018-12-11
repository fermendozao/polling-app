import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet';

import { StaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

import { Container } from '../styledComponents/layout';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          title="Polling App"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <Header
          background="background-image: linear-gradient(116deg, #08AEEA 0%, #2AF598 100%)"
          siteTitle={data.site.siteMetadata.title} />
        <Container>
          {children}
        </Container>
      </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
