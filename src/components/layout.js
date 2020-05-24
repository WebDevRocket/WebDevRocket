import React from "react"
import styled from "styled-components"

import Header from "./header"
import Footer from "./footer"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainWrapper = styled.div`
  flex-grow: 1;
`

const Main = styled.main`
  max-width: var(--main-width);
  margin: 0 auto;

  @media (max-width: 688px) {
    margin: 0 var(--spacing-24);
  }
`

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <MainWrapper>
        <Main>{children}</Main>
      </MainWrapper>
      <Footer />
    </Wrapper>
  )
}

export default Layout
