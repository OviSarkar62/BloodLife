import { Button, Form, Input, Radio, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { SetLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helpers";


function Login() {
  const [type, setType] = React.useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true))
      const response = await LoginUser(values);
      dispatch(SetLoading(false))
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
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
        className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/4"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase text-2xl">
          <span className="text-primary">{type.toUpperCase()} - Login</span>
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

        <div className="col-span-2" >
          <Form.Item name="email" label="Email" style={{flex: 1}} rules={getAntdInputValidation()}>
            <Input />
          </Form.Item>
          <br/>
          <Form.Item name="password" label="Password" style={{flex: 1}} rules={getAntdInputValidation()}>
            <Input type="password" />
          </Form.Item>
        </div>

        <Button type="primary" block className="col-span-2" htmlType="submit">
          Login
        </Button>
        <Link
          to="/register"
          className="col-span-2 text-center underline text-gray-700"
        >
          Don't have an account? Register
        </Link>
      </Form>
    </div>
  );
}

export default Login;
