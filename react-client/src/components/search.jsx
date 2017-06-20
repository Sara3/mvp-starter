import React from 'react';

import $ from 'jquery';
class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			term: ''
		}
		this.onClick = this.onClick.bind(this);
		this.search = this.search.bind(this);
	}

	onClick (e) {
		this.setState({
			term: e.target.value
		});
		this.search();
	}

	search () {
		this.props.onSearch(this.state.term);
	}

	render() {
		return (
			<div>
				<h4> Search here! </h4>
				<input type='text' placeholder='Search Trumps tweets' onClick={this.onClick}/>
			</div>
			);
	}
}

module.exports = Search;