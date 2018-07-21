import React from "react";
import Link from "gatsby-link";

export default({ children }) => (
		<div>
			<nav>
				
				<Link to="/">Home</Link>
				<Link to="/blog/">Blog</Link>
				<Link to="/me/">Me</Link>
				<Link to="/work/">Work</Link>

			</nav>
			{children()}

		</div>
	);
	