import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.less'
import { config } from '../../utils'
import Menus from './Menu'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const Header = ({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu }) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }

  return (
    <div className={styles.header}>
        <img src={config.logo} style={{width:116,height:41,marginLeft:26,marginTop:8}} />
      {/* <img src={config.logo} style={{maxWidth:'100%',maxHeight:'100%'}}/>   */}
      {/* <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '60px',background:'#293139',fontSize:16,color:'#fff' }}
      >
         <SubMenu key="1" title={<span>基础数据</span>} style={{zIndex:1000}}>
            <Menu.Item key="2">客户管理</Menu.Item>
            <Menu.Item key="3">零件管理</Menu.Item>
        </SubMenu>  
        
        <Menu.Item key="4">信息管理</Menu.Item>
        <Menu.Item key="5">资源管理</Menu.Item>
        <Menu.Item key="6">操作管理</Menu.Item>
        <Menu.Item key="7">规则管理</Menu.Item>
      </Menu> */}
      
      <div className={styles.rightWarpper}>
        {/* <div className={styles.button}>
          <Icon type="mail" />
        </div> */}
        <Menu mode="horizontal" onClick={handleClickMenu} style={{background:'#eb4545',color:'#fff',}}>
          <SubMenu style={{
            float: 'right',right:0,lineHeight:60
          }} title={< span > <Icon type="user" />
            {user.username} < /span>}
          >
            <Menu.Item key="logout">
              退出
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
