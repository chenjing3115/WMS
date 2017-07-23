import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import { config } from 'utils'
import styles from './index.less'

const FormItem = Form.Item

const Login = ({
  login,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  const { loginLoading } = login

{/*消息发送的部分，表单登录界面，在登录时需要发送一条dispatch给model，然后通过它来实现页面的跳转*/}
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return 
      }
    {/*dispatch 根据type内容转发到指定的model，只有这边设置正确后在model那边才能接收到发送的action*/}
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className={styles.body}>
      <img alt={'loginBackground'} src={config.loginImg} />
      <div className={styles.form}>
        <img className={styles.formBox} alt={'form'} src={config.formImg} />
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input prefix={<img src={config.loginUser} style={{width:20,height:20}}/>} size="large" onPressEnter={handleOk} placeholder="请输入用户名" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input  prefix={<img src={config.loginBoxpassword} style={{width:20,height:20}} />} size="large" type="password" onPressEnter={handleOk} placeholder="请输入密码" />)}
          </FormItem>
          <Row>
            <Button size="large" onClick={handleOk} loading={loginLoading} className={styles.loginBtn} style={{padding:'10px 0px',width: 246,borderRadius: 0,height: 40,fontSize: 18,background: '#ff3737',fontSize:18}}>
              登录
            </Button>
          </Row>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  login: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
