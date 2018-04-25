import React, { Component } from 'react'
import {FlatButton, Dialog, CircularProgress,
        Subheader, Divider ,Paper, List, ListItem, TextField} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'

export default class Issue extends Component {

  //constructor
  constructor(props) {
    super(props)
    const id = props.match.params.id
    console.log('issue.js constructor')
    console.log(props)
    this.state = {
      id: id,
      info: this.initInfo(id, props.issue_rows),
      data: this.initData(id, props.issue_rows, props.groupUsers),
      register_processing: false,
    }
  }

  initData = (id, issue_rows, members) => {
    const id_filtered_rows = issue_rows.filter(row => row.parent === id)
    console.log(id)
    console.log(issue_rows)
    console.log(id_filtered_rows)
    const row_data = id_filtered_rows.map(row => {
      return {
        id: row.id,
        subname: "",
        assigned: row.assigned,
        es04: row.es04,
        es05: row.es05,
        es06: row.es06,
        es07: row.es07,
        es08: row.es08,
        es09: row.es09,
        es10: row.es10,
        es11: row.es11,
        es12: row.es12,
        es01: row.es01,
        es02: row.es02,
        es03: row.es03
      }
    })
    const sum_data = id_filtered_rows.length === 0 ? null : id_filtered_rows.reduce((result, current) => {
      result.es04 += current.es04
      result.es05 += current.es05
      result.es06 += current.es06
      result.es07 += current.es07
      result.es08 += current.es08
      result.es09 += current.es09
      result.es10 += current.es10
      result.es11 += current.es11
      result.es12 += current.es12
      result.es01 += current.es01
      result.es02 += current.es02
      result.es03 += current.es03
      return {
        id: '合計',
        subname: "",
        assigned: "",
        es04: result.es04,
        es05: result.es05,
        es06: result.es06,
        es07: result.es07,
        es08: result.es08,
        es09: result.es09,
        es10: result.es10,
        es11: result.es11,
        es12: result.es12,
        es01: result.es01,
        es02: result.es02,
        es03: result.es03
      }
    })
    const data = row_data.concat(sum_data)
    return data
  }

  initInfo = (id,issue_rows) => {
    const id_filtered_rows = issue_rows.filter(row => row.id === id)
    return id_filtered_rows
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
    },
    info: {
      margin: 12,
      width: 600,
      height: 200,
      display: 'inline-block',
    },
    listItem: {
      height: 2,
      fontSize: 12,
      // margin: 0,
    //   paddingTop: 10,
    //   paddingLeft: 20,
    //   verticalAlign: 'top',
    },
    textField: {
      margin: 12,
      marginTop: 0,
      width: 600,
      fontSize: 12,
    },
    subHeader: {
      lineHeight: 1.5,
      fontSize: 12,
      paddingTop: 8,
      paddingBottom: 8,
      verticalAlign: 'middle',
      color: '#000000',
      backgroundColor: '#B2EBF2',
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
    const id_filtered_rows = data.map(datum => {
      let member_id = null
      for (let i in members) {
        if (members[i].name === datum.member) {
          member_id = members[i].id
        }
      }
      return {
        id: datum.id,
        issue_id: id,
        subname: datum.subname,
        assigned: datum.assigned,
        es04: datum.es04,
        es05: datum.es05,
        es06: datum.es06,
        es07: datum.es07,
        es08: datum.es08,
        es09: datum.es09,
        es10: datum.es10,
        es11: datum.es11,
        es12: datum.es12,
        es01: datum.es01,
        es02: datum.es02,
        es03: datum.es03
      }
    })
    const id_unfiltered_rows = issue_cost_rows.filter(row => row.issue_id !== id)
    return [...id_filtered_rows, ...id_unfiltered_rows]
  }

  //カラムヘッダー定義
  colHeaders = ["#", "種別", "所属", "氏名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義
  columns = [
    { data: 'id', editor: false },
    { data: ''},
    { data: ''},
    { data: 'assigned', editor: false },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00' },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00' }
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
        <MuiThemeProvider>
          <div>
            <Paper style={this.styles.info}>
                <List>
                    <ListItem style={this.styles.listItem} disabled={true} primaryText='案件名' secondaryText={<span style={{fontSize: 12}}>{this.state.info[0].title}</span>} />
                    <ListItem style={this.styles.listItem} disabled={true} primaryText='案件番号' secondaryText={<span style={{fontSize: 12}}>{this.state.info[0].ankenno}</span>} />
                    <ListItem style={this.styles.listItem} disabled={true} primaryText='内部管理番号' secondaryText={<span style={{fontSize: 12}}>{this.state.info[0].naibukanrino}</span>} />
                    <ListItem style={this.styles.listItem} disabled={true} primaryText='主担当' secondaryText={<span style={{fontSize: 12}}>{this.state.info[0].assigned}</span>} />
                </List>
            </Paper>
            <br />
            <TextField style={this.styles.textField} multiLine={true} rows={1} rowsMax={3}
              floatingLabelFixed={true}
              floatingLabelText={<span style={{fontSize: 16}}>備考</span>}
              defaultValue={this.state.info[0].note}
              hintText="The hint text can be as long as you want, it will wrap."/><br />
            <div style={this.styles.hot}>
              <HotTable
                floatingLabelText={<span style={{fontSize: 16}}>要員計画</span>}
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
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}

// <div style={this.styles.ankenname}>#{this.state.id} : {this.props.issue_rows[0].ankenname}</div>

// cells={cellSetting}
// afterChange={_onChangeRows}

// <Subheader style={this.styles.subHeader}>案件名</Subheader>
// <ListItem style={this.styles.listItem} disabled='true' primaryText={this.props.issue_rows[3].title} />
// <Subheader style={this.styles.subHeader}>案件番号</Subheader>
// <ListItem style={this.styles.listItem} disabled='true' primaryText={this.props.issue_rows[3].ankenno} />
// <Subheader style={this.styles.subHeader}>内部管理番号</Subheader>
// <ListItem style={this.styles.listItem} disabled='true' primaryText={this.props.issue_rows[3].naibukanrino} />
// <Subheader style={this.styles.subHeader}>主担当</Subheader>
// <ListItem style={this.styles.listItem} disabled='true' primaryText={this.props.issue_rows[3].assigned} />
