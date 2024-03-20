import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/products";
import moment from "moment";
import Divider from "../../../components/Divider";
import { useSearchParams } from "react-router-dom";

function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setLoader(true));
        const response = await GetAllBids({
          product: selectedProduct._id,
        });
        dispatch(setLoader(false));
        if (response.success) {
          setBidsData(response.data);
        }
      } catch (error) {
        dispatch(setLoader(false));
        message.error(error.message);
      }
    };
    // Check if selectedProduct and showBidsModal are truthy before fetching data
    if (selectedProduct && showBidsModal) {
      getData();
    }
  }, [selectedProduct, showBidsModal, dispatch]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("MMM Do YYYY,h:mm:ss a");
      },
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone:{record.mobile}</p>
            <p>Email:{record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  return (
    <Modal
      title=""
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      width={1500}
      footer={null}
    >
      <div className="flex gap-3 flex-col">
        <h1 className="text-primary">Bids</h1>
        <Divider />
        <h1 className="text-xl text-gray-500">
          Product Name: {selectedProduct.name}
        </h1>
        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  );
}

export default Bids;
