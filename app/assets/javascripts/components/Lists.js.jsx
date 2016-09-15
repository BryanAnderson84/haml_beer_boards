class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.displayLists = this.displayLists.bind(this);
		this.addList = this.addList.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.state = { lists: this.props.lists, board: this.props.board };
	}

	deleteList(id) {
		let boardId = this.state.board.id;
		$.ajax({
			url: `/boards/${boardId}/lists/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let lists = this.state.lists;
			let deleteIndex = lists.findIndex( l => l.id === id );
			this.setState({
				lists: [
								...lists.slice(0, deleteIndex),
								...lists.slice(deleteIndex + 1, lists.length)
							 ]
			});
		}).fail( data => {
			console.log(data);
		});
	}

	displayLists() {
		let lists = this.state.lists.map( list => {
			return(<List key={`list-${list.id}`} deleteList={this.deleteList} board={this.state.board}
				            list={list} />)
		});
		return lists;
	}

  addList(e) {
    e.preventDefault();
    let name = this.refs.listName.value;
		let boardId = this.state.board.id;
		$.ajax({
			url: `/boards/${boardId}/lists`,
			type: 'POST',
			dataType: 'JSON',
			data: { list: { name } }
		}).done( data => {
			this.setState({
				lists: [data, ...this.state.lists]
			});
			this.refs.addListForm.reset();
		}).fail( data => {
			console.log(data);
		});
  }

	render() {
		// display all the lists for the board - HINT: list.js.jsx
		// HINT: SEE boards.js.jsx
			// 1. ability to add list
			// 2. ability to delete a list
			// 3. ability to edit a list
			// put body into a container
			// sort lists by recently added, no hard refreshing
			// BONUS:
			  // 1. Within a list show all items
			  // 2. Be able to delete item out of a list
			  // 3. Be able edit item in a list
			  // 4. Be able add item to a list
		return(
			<div className='text-center container'>
				<form ref='addListForm' onSubmit={this.addList}>
				  <input ref='listName' type='text'
				         required
				         placeholder='List Name'
				         style={{color: 'black'}} />
							 <input type='submit' placeholder='Save' className='btn btn-success' />
				</form>

				<div className='row'>
				  { this.displayLists() }
				</div>
			</div>
		);
	}
}
