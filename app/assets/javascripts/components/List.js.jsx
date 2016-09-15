class List extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editList = this.editList.bind(this);
    this.state = { edit: false, list: this.props.list, board: this.props.board }
  }

  displayView() {
    let list = this.state.list;
    return(
      <div>
				<div className='jumbotron col-xs-12 col-sm-3 board-list '>
				  { list.name }
				  <br />
				  <br />
				  <button onClick={this.toggleEdit}
				          className='btn btn-sm btn-warning'>Edit
				  </button>
				  <button onClick={() => this.props.deleteList(list.id)}
				          className='btn btn-sm btn-danger'>Delete
          </button>
				</div>
		 </div>
    );
  }

  editList(e, id) {
    e.preventDefault();
    let name = this.refs.editListName.value;
    $.ajax({
      url: `/boards/${this.props.board.id}/lists/${id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { list: { name } }
    }).done( data => {
      this.toggleEdit();
      this.setState({ list: data });
    }).fail( data => {
      console.log(data);
    });
  }

  editView() {
    return(
      <div className='jumbotron col-xs-12 col-sm-3 board-list '>
        <form onSubmit={this.editList}>
				  <input type='text' defaultValue={this.state.list.name}
				                     required
				                     ref="editListName"
				                     placeholder='List Name' />
				  <br />
				  <button onClick={this.toggleEdit} type='button' className='btn btn-sm btn-default'>Cancel</button>
          <br />
				  <button type='submit' className='btn btn-sm btn-success'>Save</button>
				</form>
      </div>
    )
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    if(this.state.edit)
      return(this.editView());
    else
      return(this.displayView());
  }
}
