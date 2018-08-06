import React from 'react'
import Link from 'gatsby-link'
import Paper from 'material-ui/Paper'

const IndexPage = ({data}) => {
  
  const {edges: posts} = data.allMarkdownRemark

  return (
    <div>
      {posts.map (({node: post}) => {
        
        const {frontmatter} = post

        return (
          <Paper className="blog-card">
            <Link to={frontmatter.path} className="blog-card-link">
              <div>
                <h2 className="blog-card-title">          
                    {frontmatter.title}
                </h2>
                <p>{frontmatter.date}</p>
                <p>{frontmatter.description}</p>
              </div>
            </Link>
          </Paper>
        );
      })}
    </div>
  )
}

export const blogQuery = graphql`
  query BlogIndexQuery {
    allMarkdownRemark( filter: { frontmatter: { path: { regex: "/\/blog\/(.*)/" } } } ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            description
          }
        }
      }
    }
  }
`

export default IndexPage