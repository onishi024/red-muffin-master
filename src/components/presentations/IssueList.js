import React from 'react'
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHeaderColumn, TableRowColumn,
         Toggle, IconButton, FloatingActionButton, Snackbar } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const IssueList = ({selected_function, show_hided_issue, parent_issue_rows, onToggleHide, onToggleIssueHide, onoffSnackBar,
                    getIssue_rows, selected_group_id, selected_year, snackbar_open, current_id}) => {


  //親チケットの絞込み
  // const __issue_rows = issue_rows.filter(issue_row => issue_row.parent === issue_row.id)
  //表示対象の絞込み
  const _issue_rows = show_hided_issue ? parent_issue_rows.filter(issue_row => issue_row.hide === true) : parent_issue_rows

  //非表示toggleのスタイル
  const styles = {
    table: {
      overflowY: "scroll",
      // marginTop: "100px",
      // paddingTop: "100px",
      // borderTop: "100px",
    },
    tableHeader: {
      marginTop: "95px",
      position: "fixed",
    },
    tableBody: {
      marginTop: "155px",
      position: "fixed",
    },
    path: {
      top:0,
      left:-3,
      fontSize: 12,
      color: "#9E9E9E"
    },
    toggle: {
      maxWidth: 50,
      margin: 16,
      right: 80,
      // top: 72,
      bottom: 0,
      position: "fixed",
      zIndex: 1,
    },
    issue_toggle:{
      maxWidth: 50,
      zIndex: 0,
    },

    snackbar: {
      backgroundColor: '#B2EBF2',
    },
    toggle_icon: {
      boxShadow: '0px 4px 4px 1px rgba(0,0,0,0.15)'
    }
  }

  //案件追加buttonのスタイル
  const button_style = {
    marginLeft: 20,
    right: 30,
    // top: 78,
    bottom: 9,
    position: "fixed",
    zIndex: 1
  }
  const toolbar_style1 = {
    height:45,
    width: '100%',
    top: 60,
    left:0,
    backgroundColor: "#FFFFFF",
    position: "fixed",
    zIndex:999
  }
  //ツールバーのスタイル
  const toolbar_style2 = {
    height:58,
    width: '100%',
    bottom: 0,
    position: "fixed"

  }

  //SVG Icons
  const EditIcon = () => {
    return (
      <IconButton tooltip="SVG Icon" >
        <ModeEdit />
      </IconButton>
    )
  }

  //Methods
  const _onToggleIssueHide = (event, value) => {
    onoffSnackBar()
    onToggleIssueHide(event.target.name, value)
    setTimeout(() => {onoffSnackBar()}, 2000)
  }

  //return
  return (
    <MuiThemeProvider>
      <div>
        <Toolbar style={toolbar_style1}>
          <ToolbarGroup style={styles.path}>
            <Link to={`/`}>Home</Link> > 案件一覧
          </ToolbarGroup>
        </Toolbar>
        <Table
          height={window.innerHeight - 222}
          fixedHeader={true}
          headerStyle={styles.tableHeader}
          bodyStyle={styles.tableBody}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn style={{ width: '5%'}}>ID</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '15%'}}>案件管理番号</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '15%'}}>内部管理番号</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '25%'}}>案件名称</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%'}}>主担当</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%'}}>見積</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%'}}>詳細</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%'}}>表示</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false} >
            {_issue_rows.map(issue_row => {
              return (
                <TableRow key={issue_row.id} >
                  <TableRowColumn style={{ width: '5%'}}>{issue_row.id}</TableRowColumn>
                  <TableRowColumn style={{ width: '15%'}}>{issue_row.ankenno}</TableRowColumn>
                  <TableRowColumn style={{ width: '15%'}}>{issue_row.naibukanrino}</TableRowColumn>
                  <TableRowColumn style={{ width: '25%', whiteSpace: 'nomal', wordWrap: 'break-word'}}>{issue_row.title}</TableRowColumn>
                  <TableRowColumn style={{ width: '10%'}}>{issue_row.assigned_name}</TableRowColumn>
                  <TableRowColumn style={{ width: '10%'}}>
                    {
                      ( issue_row.es04 + issue_row.es05 + issue_row.es06 + issue_row.es07 + issue_row.es08 + issue_row.es09
                        + issue_row.es10 + issue_row.es11 + issue_row.es12 + issue_row.es01 + issue_row.es02 + issue_row.es03
                      ).toFixed(2)
                    }
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '10%'}}><Link to={`/issue_edit/${issue_row.id}`}><EditIcon /></Link></TableRowColumn>
                  <TableRowColumn boolean='true' style={{ width: '10%'}}>
                    <Toggle style={styles.issue_toggle} toggled={issue_row.hide} name={issue_row.id} onToggle={(event, value) => _onToggleIssueHide(event, value)}/>
                  </TableRowColumn>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
            </TableRow>
          </TableFooter>
        </Table>
        <Snackbar
          style={styles.snackbar}
          open={snackbar_open}
          message={'#' + current_id + 'の表示／非表示を切り替えました'}
          autoHideDuration={2000}
        />
        <Toolbar style={toolbar_style2}>
          <ToolbarGroup>
            <Toggle
              style={styles.toggle}
              thumbStyle={styles.toggle_icon}
              trackStyle={styles.toggle_icon}
              toggled={show_hided_issue}
              onToggle={() => onToggleHide()}
              title="非表示案件を表示/非表示切り替え" />
            <Link to='/register'>
              <FloatingActionButton mini={true} style={button_style} title='案件追加'>
                <ContentAdd />
              </FloatingActionButton>
            </Link>
          </ToolbarGroup>
        </Toolbar>
      </div>
    </MuiThemeProvider>
  )

}


export default IssueList

// + parseFloat(issue_row.es01) + parseFloat(issue_row.es02) + parseFloat(issue_row.es03)
