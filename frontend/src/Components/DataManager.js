import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateData from "./UpdateData";

const DataManager = () => {
  const [userArray, setUserArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);


  const getDataFromBackend = async () => {
    
    setLoading(true);

    const response = await fetch("http://localhost:5000/data/getall");
    const data = await response.json();

    console.log(data);
    setUserArray(data);
    setLoading(false);
  };

  const updateData = (user) => {
    console.log(user);
    setUpdateFormData(user);
    setShowUpdateForm(true);
  };

  const deleteData = async (id) => {
    console.log(id);
    const response = await fetch("http://localhost:5000/data/delete/" + id, {
      method: "DELETE",
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User deleted successfully",
      });

      // to get data from backend again
      getDataFromBackend();
    }
  };

  useEffect(() => {
    getDataFromBackend();
  }, []);

  const displayData = () => {
    if (loading) {
      return (
        <tr>
        <td className="text-center">
          <span className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </span>
        </td>
        </tr>
      );
    } else {
      return userArray.map(({ _id, title, description, stock, price, review, ratings }) => (
        <tr key={_id}>
          <td>{title}</td>
          <td>{description}</td>
          <td>{stock}</td>
          <td>{price}</td>
          <td>{review}</td>
          <td>{ratings}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={(e) => updateData({ _id, title, description, stock, price, review ,ratings})}
            >
              {" "}
              <i className="fas fa-pencil"></i>{" "}
            </button>
          </td>
          <td>
            <button className="btn btn-danger" onClick={(e) => deleteData(_id)}>
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <h1>Data Manager</h1>

      <div className="row">
        <div className="col-md">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{displayData()}</tbody>
          </table>
        </div>
        {showUpdateForm ? (
          <div className="col-md">
            <UpdateData updateFormData = {updateFormData} setShowUpdateForm={setShowUpdateForm} getDataFromBackend={getDataFromBackend} />
          </div>
        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export default DataManager;
