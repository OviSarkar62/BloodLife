import { Button, Form, Input, Radio, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { SetLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helpers";
import OrgHospitalForm from "./OrgHospitalForm";

function Register() {
  const [type, setType] = React.useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true))
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      dispatch(SetLoading(false))
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        dispatch(SetLoading(true))
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false))
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/3"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase text-2xl">
          <span className="text-primary">
            {type.toUpperCase()} - Registration
          </span>
          <hr />
        </h1>
        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donor">Donor</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>
        {type === "donor" && (
          <>
            {" "}
            <Form.Item name="name" label="Name" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address" className="col-span-2" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={getAntdInputValidation()}>
              <Input type="password" />
            </Form.Item>
          </>
        )}

        {type !== "donor" && <OrgHospitalForm type={type} />}

        <Button type="primary" block className="col-span-2" htmlType="submit">
          Register
        </Button>
        <Link
          to="/login"
          className="col-span-2 text-center underline text-gray-700"
        >
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
}

export default Register;
