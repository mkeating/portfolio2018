
import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({data}) => {
  const {edges: posts} = data.allMarkdownRemark;
  return (
    <div>
      {posts.map (({node: post}) => {
        const {frontmatter} = post;
        return (
          <Link to={frontmatter.path}>
            <div>
              <h2>
                
                  {frontmatter.title}
                
              </h2>
              <p>{frontmatter.date}</p>
              <p>{frontmatter.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export const blogQuery = graphql`
  query IndexQuery {
    allMarkdownRemark( filter: { frontmatter: { path: { regex: "/\/blog\/(.*)/" } } } sort: { order: DESC, fields: [frontmatter___date] }) {
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