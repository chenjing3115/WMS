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
        // {
        //     title: 'Avatar',
        //     dataIndex: 'avatar',
        //     key: 'avatar',
        //     className: styles.avatar,
        //     render: (text) => <img alt={'avatar'} width={24} src={text} />,
        // },
        
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <Link to = {`client/${record.id}`}> {text} </Link>
        },
        {
            title: '别名',
            dataIndex: 'nickName',
            key: 'nickName',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 100
        },
        {
            title: '性别',
            dataIndex: 'isMale',
            key: 'isMale',
            width: 100,
            render: (text) => <span>
            {text ? 'Male' : 'Female'}
            </span>
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 200,
            render: (text, record) => {
                return (
                <div>
                        <span style={{border:'1px solid yellow',borderRadius:'15px',width:80,height:18,padding:'1px 14px',marginRight:'6px',color:'yellow',cursor:'pointer'}} onClick={e => handleUpdateClick(record, e)}>编辑</span>
                        {/* <Button type="primary" htmlType="button" size="small" onClick={e => handleUpdateClick(record, e)} shape="circle" icon="edit" /> */}
                        <span style={{border:'1px solid #eb4545',borderRadius:'15px',width:80,height:18,padding:'1px 14px',color:'#eb4545',cursor:'pointer'}} onClick={e => handleDeleteClick(record, e)}>删除</span>
                        {/* <Button type="primary" htmlType="button" size="small" onClick={e => handleDeleteClick(record, e)} shape="circle" icon="delete" style={{marginLeft: '8px'}} /> */}
                </div>
                )
            }
        }
    ]

    return (
        <div>
            <Table
                {...tableProps}
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