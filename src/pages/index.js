import React from 'react'
import Link from 'gatsby-link'

import projectCard from '../components/projectCard'

const IndexPage = ({data}) => {
  const {edges: projects} = data.allMarkdownRemark
  return (
    <div>
      {projects.map (({node: project}) => {
        const {frontmatter} = project
        return (

          <projectCard data={frontmatter}/>
        
        )
      })}
    </div>
  )
}

export const projectQuery = graphql`
  query HomeProjectIndexQuery {
    allMarkdownRemark (filter: { frontmatter: { path: { regex: "/\/projects\/(.*)/" } } }){
      edges {
        node {
          id
          frontmatter {
            title
            path
            builtWith
            description
          }
        }
      }
    }
  }
`

export default IndexPage
