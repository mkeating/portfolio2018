import React from 'react'

const ProjectTemplate = ({data}) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark

  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
          
        />
        <div>Check out the <a href={frontmatter.liveLink}>live site</a> or the <a href={frontmatter.githubLink}>GitHub repo</a></div>
      </div>
    </div>
  )

}

export const projectPageQuery = graphql`
  query ProjectPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        layout
        liveLink
        githubLink
      }
    }
  }
`
export default ProjectTemplate