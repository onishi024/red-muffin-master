import React from 'react'
import {AppBar, Menu, MenuItem, Drawer, Divider, Avatar, Subheader,
List, ListItem} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'

const Header = ({app_bar_open, onClickAppBar,
                 group_select_open, onClickGroup}) => {
  //AppBarのスタイル
  const style = {
    // position: 'fixed', top: 100,
  }

  return (
    <div>
      <MuiThemeProvider>
        <Drawer
          docked={false}
          width={200}
          open={app_bar_open}
          onRequestChange={() => onClickAppBar()}
        >
          <Subheader>Group</Subheader>
          <List>
            <ListItem
              disabled={false}
              leftAvatar={
                <Avatar src="GP_ankou.png" />
              }
              onClick={console.log("onClickGroup")}
            >
              あんこうチーム
            </ListItem>
          </List>
          <Divider />
          <Menu>
              <Link to='/issue'><MenuItem key="1" value="1">案件一覧</MenuItem></Link>
              <Link to='/member'><MenuItem key="2" value="2">要員別山積表</MenuItem></Link>
          </Menu>
        </Drawer>
        <AppBar
          title="Red Muffin"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={<Avatar src="food.svg" />}
          onLeftIconButtonClick={() => onClickAppBar()}
          style={style}
        />
      </MuiThemeProvider>
    </div>
  )

}

export default Header

// onLeftIconButtonTouchTap={() => onClickAppBar()}
// <Link to='/member'><MenuItem key="3" value="3">要員別集計情報</MenuItem></Link>
