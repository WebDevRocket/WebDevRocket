import React from "react"
import styled from "styled-components"

import Header from "./header"
import Footer from "./footer"

const Main = styled.main`
  max-width: var(--main-width);
  margin: 0 auto;

  @media (max-width: 688px) {
    margin: 0 var(--spacing-24);
  }
`

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
