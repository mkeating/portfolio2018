import React from "react";
import Link from "gatsby-link";

import './index.scss';

require("prismjs/themes/prism-solarizedlight.css");

const ListLink = props => (
		<li>
			<Link to={props.to}>
				{props.children}
			</Link>
		</li>
	);

class MobileNavButton extends React.Component {

	click = () => {
		console.log('clicked');
	}

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
//<div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}>

	render(){
		return (
				<nav className={"nav " + (this.props.deployed ? 'deployed' : '')}>
					
					<Link to="/"><h1>Home</h1></Link>

					<div className="nav-items">
						<ul className="nav-list">
							<ListLink to="/blog/">Blog</ListLink>
							<ListLink to="/me/">Me</ListLink>
							<ListLink to="/work/">Work</ListLink>
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
		this.setState({navDeployed: !this.state.navDeployed})
		console.log('clicked')
	}

	componentDidUpdate(){
		console.log(this.state)
	}

	render(){
		return(
			<div className="main">
				
				<Nav deployed={this.state.navDeployed}/>
				
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
	);
	