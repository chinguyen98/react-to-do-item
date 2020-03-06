import React, { Component } from 'react';
import './App.css';
import './components/todoItem.css'
import checkAllIcon from './images/checkAll.svg';

import ToDoItem from './components/todoItem';

class App extends Component {

	constructor() {
		super();
		this.state = {
			inputItem: '',
			todoItems: []
		};
		this.checkAllStatus = true;

		/* Binding */
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onChange = this.onChange.bind(this);
		this.checkAll = this.checkAll.bind(this);
		this.showDoneItem = this.showDoneItem.bind(this);
		this.showUnDoneItem = this.showUnDoneItem.bind(this);
		this.showAll = this.showAll.bind(this);
		this.removeDoneItem = this.removeDoneItem.bind(this);
		this.removeAllItem = this.removeAllItem.bind(this);
	}

	onItemClicked(item) {
		const { todoItems } = this.state;
		if (todoItems.length === 0) {
			return;
		}
		return (e) => {
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
		let text = e.target.value;
		let todoItems = this.state.todoItems.map(item => { return { ...item, isDisplay: true } });
		if (e.keyCode === 13) {
			if (!text) {
				return;
			}

			text = text.trim();
			if (!text) {
				return;
			}

			this.setState({
				inputItem: '',
				todoItems: [
					{ title: text, isDone: false, isDisplay: true },
					...todoItems
				]
			})
		}
	}

	onChange(e) {
		this.setState({
			inputItem: e.target.value
		})
	}

	checkAll(e) {
		let arr;
		if (this.state.todoItems.length === 0) return;
		if (this.checkAllStatus) {
			arr = this.state.todoItems.map((item) => {
				return { ...item, isDone: true }
			})

		} else {
			arr = this.state.todoItems.map((item) => {
				return { ...item, isDone: false }
			})
		}
		this.checkAllStatus = !this.checkAllStatus;
		this.setState({
			todoItems: [
				...arr
			]
		})
	}

	showAll(e) {
		let todoItems = this.state.todoItems.map(item => { return { ...item, isDisplay: true } });
		this.setState({
			todoItems: [...todoItems]
		})
	}

	showDoneItem(e) {
		let { todoItems } = this.state;
		this.setState({
			todoItems: todoItems.map(item => item.isDone ? { ...item, isDisplay: true } : { ...item, isDisplay: false })
		})
	}

	showUnDoneItem(e) {
		let { todoItems } = this.state;
		this.setState({
			todoItems: todoItems.map(item => !item.isDone ? { ...item, isDisplay: true } : { ...item, isDisplay: false })
		})
	}

	removeDoneItem(e) {
		this.setState({
			todoItems: [...this.state.todoItems].filter(item => !item.isDone)
		})
	}

	removeAllItem(e) {
		this.setState({
			todoItems: []
		})
	}

	renderToDoItemArea() {
		let { todoItems } = this.state;
		let itemsLefts = todoItems.filter(item => !item.isDone).length;
		return (
			<div>
				{
					todoItems.filter(item => item.isDisplay).map((item, index) => (
						<ToDoItem key={index} item={item} onClick={this.onItemClicked(item)} />
					))
				}
				<div className="detail">
					<span><strong><h4>{itemsLefts} item(s) left</h4></strong></span>
					<button onClick={this.showAll} className="btnShowAll">Show All</button>
					<button onClick={this.showDoneItem} className="btnDone">Done</button>
					<button onClick={this.showUnDoneItem} className="btnUnDone">not Done</button>
					<button onClick={this.removeDoneItem} className="btnRemoveDone">Remove Done</button>
					<button onClick={this.removeAllItem} className="btnRemoveAll">Remove All</button>
				</div>
			</div>
		)
	}

	render() {
		const { todoItems, inputItem } = this.state;
		return (
			<div className="App">
				<h1>Simple To Do Item App</h1>
				<div className='Header'>
					<img onClick={this.checkAll} className='checkAllIcon' src={checkAllIcon} alt="checkAll"></img>
					<input value={inputItem} placeholder='Add new something here!' onKeyUp={this.onKeyUp} onChange={this.onChange} type='text'></input>
				</div>
				<hr></hr>
				<div style={{ marginTop: 20 }}>
					{
						todoItems.length !== 0 && this.renderToDoItemArea()
					}
					{
						todoItems.length === 0 && <strong><h1>Empty!</h1></strong>
					}
				</div>
			</div>
		);

	};

}

export default App;
