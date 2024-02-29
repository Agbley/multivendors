import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { setLoader } from "../../redux/loadersSlice";
import { message } from "antd";

function Home() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ status: "approved" });
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(filters);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      {products?.map((product) => {
        return (
          <div>
            <h1>{product.name}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
