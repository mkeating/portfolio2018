import React from 'react'
import Link from 'gatsby-link'

import ProjectCard from '../components/ProjectCard'

const IndexPage = ({data}) => {
  const {edges: projects} = data.allMarkdownRemark
  return (
    <div>
      {projects.map (({node: project}) => {
        const {frontmatter} = project
        return (
          <Link to={frontmatter.path} className="blog-card-link">
            <ProjectCard data={frontmatter}/>
          </Link>
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
            image
          }
        }
      }
    }
  }
`

export default IndexPage
