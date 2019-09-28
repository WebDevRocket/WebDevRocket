import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"

import { rhythm } from "utils/typography"

const TitleLink = styled(Link).attrs({
  to: "/",
})`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`

const Footer = styled.footer`
  font-size: 0.75em;
  font-style: italic;
`

const Layout = ({ location, children }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author
          title
        }
      }
    }
  `)
  const { author, title } = data.site.siteMetadata

  const rootPath = `${__PATH_PREFIX__}/`
  const header =
    location.pathname === rootPath ? (
      <h1
        style={{
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <TitleLink>{title}</TitleLink>
      </h1>
    ) : (
      <h3
        className="siteName"
        style={{
          marginTop: 0,
        }}
      >
        <TitleLink>{title}</TitleLink>
      </h3>
    )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <Footer>
        © {new Date().getFullYear()} {author}
      </Footer>
    </div>
  )
}

export default Layout
