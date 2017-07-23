import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Menu, Dropdown, Button, Icon, message, Tooltip } from 'antd'
import styles from './List.less'
import classnames from 'classnames'
import { Link } from 'dva/router'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, location, ...tableProps}) => {
   function handleDeleteClick(record, e) {
        confirm({
            title: '确定要删除用户'+record.name+'吗？',
            onOk(){
                onDeleteItem(record.id)
            }
        })
    }

    function handleUpdateClick(record, e) {
        onEditItem(record)
    }

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            className: styles.avatar,
            render: (text) => <img alt={'avatar'} width={24} src={text} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to = {`client/${record.id}`}> {text} </Link>
        },
        {
            title: 'NickName',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 100
        },
        {
            title: 'Gender',
            dataIndex: 'isMale',
            key: 'isMale',
            width: 100,
            render: (text) => <span>
            {text ? 'Male' : 'Female'}
            </span>
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: (text, record) => {
                return <div><Tooltip title='编辑用户信息'><Button type="primary" htmlType="button" size="small" onClick={e => handleUpdateClick(record, e)} shape="circle" icon="edit" /></Tooltip>
                <Tooltip title='删除该条信息?'>
                    <Button type="primary" htmlType="button" size="small" onClick={e => handleDeleteClick(record, e)} shape="circle" icon="delete" style={{marginLeft: '8px'}} />
                </Tooltip></div>
            }
        }
    ]

    return (
        <div>
            <Table
                {...tableProps}
                bordered
                columns ={columns}
                size="middle"
                rowKey={record => record.id}
            />
        </div>
    )
}

List.propTypes = {
    onEditItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    location: PropTypes.object
}

export default List