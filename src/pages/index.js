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
              Built With:
              {frontmatter.builtWith.map((item) =>{
              	return <div>{item}</div>
              })}
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
            builtWith
            description
          }
        }
      }
    }
  }
`;

export default IndexPage;
