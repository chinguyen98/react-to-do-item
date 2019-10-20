import React, { Component } from 'react';
import './App.css';
import './components/todoItem.css'
import checkAllIcon from './images/checkAll.svg';

import ToDoItem from './components/todoItem';

class App extends Component {

	constructor() {
		super();
		this.state = {
			todoItems: [
				{ title: 'Go fishing', isDone: true },
				{ title: 'Go camping', isDone: false },
				{ title: 'Go eating', isDone: false }
			]
		};
		this.onKeyUp = this.onKeyUp.bind(this);
	}

	onItemClicked(item) {
		return (e) => {
			const { todoItems } = this.state;
			const isComplete = item.isDone;
			const index = todoItems.indexOf(item);
			this.setState({
				todoItems: [
					...todoItems.slice(0, index),
					{
						...item,
						isDone: !isComplete
					},
					...todoItems.slice(index + 1)
				]
			})
		}
	}

	onKeyUp(e) {
		if (e.keyCode === 13) {
			let text = e.target.value;
			if (!text) {
				return;
			}

			text = text.trim();
			if (!text) {
				return;
			}

			console.log(text);

			this.setState({
				todoItems: [
					{ title: text, isDone: false },
					...this.state.todoItems
				]
			})
		}
	}

	render() {
		const { todoItems } = this.state;
		if (todoItems.length) {
			return (
				<div className="App">
					<h1>Simple To Do Item App</h1>
					<div className='Header'>
						<img className='checkAllIcon' src={checkAllIcon}></img>
						<input placeholder='Add new to do here!' onKeyUp={this.onKeyUp} type='text'></input>
					</div>
					{
						todoItems.length && todoItems.map((item, index) => (
							<ToDoItem key={index} item={item} onClick={this.onItemClicked(item)} />
						))
					}
					{
						todoItems.length === 0 && 'Nothing here'
					}
				</div>
			);
		}

	};

}

export default App;
