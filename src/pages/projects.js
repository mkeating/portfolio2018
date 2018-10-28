import React from 'react'
import Link from 'gatsby-link'

import ProjectCard from '../components/ProjectCard'

const WorkPage = ({data}) => {
  const {edges: projects} = data.allMarkdownRemark
  return (
    <div>

      <h1 className="page-header"> My Work </h1>
      <div className="project-page-container">
        {projects.map (({node: project}) => {
          const {frontmatter} = project
          return (
            <div className="project-page-card">
              <Link to={frontmatter.path} className="blog-card-link">
                <ProjectCard data={frontmatter}/>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const projectQuery = graphql`
  query ProjectIndexQuery {
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

export default WorkPage
