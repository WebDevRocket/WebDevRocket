import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const Content = styled.div`
  font-size: var(--font-size-12);
  font-style: italic;
  width: var(--main-width);

  @media (max-width: 688px) {
    margin: 0 var(--spacing-24);
  }
`

const Hr = styled.hr`
  margin-bottom: var(--spacing-4);
`

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata

  return (
    <Wrapper>
      <Content>
        <Hr />© {new Date().getFullYear()} {author}
      </Content>
    </Wrapper>
  )
}

export default Footer
