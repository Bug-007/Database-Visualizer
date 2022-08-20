import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateUser from "./UpdateUser";

const UserManager = () => {
  const [userArray, setUserArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);

  const getDataFromBackend = async () => {
    
    setLoading(true);

    const response = await fetch("http://localhost:5000/user/getall");
    const data = await response.json();

    console.log(data);
    setUserArray(data);
    setLoading(false);
  };

  const updateUser = (user) => {
    console.log(user);
    setUpdateFormData(user);
    setShowUpdateForm(true);
  };

  const deleteUser = async (id) => {
    console.log(id);
    const response = await fetch("http://localhost:5000/user/delete/" + id, {
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

  const displayUsers = () => {
    if (loading) {
      return (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else {
      return userArray.map(({ _id, email, password, username }) => (
        <tr key={_id}>
          <td>{username}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={(e) => updateUser({ _id, email, password, username })}
            >
              {" "}
              <i className="fas fa-pencil"></i>{" "}
            </button>
          </td>
          <td>
            <button className="btn btn-danger" onClick={(e) => deleteUser(_id)}>
              <i className="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      ));
    }
  };

  return (
    <div>
      <h1>User Manager</h1>

      <div className="row">
        <div className="col-md">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{displayUsers()}</tbody>
          </table>
        </div>
        {showUpdateForm ? (
          <div className="col-md">
            <UpdateUser updateFormData = {updateFormData} setShowUpdateForm={setShowUpdateForm} getDataFromBackend={getDataFromBackend} />
          </div>
        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export default UserManager;
