import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Editproduct(props) {
  //get the data from DB using Id
  //populate in form
  // update in db

  const history = useHistory();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
   let  fetchdata= async ()=>{
    try {
      let product = await axios.get(
        `https://60efffc8f587af00179d3c3b.mockapi.io/product/${props.match.params.id}`
      );
      setProductName(product.data.productName);
      setPrice(product.data.price);
    } catch (err) {
      console.log("Product edit errror" + err);
    }
  }
  fetchdata();
   // eslint-disable-next-line
  }, [props]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `https://60efffc8f587af00179d3c3b.mockapi.io/product/${props.match.params.id}`,
        { productName, price }
      );
      history.push("/product");
      setLoading(true);
    } catch (err) {
      console.log("product edit error" + err);
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
              value={productName}
              type="text"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              className="form-control"
            />
          </div>
          <div className="col-lg-6">
            <label>Position</label>
            <input
              value={price}
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
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

export default Editproduct;
