import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Form, Row, Col, Input, Select, InputNumber, Radio, Modal, Cascader, Checkbox, Tag, Button, Tooltip } from 'antd'
import city from '../../../utils/city'

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

const Create = ({
  tags = ['上海浦东新区郭守敬路498号19号楼405B室','上海浦东新区郭守敬路498号19号楼405B室'],
  inputVisible = false,
  inputValue = '',
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue
  }
  }) => {
  
  const handleClose = (removeTag) => {
    const filterTag = tags.filter(tag => tag !== removeTag);
    tags = filterTag;
  }

  const showInput = (e) => {
    console.log("GGGGGGG" + inputVisible);
    inputVisible = true;
    // () => this.input.focus()

    console.log(e);
  }

  const handleInputChange = (e) => {
    inputValue = e.target.value
  }

  const handleInputConfirm = () => {
    if(inputValue && tags.indexOf(inputValue) === -1){
      tags = [...tags, inputValue];
    }

    console.log(tags);
  }

  return (
    <div className="content-inner">
      <Form>
        <label className={styles.labelShow}>基础信息</label>
        <Row gutter={8} className={styles.borderShow}>
          <Col span={7}>
            <FormItem
              {...formItemLayout}
              label="*客户编号"
            >
              <Input placeholder="客户编号" />
            </FormItem>
          </Col>

          <Col span={7}>
            <FormItem
              {...formItemLayout}
              label="* 类型"
            >
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="选择类型"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="1">供应商</Option>
              <Option value="2">客户</Option>
              <Option value="3">其他</Option>
            </Select>
          </FormItem>
          </Col>

          <Col span={7}>
            <FormItem
              {...formItemLayout}
              label="*隶属单位"
              >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择隶属单位"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">BBAC</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span={3}>
            <FormItem
              {...formItemLayout}
              >
              <Checkbox defaultChecked> 激活</Checkbox>
            </FormItem>
          </Col>
        </Row>

        <div style={{marginTop: "20px"}}>
          <label className={styles.labelShow}>主信息</label>
          <Row gutter={8} className={styles.borderShow}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="*中文名称"
                hasFeedback 
              >
              {
                getFieldDecorator('name',{
                  rules: [{
                    required: true,
                    }
                  ]
                })(<Input placeholder="中文名称" />)
              }
                
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="中文简称"
              >
              <Input placeholder="中文简称" />
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="英文名称"
              >
              <Input placeholder="英文名称" />
            </FormItem>
            </Col>

            <Col span={24}>
              <FormItem
                labelCol={{span: 6}}
                label="详细地址"
              >
              {
                /*
                <Cascader
                size="large"
                style={{ width: '100%' }}
                options={city}
                placeholder="选择地址"
              />
                */
              }
              
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
              })}

              {inputVisible && (
                <Input
                  type="text"
                  size="small"
                  style={{ width: 78 }}
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && <Button size="small" type="dashed" onClick={showInput} >+ 添加地址</Button>}
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="联系人"
              >
              <Input placeholder="联系人" />
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="邮箱"
              >
              <Input placeholder="邮箱" />
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="电话1"
              >
              <Input placeholder="电话1" />
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="电话2"
              >
              <Input placeholder="电话2" />
            </FormItem>
            </Col>
          </Row>
        </div>

        <div style={{marginTop: "20px"}}>
          <label className ={styles.labelShow}>控制信息</label>
          <Row gutter={8} className={styles.borderShow}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="* 缺省包装代码"
              >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择缺省包装代码"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">包装代码1</Option>
                <Option value="2">包装代码2</Option>
                <Option value="3">包装代码3</Option>
              </Select>
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="* 缺省收货规则"
              >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择缺省收货规则"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">收货规则1</Option>
                <Option value="2">收货规则2</Option>
                <Option value="3">收货规则3</Option>
              </Select>
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="* 缺省上架规则"
              >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择缺省上架规则"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">上架规则1</Option>
                <Option value="2">上架规则2</Option>
                <Option value="3">上架规则3</Option>
              </Select>
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="* 拣货规则"
              >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择拣货规则"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">拣货规则1</Option>
                <Option value="2">拣货规则2</Option>
                <Option value="3">拣货规则3</Option>
              </Select>
            </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="* 库位指定规则"
              >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择库位指定规则"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">人工指定库位</Option>
                <Option value="2">收货时指定库位</Option>
                <Option value="3">上架时指定库位</Option>
              </Select>
            </FormItem>
            </Col>

            <Col span={24}>
              <FormItem
                { ...formItemLayout}
                label="* 收货标签码解析规则"
              >
              <Select
                mode="multiple"
                showSearch
                placeholder="选择收货标签码解析规则"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">收货标签码解析规则1</Option>
                <Option value="2">收货标签码解析规则2</Option>
                <Option value="3">收货标签码解析规则3</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span={24}>
              <FormItem
                { ...formItemLayout}
                label="* 收货模式"
              >
              <Select
                showSearch
                placeholder="选择收货模式"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                onChange={e=>handleReceiveChange(e)}
              >
                <Option value="1">托接收模式</Option>
                <Option value="2">模式2</Option>
                <Option value="3">模式3</Option>
                <Option value="4">模式4</Option>
                <Option value="5">模式5</Option>
                <Option value="6">模式6</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span={24}>
            <FormItem
                  { ...formItemLayout}
                  label="* 可选校验项"
                >
              <Checkbox.Group>
                <Row>
                 <Col span={6} style={{textAlign: "center"}}>
                    托盘:
                  </Col>
                  <Col span={6}>
                    <Checkbox value="1">零件号</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="2">生产日期</Checkbox>
                  </Col>
                  <Col span={6}>
                    <Checkbox value="3">数量</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>

              <div className="second_select" style={{ display:"none"}}>
                <Checkbox.Group>
                  <Row>
                  <Col span={6} style={{textAlign: "center"}}>
                      箱/托:
                    </Col>
                    <Col span={6}>
                      <Checkbox value="1">零件号</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="2">生产日期</Checkbox>
                    </Col>
                    <Col span={6}>
                      <Checkbox value="3">数量</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </FormItem> 
          </Col>
        </Row>
        </div>

        <div style={{marginTop: "20px"}}>
          <Button type="primary">取消</Button>
          <Button type="primary">确认</Button>
        </div>
      </Form>
  </div>)
}

function handleReceiveChange(value){
  if(value!=1){
    //显示
    document.getElementsByClassName('second_select')[0].style.display = "block";
  }else{
    //隐藏
    document.getElementsByClassName('second_select')[0].style.display = "none";
  }
}

Create.propTypes = {
  userCreate: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ userCreate, loading }) => ({ userCreate, loading: loading.models.userDetail }))(Form.create()(Create)) 