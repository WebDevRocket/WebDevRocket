import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"

const Wrapper = styled.header`
  background: linear-gradient(to right, var(--color-accent), var(--color-dark));
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--spacing-32);
  width: 100%;
  margin-top: 12px;

  @media (max-width: 688px) {
    margin-top: 0;
    height: var(--spacing-64);
    background: var(--color-accent);
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
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

const NavLink = styled(Link)`
  color: white;
  font-size: var(--font-size-18);
  margin-left: var(--spacing-32);
  text-transform: capitalize;
  text-decoration: none;

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
        <NavLink to="">guides</NavLink>
        <NavLink to="">posts</NavLink>
        <NavLink to="">hints</NavLink>
      </Nav>
    </Wrapper>
  )
}

export default Header
