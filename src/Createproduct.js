import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Createproduct() {
  const history = useHistory();
  const [productName, setUserName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setLoading] = useState(false);
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("https://60efffc8f587af00179d3c3b.mockapi.io/product", {
        productName,
        price,
      });
      history.push("/product");
      setLoading(true);
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Creat product</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>product name</label>
            <input
              value={productName}
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-6">
            <label>Price</label>
            <input
              value={price}
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="form-control"
              required
            />
          </div>
          <div className="col-lg-12">
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary mt-3"
              disabled={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Createproduct;
