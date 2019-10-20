import React, { Component } from 'react';
import classnames from 'classnames';
import DoneIcon from '../images/Done.svg';
import unDoneIcon from '../images/unDone.svg';

class ToDoItem extends Component {
	render() {
		const { item } = this.props;
		const url = item.isDone ? DoneIcon : unDoneIcon;
		let className = classnames('todoItem', { 'todoItem--done': item.isDone });
		return (
			<div className={className}>
				<img onClick={this.props.onClick} className='isDoneIcon' src={url}></img>
				<p>{item.title}</p>
			</div>
		);
	}
};

export default ToDoItem;