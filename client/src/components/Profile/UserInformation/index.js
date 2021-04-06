import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Button, Col, Form, Input, message} from "antd";
import Ajax from "../../../services/Ajax";
import {changeFirstName} from "../../../store/user/userAction";
import {showPage} from "../../../store/breadcrumbs/crumbsAction";
import {collectionItemsForm, onlyLetters, onlyNumbers} from "../../Forms/RegistrationForm/collectionItems";
import './style.less'

const {get, put} = Ajax;


const UserInformation = () => {
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
  const [form] = Form.useForm();
  const success = () => {
    message.success('Your user data has been successfully updated');
  };
  const error = () => {
    message.error('Enter correct information');
  };
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      await put('/customers', '', values);
      dispatch(changeFirstName(values.firstName));
      success();

    } catch (errorInfo) {
      error();
    }
  }

  useEffect(() => {
    dispatch(showPage({pageName: 'Personal information', key: 'user_info'}));

    let cleanupFunction = false;
    get('/customers/customer')
      .then(customer => {
        if (!cleanupFunction)
          form.setFieldsValue({
              firstName: customer.firstName,
              lastName: customer.lastName,
              login: customer.login,
              email: customer.email,
              phone: customer.phone,
            }
          )

      })
    return () => cleanupFunction = true
  }, [form, dispatch])

  return (
    <Col xs={{span: 20, offset: 2}} sm={{span: 12, offset: 1}} md={{span: 12, offset: 2}}
         xl={{span: 10, offset: 2}}>
      <Form
        form={form}
        {...layout}
        name="userInfo"
        initialValues={{
          remember: true,
          phone: "+380"
        }}
        scrollToFirstError
      >
        {collectionItemsForm.map(formItem =>
          formItem.name !== "password"
            ? <Form.Item
              label={formItem.label}
              name={formItem.name}
              rules={formItem.rules}
              key={formItem.name}
            >
              {formItem.name === "phone"
                ? <Input maxLength={13} onKeyPress={onlyNumbers()}/>
                : formItem.name === "firstName" || formItem.name === "lastName"
                  ? <Input placeholder={formItem.label} onKeyPress={onlyLetters()} maxLength={25}/>
                  : <Input placeholder={formItem.label} maxLength={25}/>
              }
            </Form.Item>
            : ''
        )}
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={onFinish}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  )
}
export default UserInformation;