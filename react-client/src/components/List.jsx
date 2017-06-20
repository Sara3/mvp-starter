import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <ul>
    There are { props.items.length } items.
    { props.items.map(item => <ListItem item={item}/>)}
  </ul>
)

export default List;