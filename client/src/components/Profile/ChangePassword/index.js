import React, {useEffect} from "react";
import {Button, Col, Form, Input, message} from "antd";
import Ajax from "../../../services/Ajax";
import {collectionItemsProfileChangePassword} from "../../Forms/RegistrationForm/collectionItems";
import {showPage} from "../../../store/breadcrumbs/crumbsAction";
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import profileBreadcrumbs from "../../../functions/profileBreadcrumbs";
import './style.less'

const {put} = Ajax;


const ChangePassword = () => {
  const {pathname, key} = useLocation();
  const dispatch = useDispatch();

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24
    },
  };
  const formTailLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  useEffect(() => {
    const currentPage = profileBreadcrumbs(pathname, 'Personal information', key);
    dispatch(showPage(currentPage));
  }, [dispatch, key, pathname])

  const [form] = Form.useForm();
  const warning = () => {
    message.warning('The new password is the same as the old one.');
  };
  const warning2 = () => {
    message.warning('Enter correct password!');
  };
  const warning3 = () => {
    message.warning('You entered wrong old password!');
  };
  const success = () => {
    message.success('Your user data has been successfully updated');
  };
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      console.log('Values', values)
      if (values.oldPassword !== values.newPassword) {
        const updatedPassword = {
          password: values.oldPassword,
          newPassword: values.newPassword
        }
        const result = await put('/customers/password', '', updatedPassword);
        console.log(result)
        if (result.password === 'Password does not match') {
          warning3()
        } else {
          success()
        }
      } else {
        warning()
      }
    } catch (errorInfo) {
      warning2();
    }
  }

  return (
    <Col xs={{span: 20, offset: 2}} sm={{span: 8, offset: 2}} md={{span: 8, offset: 2}}
         xl={{span: 6, offset: 2}}>
      <Form
        {...layout}
        name="changePassword"
        form={form}
        initialValues={{
          remember: true,
        }}
      >
        {collectionItemsProfileChangePassword.map(formItem =>
          <Form.Item
            label={formItem.label}
            name={formItem.name}
            rules={formItem.rules}
            key={formItem.name}
            hasFeedback={formItem.feedback}
          >

            {formItem.name !== "confirmPassword"
              ? <Input.Password placeholder={formItem.label}/>
              : <Input.Password placeholder={formItem.label} id="success"/>}
          </Form.Item>
        )}

        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={onFinish}>
            Change password
          </Button>
        </Form.Item>
      </Form>
    </Col>
  )
}
export default ChangePassword;