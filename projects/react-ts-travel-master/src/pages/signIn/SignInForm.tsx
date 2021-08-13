import styles from "./SignInForm.module.css";
import { Form, Input, Button, Checkbox } from "antd";
import { signIn } from '../../redux/user/slice'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../redux/hooks'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {
    const loading = useSelector(s => s.user.loading)
    const jwt = useSelector(s => s.user.token)
    const error = useSelector(s => s.user.error)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        if(jwt !== null) {
            history.push("/")
        }
    },[jwt])

    const onFinish = (values: any) => {
        console.log("Success:", values);
        dispatch(signIn({
            email: values.username,
            password: values.password
        }))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles["register-form"]}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "请输入用户名" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "请输入密码" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    登录
                </Button>
            </Form.Item>
        </Form>
    );
};
