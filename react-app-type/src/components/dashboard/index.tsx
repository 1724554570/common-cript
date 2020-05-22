import React, { useState } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";

import AboutViews from '../../containers/about/about';
import HelloViews from '../../containers/hello';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 5, span: 16 },
};

const Dashboard: React.FC<{}> = () => {


    const [total, setTotal] = useState(0);

    // 输入格式校验成功
    const onFinish = (values: Object) => {
        console.log(total);
        console.log(values);
        axios.post("//127.0.0.1:3001/tax/create", values).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
    }

    // 输入格式校验失败
    const onFinishFailed = (errorInfo: Object) => { }


    return (
        <>
            <div className="nav-container">
                <NavLink to="/dashboard" >Home Page</NavLink>
                <NavLink to="/dashboard/hello">HelloViews Page</NavLink>
                <NavLink to="/dashboard/about">About Page</NavLink>
            </div>
            <Route exact path="/dashboard/hello" component={HelloViews} />
            <Route exact path="/dashboard/about" component={AboutViews} />


            <Form
                {...layout}
                name="basic"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="totalPrice"
                    name="totalPrice"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="updatePrice"
                    name="updatePrice"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="discount"
                    name="discount"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                </Button>
                </Form.Item>
            </Form>
        </>
    );
}


export default Dashboard;