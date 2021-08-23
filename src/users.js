import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect( () => {
    let fetchdata= async ()=>{
    try {
      let Users = await axios.get(
        "https://60efffc8f587af00179d3c3b.mockapi.io/user"
      );
      setUserList([...Users.data]);
      setLoading(false);
    } catch (err) {
      window.alert("CHECK YOUR NETWORK");
    }
  }
  fetchdata();
    // eslint-disable-next-line
  }, []);

  let handleDelete = async (id) => {
    try {
      let confirm = window.confirm("Are you want to delete?");
      if (confirm) {
        await axios.delete(
          `https://60efffc8f587af00179d3c3b.mockapi.io/user/${id}`
        );
        let rowIndex = userList.findIndex((obj) => obj.id === id);
        userList.splice(rowIndex, 1);
        setUserList([...userList]);
      }
    } catch (err) {
      console.log("product error");
    }
  };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Users</h1>
      <Link
        to="/creat-user"
        className="btn btn-sm btn-primary shadow-sm margin"
      >
        <i className="fas fa-download fa-sm text-white-50"></i> Creat users
      </Link>
      <div className="card shadow mb-4">
        <div className="card-header py-3"></div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>E-mail</th>
                  <th>Salary</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                { 
                isLoading ? <h3>Lodaing....</h3>: userList.map((obj, index) => {
                    return (
                      <tr>
                        <td>{obj.id}</td>
                        <td>{obj.name}</td>
                        <td>{obj.position}</td>
                        <td>{obj.email}</td>
                        <td>Rs : {obj.salary}</td>
                        <td>
                          <Link
                            to={`/edit/user/${obj.id}`}
                            className="btn btn-sm btn-primary small margin"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              handleDelete(obj.id);
                            }}
                            className="btn btn-sm btn-danger small-margin"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
