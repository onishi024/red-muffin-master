import React from 'react'
import {Table, TableHeader, TableBody, TableFooter, TableRow, TableHeaderColumn, TableRowColumn,
         Toggle, IconButton, FloatingActionButton, Snackbar, TextField, Card} from 'material-ui'
// import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHeaderColumn, TableRowColumn,
//          Toggle, IconButton, FloatingActionButton, Snackbar } from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router-dom'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const IssueList = ({selected_function, show_hided_issue, parent_issue_rows, sub_issue_rows, onToggleHide, onToggleIssueHide,
                    onoffSnackBar,getIssue_rows, selected_group_id, selected_year, snackbar_open, current_id, filterIssueRows,
                     filter_flg, input_value, filterNaibukanrino, filter_flg_naibukanrino, input_value_naibukanrino, filterTitle,
                      filter_flg_title, input_value_title, filterAssignedName, filter_flg_assignedName, input_value_assignedName,}) => {

  //親チケットの絞込み
  // const __issue_rows = issue_rows.filter(issue_row => issue_row.parent === issue_row.id)

  //表示対象の絞込み
  const _issue_rows = show_hided_issue ? parent_issue_rows.filter(issue_row => issue_row.hide === true) : parent_issue_rows


  //直近2ヵ月の工数取得用キー生成
  const today = new Date()
  const this_month = (today.getMonth() + 1) % 12 ? (today.getMonth() + 1) % 12 : (today.getMonth() + 1)
  const next_month = (today.getMonth() + 2) % 12 ? (today.getMonth() + 2) % 12 : (today.getMonth() + 2)
  const this_month_key = this_month > 9 ? 'es' + this_month : 'es0' + this_month
  const next_month_key = next_month > 9 ? 'es' + next_month : 'es0' + next_month

  //直近2ヵ月の工数サマリを案件一覧表示用オブジェクトに追加
  const __issue_rows = _issue_rows.map((issue_row) => {

    //案件一覧表示用オブジェクトを新しい変数にコピー
    const new_issue_row = Object.assign({}, issue_row)

    //山積サマリ
    new_issue_row.this_month_cost = issue_row[this_month_key]
    new_issue_row.next_month_cost = issue_row[next_month_key]

    //親チケットに紐付く子チケットの絞り込み
    const _sub_issue_rows = sub_issue_rows.filter((issue_row) => {
      return issue_row.parent === new_issue_row.id
    })

    //子チケットの予定工数サマリ
    new_issue_row.this_month_actual_cost = _sub_issue_rows.reduce((accumulator,currentValue) => {
      return accumulator + currentValue[this_month_key]
    }, 0)

    new_issue_row.next_month_actual_cost = _sub_issue_rows.reduce((accumulator,currentValue) => {
     return accumulator + currentValue[next_month_key]
    }, 0)
    new_issue_row.this_month_cost_variance = new_issue_row.this_month_cost - new_issue_row.this_month_actual_cost
    new_issue_row.next_month_cost_variance = new_issue_row.next_month_cost - new_issue_row.next_month_actual_cost

    return new_issue_row

  }, sub_issue_rows)

  //フィルターによる表示対象の絞り込み
  const ___issue_rows = filter_flg ? __issue_rows.filter((item) => (item.ankenno.toString().indexOf(input_value) >= 0)) : __issue_rows
  const ____issue_rows = filter_flg_naibukanrino ? ___issue_rows.filter((item) => (item.naibukanrino.toString().indexOf(input_value_naibukanrino) >= 0)) : ___issue_rows
  const _____issue_rows = filter_flg_title ? ____issue_rows.filter((item) => (item.title.toString().indexOf(input_value_title) >= 0)) : ____issue_rows
  const ______issue_rows = filter_flg_assignedName ? _____issue_rows.filter((item) => (item.assigned_name.toString().indexOf(input_value_assignedName) >= 0)) : _____issue_rows

  //非表示toggleのスタイル
  const styles = {
    table: {
      overflowY: "scroll",
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
  //フィルター入力フォームのスタイル
  const form_styles = {
    ankenno_field:{
      maxWidth: 100,

    },
    naibukanrino_field:{
      maxWidth: 140,

    },
    title_field:{
      fullWidth: true

    },
    assigned_name_field:{
      maxWidth: 120,

    },
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
              <TableHeaderColumn style={{ width: '8%'}}>案件管理番号<br/><TextField style={form_styles.ankenno_field} hintText="JK1X_XXXXX" hintStyle={{fontSize: "12px"}} onChange={(event, value) => filterIssueRows(event, value)}/></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%'}}>内部管理番号<br/><TextField style={form_styles.naibukanrino_field} hintText="JKMDBNXXXXXXX" hintStyle={{fontSize: "12px"}} onChange={(event, value) => filterNaibukanrino(event, value)}/></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '30%'}}>案件名称<br/><TextField style={form_styles.title_field} hintText="XXX対応" hintStyle={{fontSize: "12px"}} onChange={(event, value) => filterTitle(event, value)}/></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '10%'}}>主担当<br/><TextField style={form_styles.assigned_name_field} hintText="田中太郎" hintStyle={{fontSize: "12px"}} onChange={(event, value) => filterAssignedName(event, value)}/></TableHeaderColumn>
              <TableHeaderColumn style={{ width: '5%'}}>山積（当月）<br/> &nbsp;<br/> &nbsp;<br/> &nbsp;</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '9%'}}>当月差分（山積-予定）<br/> &nbsp;<br/> &nbsp;<br/> &nbsp;</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '5%'}}>山積（次月）<br/> &nbsp;<br/> &nbsp;<br/> &nbsp;</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '9%'}}>次月予定（山積-予定）<br/> &nbsp;<br/> &nbsp;<br/> &nbsp;</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '7%', textAlign: 'center'}}>詳細<br/> &nbsp;<br/> &nbsp;<br/> &nbsp;</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '7%'}}>表示<br/> &nbsp;<br/> &nbsp;<br/> &nbsp;</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false} >
            {______issue_rows.map(issue_row => {
              return (
                <TableRow key={issue_row.id} >
                  <TableRowColumn style={{ width: '8%'}}>{issue_row.ankenno}</TableRowColumn>
                  <TableRowColumn style={{ width: '10%'}}>{issue_row.naibukanrino}</TableRowColumn>
                  <TableRowColumn style={{ width: '30%', whiteSpace: 'nomal', wordWrap: 'break-word'}}>{issue_row.title}</TableRowColumn>
                  <TableRowColumn style={{ width: '10%'}}>{issue_row.assigned_name}</TableRowColumn>
                  <TableRowColumn style={{ width: '7%', textAlign: 'right'}}>{(issue_row.this_month_cost).toFixed(2)}</TableRowColumn>
                  <TableRowColumn style={{ width: '7%', textAlign: 'right'}}>{(issue_row.this_month_cost_variance).toFixed(2)}</TableRowColumn>
                  <TableRowColumn style={{ width: '7%', textAlign: 'right'}}>{(issue_row.next_month_cost).toFixed(2)}</TableRowColumn>
                  <TableRowColumn style={{ width: '7%', textAlign: 'right'}}>{(issue_row.next_month_cost_variance).toFixed(2)}</TableRowColumn>
                  <TableRowColumn style={{ width: '7%', textAlign: 'right'}}><Link to={`/issue_edit/${issue_row.id}`}><EditIcon /></Link></TableRowColumn>
                  <TableRowColumn boolean='true' style={{ width: '7%'}}>
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
