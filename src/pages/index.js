import React from "react";
import Link from 'gatsby-link';

const IndexPage = ({data}) => {
  const {edges: projects} = data.allMarkdownRemark;
  return (
    <div>
      {projects.map (({node: project}) => {
        const {frontmatter} = project;
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

export const projectQuery = graphql`
  query ProjectIndexQuery {
    allMarkdownRemark (filter: { frontmatter: { path: { regex: "/\/projects\/(.*)/" } } }){
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default IndexPage;
