import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundry from "../components/errorBoundry";

class App extends Component {
	constructor() {
		super()
		this.state = {
			Robots : [],  
			searchField: '' 
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users => this.setState({ Robots: users }));
	}

	onSearchChange = (event) => {
		this.setState({ searchField: event.target.value })	
	}
	
	render () {
		const { Robots, searchField } = this.state;
		const filteredRobots = Robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		if(Robots.length === 0) {
			return <h1>Loading</h1>
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<ErrorBoundry>	
							<CardList Robots={filteredRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>	
			)
		}
	}
}

export default App