import React from 'react'
import Link from 'gatsby-link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'


import './index.scss'

require('prismjs/themes/prism-okaidia.css')

const ListLink = props => (
		
		<Link to={props.to} onClick={props.handler}>
			<li>
				{props.children}
			</li>
		</Link>
		
	);

class MobileNavButton extends React.Component {

	render(){
		return(
			<div className="mobile-nav-button" onClick={this.props.handler}>
					<div className={"bar1 " + (this.props.deployed ? 'change' : '')}></div>
					<div className={"bar2 " + (this.props.deployed ? 'change' : '')}></div>
					<div className={"bar3 " + (this.props.deployed ? 'change' : '')}></div>
			</div>
		)
			
	}
}

class Nav extends React.Component {

	render(){
		return (
				<nav className={"nav " + (this.props.deployed ? 'deployed' : '')}>
					
					<Link to="/"><h1>Michael Keating</h1></Link>

					<div className="nav-items">
						<ul className="nav-list">
							<ListLink to="/blog/" handler={this.props.handler}>Blog</ListLink>
							<ListLink to="/me/">Me</ListLink>
							<ListLink to="/projects/">Work</ListLink>
						</ul>
					</div>

					<div className="social">
						<ul>
							<li>
								<a href="">
									<FontAwesomeIcon icon={faGithub} size="xs"/>
								</a>
							</li>
							<li>
								<a href="">
									<FontAwesomeIcon icon={faLinkedin} size="xs"/>
								</a>
							</li>
						</ul>
					</div>
				
				</nav>
		)
	}
}

class Main extends React.Component {

	constructor(props){
		super(props)
		this.handler = this.handler.bind(this)
		this.state = {
			navDeployed: false,
		}
	}

	handler(){
		console.log('handler clicked')
		this.setState({navDeployed: !this.state.navDeployed})
	}

	render(){
		return(
			<div className="main">
				
				<Nav deployed={this.state.navDeployed} handler={this.handler}/>

				<div className="mobile-header"><Link to="/">MK</Link></div>
				
				<div className ="content">
					{this.props.children}
				</div>

				<MobileNavButton handler={this.handler} deployed={this.state.navDeployed}/>

			</div>
		)
	}

}

export default({ children }) => (
		<Main children = {children()} />
	)
	