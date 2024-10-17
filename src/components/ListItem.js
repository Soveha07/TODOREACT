const ListItem = (props) => {
  return (
    <div className="row">
      <div className="col-6 d-flex justify-content-end">
      <p>{props.title}</p>
      </div>
      <div className="col-6 d-flex justify-content-start">
      <button onClick={props.deleteItem} className="btn btn-danger">Delete</button>
      <br/>
      </div>
    </div>
  );
};

export default ListItem;