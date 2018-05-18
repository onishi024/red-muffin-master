import React, { Component } from 'react'
import {FlatButton, Dialog, CircularProgress, FloatingActionButton, SelectField, MenuItem,
        Paper, List, ListItem, TextField} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ContentAdd from 'material-ui/svg-icons/content/add'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'

export default class Issue extends Component {

  //constructor
  constructor(props) {
    super(props)
    const id = props.match.params.id
    this.state = {
      id: id,
      info: this.initInfo(id, props.issue_rows),
      register_processing: false,
      addMemberForm: {
        assigned: "",
        addMemberOpen: false,
      },
      change_data: {
        id: [],
        key: [],
        value: []
      }
    }
  }

  rowData = (id, issue_rows, group_users) => {
    const id_filtered_rows = issue_rows.filter(row => row.parent === id)
    const row_data = id_filtered_rows.map(row => {
      const grade = group_users.filter(group_users => group_users.id === row.assigned_id)[0].grade
      const category = grade.substring(0,1) === 'G' || grade.substring(0,1) === 'M' ? 'プロパー' : 'BP'
      return {
        id: row.id,
        category: category,
        grade: grade,
        assigned_name: row.assigned_name,
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
        grade: "",
        assigned_name: "",
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
    },
    addMemberButton:{
      marginLeft: 20,
      right: 30,
      bottom: 30,
      position: "fixed",
      zIndex: 1
    }
  }

  //SUBMIT
  onClick1 = event => {
    this.setState({register_processing: true})
  }

  onClick2 = event => {
    this.setState({register_processing: false})
    this.props.onClickChangeIssueSubmit(this.state.change_data)
  }

  onClick3 = event => {
    this.setState({
      addMemberForm: {
        addMemberOpen: true
      }
    })
  }

  onClick4 = event => {
    const id_filtered_rows = this.props.issue_rows.filter(row => row.id === this.state.id)
    this.props.onClickAddMemberSubmit(id_filtered_rows[0], this.state.addMemberForm.assigned)
    this.setState({
      addMemberForm: {
        addMemberOpen: false,
        assigned: ""
      }
    })
  }

  onClick5 = event => {
    this.setState({
      addMemberForm: {
        addMemberOpen: false,
        assigned: ""
      }
    })
  }

  onChange1 = (event, key, payload) => {
    const id = this.props.groupUsers[key].id
    this.setState({
      addMemberForm: {
        ...this.state.addMemberForm,
        assigned: id
      }
    })
  }

  onChange2 = (changes, source) => {
    if(source === 'edit' || source === 'CopyPaste.paste'){
      // 変更された要素をlocalState.change_dataに保存
      // 画面で同一項目が複数回更新され場合はlocalState.change_dataを上書き
      for (let i in changes) {
        const change_row = changes[i][0]
        const change_key = changes[i][1]
        const change_value = changes[i][3]
        const row_data = this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers)
        // localState.change_dataが空の場合は無条件で要素を追加
        if(this.state.change_data.id.length === 0){
          this.state.change_data.id.push(row_data[change_row]["id"])
          this.state.change_data.key.push(change_key)
          this.state.change_data.value.push(change_value)
        } else {
          for(let j=0; j<this.state.change_data.id.length; j++){
            // idとkeyが既にlocalState.change_dataにあるか判定し、存在する場合はvalueを更新
            if(this.state.change_data.id[j] === row_data[change_row]["id"] &&
               this.state.change_data.key[j] === change_key){
                 this.state.change_data.value[j] = change_value
                 break
               }
            // localState.change_dataを全て検査し、idとkeyが重複しない場合のみ要素を追加する
            else if(j === this.state.change_data.key.length -1) {
              this.state.change_data.id.push(row_data[change_row]["id"])
              this.state.change_data.key.push(change_key)
              this.state.change_data.value.push(change_value)
            }
          }
        }
      }
    }
  }

  onChange3 = (event, newValue) => {
    console.log('call onChange3')
    if(this.state.change_data.id.length === 0){
      this.state.change_data.id.push(this.state.id)
      this.state.change_data.key.push("note")
      this.state.change_data.value.push(newValue)
    } else {
      for(let i=0; i<this.state.change_data.id.length; i++){
        // idとkeyが既にlocalState.change_dataにあるか判定し、存在する場合はvalueを更新
        if(this.state.change_data.id[i] === this.state.id &&
           this.state.change_data.key[i] === "note"){
             this.state.change_data.value[i] = newValue
             break
           }
        // localState.change_dataを全て検査し、idとkeyが重複しない場合のみ要素を追加する
        else if(i === this.state.change_data.key.length -1) {
          this.state.change_data.id.push(this.state.id)
          this.state.change_data.key.push("note")
          this.state.change_data.value.push(newValue)
        }
      }
    }
  }

  dataToRows = (id, issue_cost_rows, data, group_users) => {
    const id_filtered_rows = data.map(datum => {
      return {
        id: datum.id,
        issue_id: id,
        category: datum.category,
        grade: datum.grade,
        assigned_name: datum.assigned_name,
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
    return [...id_filtered_rows]
    // const id_unfiltered_rows = issue_cost_rows.filter(row => row.issue_id !== id)
    // return [...id_filtered_rows, ...id_unfiltered_rows]
  }

  //カラムヘッダー定義
  colHeaders = ["#", "種別", "所属", "氏名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義
  columns = [
    { data: 'id', editor: false },
    { data: 'category', editor: false },
    { data: 'grade', editor: false },
    { data: 'assigned_name', editor: false },
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
    const actions1 = [
      <Link to='/issue'>
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.onClick2}
        />
      </Link>,
    ]

    const actions2 = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onClick={this.onClick5}
      />,
      <Link to={`/issue_edit/${this.state.id}`}>
        <FlatButton
          label="Submit"
          primary={true}
          keyboardFocused={true}
          onClick={this.onClick4}
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
                    <ListItem style={this.styles.listItem} disabled={true} primaryText='主担当' secondaryText={<span style={{fontSize: 12}}>{this.state.info[0].assigned_name}</span>} />
                </List>
            </Paper>
            <br />
            <TextField style={this.styles.textField} multiLine={true} rows={1} rowsMax={3}
              floatingLabelFixed={true}
              floatingLabelText={<span style={{fontSize: 16}}>備考</span>}
              defaultValue={this.state.info[0].note}
              hintText="The hint text can be as long as you want, it will wrap."
              onChange={this.onChange3}
              />
            <br />
            <div style={this.styles.hot}>
              <HotTable
                floatingLabelText={<span style={{fontSize: 16}}>要員計画</span>}
                root="hot"
                data={this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers)}
                colHeaders={this.colHeaders}
                columns={this.columns}
                columnSorting={true}
                width="1000"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={true}
                afterChange={this.onChange2}
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
            <FloatingActionButton
              mini={true}
              style={this.styles.addMemberButton}
              onClick={this.onClick3}
            >
              <ContentAdd />
            </FloatingActionButton>
            <Dialog
              title="addMember"
              actions={actions2}
              modal={true}
              open={this.state.addMemberForm.addMemberOpen}
            >
              <SelectField
              floatingLabelText="担当"
              value={this.state.addMemberForm.assigned}
              onChange={this.onChange1}
              >
                {this.props.groupUsers.map(group_user => <MenuItem value={group_user.id} primaryText={group_user.name} />)}
              </SelectField><br />
            </Dialog>
            <Dialog
              title="Loading..."
              actions={actions1}
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
