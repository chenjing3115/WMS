import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Cascader, col, Modal, message } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
       span: 14,
    }
}

const modal = ({ 
        item ={}, 
        onOk, 
        form:{
            getFieldDecorator,
            validateFields,
            getFieldsValue,
    }, ...modalProps }) => {
   
    const handleOk = () =>{
        validateFields((errors) => {
            message.info(errors)
            if(errors){
                return
            }
            const data = {
                ...getFieldsValue(),
                key: item.key,
            }
            data.address = data.address.join(' ')
            onOk(data)
        })
    }

    const modalOpts = {
        ...modalProps,
        onOk: handleOk
    }

    return (
        <Modal {...modalOpts} >
            <Form layout="horizontal">
                <FormItem label="姓名" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [
                            {
                                required: true,
                                message: '姓名不能为空'
                            }
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="昵称" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('nickName', {
                        initialValue: item.nickName,
                    })(<Input />)}
                </FormItem>
                <FormItem label="年龄" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('age', {
                        initialValue: item.age,
                        rules: [
                            {
                                required: true,
                                type: 'number',
                                message: '年龄不能为空'
                            }
                        ],
                    })(<InputNumber min={18} max={100}  />)}
                </FormItem>
                <FormItem label="性别" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('gender', {
                        initialValue: item.gender,
                        rules: [
                            {
                                required: true,
                                message: '性别不能为空'
                            }
                        ],
                    })(
                        <Radio.Group>
                            <Radio value='0'>Male</Radio>
                            <Radio value='1'>Female</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem label="电话" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('phone', {
                            initialValue: item.phone,
                            rules:[
                                {
                                    required: true,
                                    pattern: /^1[34578]\d{9}$/,
                                    message: '电话号码错误'
                                }
                            ]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem label="电子邮箱" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('email', {
                            initialValue: item.email,
                            rules:[
                                {
                                    required: true,
                                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                                    message: '邮箱错误'
                                }
                            ]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem label="地址" hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('address', {
                            initialValue: item.address && item.address.split(' '),
                            rules: [
                                {
                                    required: true,
                                    message: '地址错误'
                                }
                            ]
                        })(<Cascader 
                        size="large" 
                        style={{ width: '100%' }} 
                        options={ city } 
                        placeholder="请输入地址" />)
                    }
                </FormItem>
            </Form>
        </Modal>
    )
}

modal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(modal)