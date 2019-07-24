import React from "react"

import Hero from "../components/Hero"
import SEO from "../components/SEO"

import "../reset.css"
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return (
    <Hero>
      <SEO title="Home" />
      <h1>{title}</h1>
      <p>{description}</p>
    </Hero>
  )
}

export default IndexPage
