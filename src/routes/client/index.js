import React from 'react'
import PropTypes from 'prop-types'
import { Link,routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Table, message, Button } from 'antd'
import { config } from '../../utils'
import styles from './index.less'
import List from './List'
import Modal from './Modal'

const Client = ({ location, dispatch, client, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType } = client
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['client/update'],
    title: `${modalType === 'create' ? 'Create Client' : 'Update Client'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data){
      dispatch({
        type: `client/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'client/hideModal',
      })
    }
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['client/query'],
    pagination,
    location,
    onChange (page){
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize
        },
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'client/delete',
        payload: id,
      })
    },
    onEditItem(item){
      dispatch({
        type: 'client/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }
  
  return (
    <div className="content-inner">
      {/* <Button type="primary">
        <a href="/client/create">新建</a>    
      </Button> */}
      <div style={{border:'1px solid #eb4545',width:60,padding:'6px 10px 6px 15px',background:'#eb4545',borderRadius:4}}>
        <Link to={`client/create`} style={{color:'#fff'}}>新建</Link>
      </div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Client.propTypes = {
  client: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
}

export default connect(({client, loading }) => ({ client, loading }))(Client)
