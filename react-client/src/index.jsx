import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });



  }

  search (input) {
    $.ajax({
      method: 'POST',
      url: '/items',
      data: {Body: input},
      success: (data) => {
        this.setState ({
          items: data
        });
        console.log('posted the term', data);
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  render () {
    return (<div>
      <h1> Trump Talk </h1>
      <Search onSearch ={this.search.bind(this)}/>
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));