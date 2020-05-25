import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"

const Wrapper = styled.header`
  background-color: #44318d;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--spacing-32);
  width: 100%;
  margin-top: 12px;

  @media (max-width: 784px) {
    margin-top: 0;
  }
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: var(--main-width);
  position: relative;

  @media (max-width: 688px) {
    margin: 0 var(--spacing-24);
  }
`

const TitleLinkWrapper = styled.div`
  flex-grow: 1;
`

const TitleLink = styled(Link)`
  color: white;
  font-family: var(--font-family-code);
  font-size: var(--font-size-18);
  font-weight: 400;
  letter-spacing: 1px;
  text-decoration: none;
`

const NavLink = styled(Link).attrs({})`
  color: white;
  margin-left: var(--spacing-32);
  text-transform: capitalize;
  text-decoration: none;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: inset 0 -1px white;
    box-shadow: inset 0 -2px white;
  }

  @media (max-width: 688px) {
    display: none;
  }
`

const Logo = styled.img.attrs({
  src: "/icons/icon-48x48.png",
  alt: "rocket logo",
})`
  width: 48px;
  height: 48px;
  position: absolute;
  left: -60px;

  @media (max-width: 784px) {
    display: none;
  }
`

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  return (
    <Wrapper>
      <Nav>
        <Logo />
        <TitleLinkWrapper>
          <TitleLink to="/">{title}</TitleLink>
        </TitleLinkWrapper>
        <NavLink>guides</NavLink>
        <NavLink>posts</NavLink>
        <NavLink>hints</NavLink>
      </Nav>
    </Wrapper>
  )
}

export default Header
