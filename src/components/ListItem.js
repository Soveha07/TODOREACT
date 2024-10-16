const ListItem = ({ index, title, deleteItem }) => {
    return (
      <div className="row">
        <div className="col-6 d-flex justify-content-end">
        <p>{index}. {title}</p>
        </div>
        <div className="col-6 d-flex justify-content-start">
        <button onClick={deleteItem} className="btn btn-danger">Delete</button>
        <br/>
        </div>
      </div>
    );
  };

  export default ListItem;