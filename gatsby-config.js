module.exports = {
  plugins: [
  `gatsby-plugin-netlify-cms`,
  {
    resolve: `gatsby-source-filesystem`,
    	options: {
      	path: `${__dirname}/blog`,
     		name: "blog",
    	},
  },
  {	
    resolve: `gatsby-source-filesystem`,
	    options: {
	      path: `${__dirname}/projects`,
	      name: "projects",
	    },
  },
  {
    resolve: 'gatsby-plugin-material-ui',
    options: {
      pathToTheme: 'src/themes/default',
    },
  },
  {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  `gatsby-plugin-react-helmet`,
  /*`gatsby-plugin-styled-components`,*/
  `gatsby-plugin-sass`,
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            // Class prefix for <pre> tags containing syntax highlighting;
            // defaults to 'language-' (eg <pre class="language-js">).
            // If your site loads Prism into the browser at runtime,
            // (eg for use with libraries like react-live),
            // you may use this to prevent Prism from re-processing syntax.
            // This is an uncommon use-case though;
            // If you're unsure, it's best to use the default value.
            classPrefix: "language-",
            // This is used to allow setting a language for inline code
            // (i.e. single backticks) by creating a separator.
            // This separator is a string and will do no white-space
            // stripping.
            // A suggested value for English speakers is the non-ascii
            // character '›'.
            inlineCodeMarker: null,
            // This lets you set up language aliases.  For example,
            // setting this to '{ sh: "bash" }' will let you use
            // the language "sh" which will highlight using the
            // bash highlighter.
            aliases: {},
          },
        },
      ],
    },
  },
  ],
};