import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Createuser() {
  const history = useHistory();
  const [name, setUserName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [isLoading, setLoading] = useState(true);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("https://60efffc8f587af00179d3c3b.mockapi.io/user", {
        name,
        position,
        email,
        salary,
      });
      history.push("/user");
      setLoading(true);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Creat user</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>User name</label>
            <input
              value={name}
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-6">
            <label>Position</label>
            <input
              value={position}
              type="text"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="col-lg-6">
            <label>E-mail</label>
            <input
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="col-lg-6">
            <label>Salary</label>
            <input
              value={salary}
              type="text"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="col-lg-12">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary mt-3"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Createuser;
