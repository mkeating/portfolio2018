
import React from 'react';
import Link from 'gatsby-link';
import Paper from 'material-ui/Paper'

const IndexPage = ({data}) => {
  const {edges: posts} = data.allMarkdownRemark;
  return (
    <div>
      {posts.map (({node: post}) => {
        
        const {frontmatter} = post;

        return (
          <Paper>
            <Link to={frontmatter.path}>
              <div>
                <h2>          
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
  );
};

//sort: { order: DESC, fields: [frontmatter___date] }

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
`;

export default IndexPage;