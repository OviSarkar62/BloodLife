import { Modal, Table, message } from "antd";
import React from "react";

import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GetAllOrganizationsOfADonor, GetAllOrganizationsOfAHospital } from "../../../apicalls/users";
import InventoryTable from "../../../components/InventoryTable";
import { SetLoading } from "../../../redux/loadersSlice";

function Organizations({ userType }) {
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [selectedOrganization, setSelectedOrganization] = React.useState(null);
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      let response = null;
      if (userType === "hospital") {
        response = await GetAllOrganizationsOfAHospital();
      } else {
        response = await GetAllOrganizationsOfADonor();
      }
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
      dataIndex: "organizationName",
    },
    {
      title: "Email",
      dataIndex: "email",
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
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex items-center">
          <span className="mr-2">Check</span>
          <span
            className="cursor-pointer"
            onClick={() => {
              setSelectedOrganization(record);
              setShowHistoryModal(true);
            }}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} />
          </span>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />

      {showHistoryModal && (
        <Modal
          title={`${
            userType === "donor" ? "Donations History" : "Cunsumptions History"
          } In ${selectedOrganization.organizationName}`}
          centered
          open={showHistoryModal}
          onOk={() => setShowHistoryModal(false)}
          width={1000}
          onCancel={() => setShowHistoryModal(false)}
        >
          <InventoryTable
            filters={{
              organization: selectedOrganization._id,
              [userType]: currentUser._id,
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Organizations;
