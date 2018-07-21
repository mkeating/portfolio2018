import React from "react";
import Link from "gatsby-link";

import './index.scss';

const ListLink = props => (
		<li>
			<Link to={props.to}>
				{props.children}
			</Link>
		</li>
	);

export default({ children }) => (
		<div className="main">
			<nav className="nav">
				
				<Link to="/"><h1>Home</h1></Link>

				<div className="nav-items">
					<ul className="nav-list">
						<ListLink to="/blog/">Blog</ListLink>
						<ListLink to="/me/">Me</ListLink>
						<ListLink to="/work/">Work</ListLink>
					</ul>
				</div>
				

			</nav>
			

			{children()}

			<div className="mobile-nav-button">
				<div className="bar1"></div>
				<div className="bar2"></div>
				<div className="bar3"></div>
			</div>

		</div>
	);
	