import { Table, message } from "antd";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { GetAllDonorsOfAnOrganization } from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";

function Donors() {
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllDonorsOfAnOrganization();
      dispatch(SetLoading(false));
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => text.toLowerCase(),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Registered Date",
      dataIndex: "createdAt",
      render: (text) => moment(text).format("DD MMM YYYY"),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Donors;
