import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Edituser(props) {
  const history = useHistory();
  const [name, setUserName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      let user = await axios.get(
        `https://60efffc8f587af00179d3c3b.mockapi.io/user/${props.match.params.id}`
      );
      console.log(user);
      setUserName(user.data.name);
      setPosition(user.data.position);
      setEmail(user.data.email);
      setSalary(user.data.salary);
    } catch (err) {
      window.alert("check your network");
    }
    // eslint-disable-next-line
  }, []);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `https://60efffc8f587af00179d3c3b.mockapi.io/user/${props.match.params.id}`,
        { name, position, email, salary }
      );
      history.push("/user");
      setLoading(true);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Edit user</h1>
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
              value="Update"
              className="btn btn-primary mt-3"
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edituser;
