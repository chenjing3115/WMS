import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input,Icon, Cascader, Switch,Select } from 'antd'
import city from '../../utils/city'
import { Link } from 'dva/router'


const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(fields)
  }
  const { name, address } = filter

  return (
    <Row gutter={24}>
      <Col span={4}>
      <FilterItem
      {...formItemLayout}
       label="客户管理">
        {getFieldDecorator('name', { initialValue: name })(<Input />)}
      </FilterItem>
      </Col>

       <Col span={4}>
        <FilterItem
          {...formItemLayout}
          label="激活">
          <Select
            showSearch
            style={{ width: 100 }}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="1">是</Option>
            <Option value="2">否</Option>
          </Select>
          </FilterItem>
        </Col>
        <Col span={6}>
        <FilterItem
          {...formItemLayout}
          label="类型">
          <Select
            showSearch
            style={{ width: 200 }}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="1">货主</Option>
            <Option value="2">供应商</Option>
          </Select>
          </FilterItem>
        </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div >
            <Button icon="search" size="large" style={{background:'#eb4545',border:'none',color:'#fff',padding:'0 25px'}} className="margin-right" onClick={handleSubmit}>查询</Button>
          </div>
          <div>
            <Button icon='plus' size="large" style={{background:'#eb4545',border:'none',color:'#fff',padding:'0 25px'}}>
              <Link to={`client/create`} style={{color:'#fff'}}>新建</Link>
            </Button>
            
             {/* <div style={{border:'1px solid #eb4545',width:100,padding:'4px 10px 4px 15px',background:'#eb4545',borderRadius:4}}>
              <Link icon='plus' to={`client/create`} style={{color:'#fff'}}>新建</Link>
            </div>  */}
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
