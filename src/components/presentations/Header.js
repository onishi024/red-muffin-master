import React from 'react'

import {AppBar, Menu, MenuItem, Drawer, Divider, Avatar, Subheader,DropDownMenu} from 'material-ui'
// import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import MenuIcon from '@material-ui/icons/Menu';
// import { Menu, MenuItem, Drawer, Divider, Avatar, Subheader,DropDownMenu } from 'material-ui'
// import { MuiThemeProvider as V1MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { Link } from 'react-router-dom'


const Header = ({app_bar_open, groups, selected_group_id, years, selected_year,
                 onClickAppBar, group_select_open, onClickGroup, onClickYear, onClickIssueList}) => {

  const style = {
    position: 'fixed', top: 0, left: 0
  //muitheme
  // const themeV1 = createMuiTheme()
  // const theme = getMuiTheme()

  //styles
  // const styles = {
  //   root: {
  //     flexGrow: 0,
  //   },
  //   flex: {
  //     flexGrow: 1,
  //   },
  //   menuButton: {
  //     marginLeft: -12,
  //     marginRight: 20,
  //   },
  }

  let _groups_name = "Red Muffin"
  if(window.location.href !== "http://localhost:3000/") {
    for(let i = 0 ; i < groups.length; i++) {
      if(selected_group_id === groups[i].id) {
        _groups_name = groups[i].name + " ＠" + selected_year + "年度"
      }
    }
  }

  return (
    <div>
    <MuiThemeProvider>
      <div>
        <Drawer
          docked={false}
          width={200}
          open={app_bar_open}
          onRequestChange={() => onClickAppBar()}
        >
          <Subheader>Group</Subheader>
          <DropDownMenu value={selected_group_id} onChange={(event, index, value) => onClickGroup(value)}>
            {groups.map(group => <MenuItem key={group.id} value={group.id} primaryText={group.name} />)}
          </DropDownMenu>
          <Subheader>Business Year</Subheader>
          <DropDownMenu value={selected_year} onChange={(event, index, value) => onClickYear(value)}>
            {years.map(year => <MenuItem key={year} value={year} primaryText={year+"年度"} />)}
          </DropDownMenu>
          <Divider />
          <Subheader>Menu</Subheader>
          <Menu>
             <Link to='/issue'><MenuItem key="1" value="1">案件一覧</MenuItem></Link>
             <Link to='/member'><MenuItem key="2" value="2">要員別山積表</MenuItem></Link>
          </Menu>
        </Drawer>
        <AppBar
          title={_groups_name}
          iconElementRight={<Avatar src="food.svg" />}
          onLeftIconButtonClick={() => onClickAppBar()}

          style={style}
        />
      </div>
    </MuiThemeProvider>
    </div>
    // <MuiThemeProvider theme={theme}>
    //   <div>
    //     <V1MuiThemeProvider theme={themeV1}>
    //       <div className={styles.root}>
    //         <AppBar position="fixed">
    //           <Toolbar>
    //             <IconButton style={styles.menuButton} color="inherit" aria-label="Menu" onClick={() => onClickAppBar()}>
    //               <MenuIcon />
    //             </IconButton>
    //             <Typography variant="title" color="inherit" style={styles.flex}>
    //               {_groups_name}
    //             </Typography>
    //             <Button color="inherit" href="https://www.google.com/search?tbm=isch&q=red+muffin" target="_blank"><Avatar src="food.svg" /></Button>
    //           </Toolbar>
    //         </AppBar>
    //       </div>
    //     </V1MuiThemeProvider>
    //     <Drawer
    //       docked={false}
    //       width={200}
    //       open={app_bar_open}
    //       onRequestChange={() => onClickAppBar()}
    //     >
    //       <Subheader>Group</Subheader>
    //       <DropDownMenu value={selected_group_id} onChange={(event, index, value) => onClickGroup(value)}>
    //         {groups.map(group => <MenuItem key={group.id} value={group.id} primaryText={group.name} />)}
    //       </DropDownMenu>
    //       <Subheader>Business Year</Subheader>
    //       <DropDownMenu value={selected_year} onChange={(event, index, value) => onClickYear(value)}>
    //         {years.map(year => <MenuItem key={year} value={year} primaryText={year+"年度"} />)}
    //       </DropDownMenu>
    //       <Divider />
    //       <Subheader>Menu</Subheader>
    //       <Menu>
    //           <Link to='/issue'><MenuItem key="1" value="1">案件一覧</MenuItem></Link>
    //           <Link to='/member'><MenuItem key="2" value="2">要員別山積表</MenuItem></Link>
    //           <Link to='/calendar'><MenuItem key="3" value="3">実績カレンダー</MenuItem></Link>
    //       </Menu>
    //     </Drawer>
    //   </div>
    // </MuiThemeProvider>
  )

}

export default Header
