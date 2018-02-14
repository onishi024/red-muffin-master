import React, { Component } from 'react'
import {FlatButton, Dialog, CircularProgress} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'

export default class Issue extends Component {

  //constructor
  constructor(props) {
    super(props)
    const id = props.match.params.id
    this.state = {
      id: id,
      data: this.initData(id, props.issue_cost_rows, props.members),
      register_processing: false,
    }
  }

  initData = (id, issue_cost_rows, members) => {
    const id_filtered_rows = issue_cost_rows.filter(row => row.issue_id === Number(id))
    return id_filtered_rows.map(row => {
      return {
        id: row.id,
        subname: row.subname,
        member: members[row.member_id].name,
        pc04: row.pc04,
        pc05: row.pc05,
        pc06: row.pc06,
        pc07: row.pc07,
        pc08: row.pc08,
        pc09: row.pc09,
        pc10: row.pc10,
        pc11: row.pc11,
        pc12: row.pc12,
        pc01: row.pc01,
        pc02: row.pc02,
        pc03: row.pc03
      }
    })
  }

  //styles
  styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    },
    ankenname: {
      margin: 12,
      fontSize: 16,
      fontWeight: "bold",
    },
    hot: {
      margin: 12,
      fontSize: 12,
    }
  }

  //SUBMIT
  onClick1 = event => {
    this.setState({register_processing: true})
  }

  onClick2 = event => {
    this.setState({register_processing: false})
    const issue_cost_rows = this.dataToRows(this.state.id, this.props.issue_cost_rows, this.state.data, this.props.members)
    this.props.onClickChangeIssueSubmit(issue_cost_rows)
  }

  dataToRows = (id, issue_cost_rows, data, members) => {
    console.log(members);
    const id_filtered_rows = data.map(datum => {
      let member_id = null
      for (let i in members) {
        if (members[i].name === datum.member) {
          member_id = members[i].id
        }
      }
      return {
        id: datum.id,
        issue_id: Number(id),
        subname: datum.subname,
        member_id: member_id,
        pc04: datum.pc04,
        pc05: datum.pc05,
        pc06: datum.pc06,
        pc07: datum.pc07,
        pc08: datum.pc08,
        pc09: datum.pc09,
        pc10: datum.pc10,
        pc11: datum.pc11,
        pc12: datum.pc12,
        pc01: datum.pc01,
        pc02: datum.pc02,
        pc03: datum.pc03
      }
    })
    const id_unfiltered_rows = issue_cost_rows.filter(row => row.issue_id !== Number(id))
    return [...id_filtered_rows, ...id_unfiltered_rows]
  }

  //カラムヘッダー定義
  colHeaders = ["#", "サブ名称", "要員",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義
  columns = [
    { data: 'id', editor: false },
    { data: 'subname'},
    {
      data: 'member',
      editor: 'select',
      selectOptions: this.props.members.map(member => member.name),
      allowInvalid: false
    },
    { data: 'pc04', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc05', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc06', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc07', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc08', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc09', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc10', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc11', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc12', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc01', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc02', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'pc03', type: 'numeric', allowInvalid: false, format: '0.00' }
  ]

  render() {
    const actions = [
      <Link to='/issue'>
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.onClick2}
        />
      </Link>,
    ]

    return (
      <div>
        <div style={this.styles.path}><Link to={`/`}>Home</Link> > <Link to={`/issue`}>案件一覧</Link> > 案件情報編集</div>
        <div style={this.styles.ankenname}>#{this.state.id} : {this.props.issue_rows[0].ankenname}</div>
        <MuiThemeProvider>
          <div style={this.styles.hot}>
            <HotTable
              root="hot"
              data={this.state.data}
              colHeaders={this.colHeaders}
              columns={this.columns}
              columnSorting={false}
              width="1000"
              stretchH="all"
              fixedColumnsLeft="3"
              manualColumnResize={true}
              />
          </div>
          <Link to='/issue'>
            <FlatButton
              label="Cancel"
              primary={true}
            />
          </Link>
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.onClick1}
          />
          <Dialog
            title="Loading..."
            actions={actions}
            modal={true}
            open={this.state.register_processing}
          >
            <p>This is a mock indicator. Please push SUBMIT to close windows.</p>
            <CircularProgress size={80} thickness={7} />
          </Dialog>
        </MuiThemeProvider>
      </div>
    )
  }

}


// cells={cellSetting}
// afterChange={_onChangeRows}
