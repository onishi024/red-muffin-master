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
        assigned_name: "",
        addMemberOpen: false,
      },
      status: "none",
      change_data: {
        id: [],
        key: [],
        value: [],
      },
      details: {
        id:"",
        grade: "",
        assigned_name: "",
        assigned_id: "",
        es04: 0.0,
        es05: 0.0,
        es06: 0.0,
        es07: 0.0,
        es08: 0.0,
        es09: 0.0,
        es10: 0.0,
        es11: 0.0,
        es12: 0.0,
        es01: 0.0,
        es02: 0.0,
        es03: 0.0
      },
      summary: {
        id:"",
        grade: "",
        assigned_name: "",
        es04: 0.0,
        es05: 0.0,
        es06: 0.0,
        es07: 0.0,
        es08: 0.0,
        es09: 0.0,
        es10: 0.0,
        es11: 0.0,
        es12: 0.0,
        es01: 0.0,
        es02: 0.0,
        es03: 0.0
      },
      copyFlag: true,
    }
  }

  summaryData = (Details_Data) => {
    if(this.state.copyFlag === false) {
      if(Details_Data.length === 0) {
        // console.log("0行の場合")
        this.setState({summary: {
          id: '合計',
          grade: "",
          assigned_name: "",
          es04: 0.0,
          es05: 0.0,
          es06: 0.0,
          es07: 0.0,
          es08: 0.0,
          es09: 0.0,
          es10: 0.0,
          es11: 0.0,
          es12: 0.0,
          es01: 0.0,
          es02: 0.0,
          es03: 0.0
        }})
        return this.state.summary
      }
      else if(Details_Data.length === 1) {
          // console.log("1行の場合")
          this.setState({summary: {
            id: '合計',
            grade: "",
            assigned_name: "",
            es04: Details_Data[0].es04,
            es05: Details_Data[0].es05,
            es06: Details_Data[0].es06,
            es07: Details_Data[0].es07,
            es08: Details_Data[0].es08,
            es09: Details_Data[0].es09,
            es10: Details_Data[0].es10,
            es11: Details_Data[0].es11,
            es12: Details_Data[0].es12,
            es01: Details_Data[0].es01,
            es02: Details_Data[0].es02,
            es03: Details_Data[0].es03
          }})
          return this.state.summary
      }
      else {
        // console.log("2行以上の場合")
        let tmp_result_es04 = 0.0
        let tmp_result_es05 = 0.0
        let tmp_result_es06 = 0.0
        let tmp_result_es07 = 0.0
        let tmp_result_es08 = 0.0
        let tmp_result_es09 = 0.0
        let tmp_result_es10 = 0.0
        let tmp_result_es11 = 0.0
        let tmp_result_es12 = 0.0
        let tmp_result_es01 = 0.0
        let tmp_result_es02 = 0.0
        let tmp_result_es03 = 0.0

        for(let i = 0; i < Details_Data.length; i++) {
          tmp_result_es04 += Details_Data[i].es04
          tmp_result_es05 += Details_Data[i].es05
          tmp_result_es06 += Details_Data[i].es06
          tmp_result_es07 += Details_Data[i].es07
          tmp_result_es08 += Details_Data[i].es08
          tmp_result_es09 += Details_Data[i].es09
          tmp_result_es10 += Details_Data[i].es10
          tmp_result_es11 += Details_Data[i].es11
          tmp_result_es12 += Details_Data[i].es12
          tmp_result_es01 += Details_Data[i].es01
          tmp_result_es02 += Details_Data[i].es02
          tmp_result_es03 += Details_Data[i].es03
        }

        this.setState({summary: {
          id: '合計',
          grade: "",
          assigned_name: "",
          es04: tmp_result_es04,
          es05: tmp_result_es05,
          es06: tmp_result_es06,
          es07: tmp_result_es07,
          es08: tmp_result_es08,
          es09: tmp_result_es09,
          es10: tmp_result_es10,
          es11: tmp_result_es11,
          es12: tmp_result_es12,
          es01: tmp_result_es01,
          es02: tmp_result_es02,
          es03: tmp_result_es03
        }})
        return this.state.summary
      }
    }
    else {
      if(Details_Data.length === 0) {
        // console.log("0行の場合")
        this.state.summary = {
          id: '合計',
          grade: "",
          assigned_name: "",
          es04: 0.0,
          es05: 0.0,
          es06: 0.0,
          es07: 0.0,
          es08: 0.0,
          es09: 0.0,
          es10: 0.0,
          es11: 0.0,
          es12: 0.0,
          es01: 0.0,
          es02: 0.0,
          es03: 0.0
        }
        return this.state.summary
      }
      else if(Details_Data.length === 1) {
        // console.log("1行の場合")
        this.state.summary = {
          id: '合計',
          grade: "",
          assigned_name: "",
          es04: Details_Data[0].es04,
          es05: Details_Data[0].es05,
          es06: Details_Data[0].es06,
          es07: Details_Data[0].es07,
          es08: Details_Data[0].es08,
          es09: Details_Data[0].es09,
          es10: Details_Data[0].es10,
          es11: Details_Data[0].es11,
          es12: Details_Data[0].es12,
          es01: Details_Data[0].es01,
          es02: Details_Data[0].es02,
          es03: Details_Data[0].es03
        }
        return this.state.summary
      }
      else {
        // console.log("2行以上の場合")
        let tmp_result_es04 = 0.0
        let tmp_result_es05 = 0.0
        let tmp_result_es06 = 0.0
        let tmp_result_es07 = 0.0
        let tmp_result_es08 = 0.0
        let tmp_result_es09 = 0.0
        let tmp_result_es10 = 0.0
        let tmp_result_es11 = 0.0
        let tmp_result_es12 = 0.0
        let tmp_result_es01 = 0.0
        let tmp_result_es02 = 0.0
        let tmp_result_es03 = 0.0

        for(let i = 0; i < Details_Data.length; i++) {
          tmp_result_es04 += Details_Data[i].es04
          tmp_result_es05 += Details_Data[i].es05
          tmp_result_es06 += Details_Data[i].es06
          tmp_result_es07 += Details_Data[i].es07
          tmp_result_es08 += Details_Data[i].es08
          tmp_result_es09 += Details_Data[i].es09
          tmp_result_es10 += Details_Data[i].es10
          tmp_result_es11 += Details_Data[i].es11
          tmp_result_es12 += Details_Data[i].es12
          tmp_result_es01 += Details_Data[i].es01
          tmp_result_es02 += Details_Data[i].es02
          tmp_result_es03 += Details_Data[i].es03
        }
        this.state.summary = {
          id: '合計',
          grade: "",
          assigned_name: "",
          es04: tmp_result_es04,
          es05: tmp_result_es05,
          es06: tmp_result_es06,
          es07: tmp_result_es07,
          es08: tmp_result_es08,
          es09: tmp_result_es09,
          es10: tmp_result_es10,
          es11: tmp_result_es11,
          es12: tmp_result_es12,
          es01: tmp_result_es01,
          es02: tmp_result_es02,
          es03: tmp_result_es03
        }
        return this.state.summary
      }
    }
  }

  rowData = (id, issue_rows, group_users, changes, i) => {
    // console.log("rowDataだよ");
    // console.log("issue_rows : ",issue_rows);
    // console.log("this.state.copyFlag : ",this.state.copyFlag);
    //オブジェクトの値渡し
    // console.log("Flag:", this.state.copyFlag);
    if(this.state.copyFlag === true) {
      this.state.details = JSON.parse(JSON.stringify(issue_rows.filter(row => row.parent === id && row.id !== id)))
      // console.log("コピー元：",issue_rows.filter(row => row.parent === id && row.id !== id));
      // console.log("コピー完了");
    }
    //編集が行われた場合にローカルステート更新

    // console.log("this.state : ", this.state.details);

    //編集された場合にローカルステートを更新する
    if(changes !== undefined && changes !== null) {
        eval("this.state.details[" + changes[i][0] + "]." + changes[i][1] + "=" + changes[i][3])
    }
    //編集後の値で明細表示
    // let details_data
    // let summary_data
    // console.log("copyFlagだ : ", this.state.copyFlag);
    // console.log("changes : ", changes);

    if(this.state.copyFlag === true || changes !== null) {
      const details_data = this.state.details.map(row => {
        const grade = group_users.filter(group_users => group_users.id === row.assigned_id)[0].grade
        const category = grade.substring(0,1) === 'G' || grade.substring(0,1) === 'M' ? 'プロパー' : 'BP'

        // console.log("row : ", row);
        // console.log("grade : ", grade);
        // console.log("category : ", category);

        return {
          id: row.id,
          category: category,
          grade: grade,
          assigned_name: row.assigned_name,
          assigned_id: row.assigned_id,
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

      this.setState({
        details: [
          ...details_data,
        ]
      })

      const summary_data = this.summaryData(details_data)
      // const data = details_data.concat(summary_data)
      const data = details_data
      this.state.copyFlag = false
      // console.log("this.state.details : ",this.state.details)
      return data
    }
    else {
      // console.log("details : ", this.state.details);
      // return this.state.details.concat(this.state.summary)
      return this.state.details
    }
  }

  rowData0 = (id, issue_rows) => {
    const _piling= JSON.parse(JSON.stringify(issue_rows.filter(row => row.parent === id && row.id === id)))
    const piling = {
      id: "山積工数",
      es04: _piling[0].es04,
      es05: _piling[0].es05,
      es06: _piling[0].es06,
      es07: _piling[0].es07,
      es08: _piling[0].es08,
      es09: _piling[0].es09,
      es10: _piling[0].es10,
      es11: _piling[0].es11,
      es12: _piling[0].es12,
      es01: _piling[0].es01,
      es02: _piling[0].es02,
      es03: _piling[0].es03
    }
    return piling
  }

  rowData2 = (summary) => {
    const _plans= JSON.parse(JSON.stringify(summary))
    const plans = {
      id: "予定工数",
      es04: _plans.es04,
      es05: _plans.es05,
      es06: _plans.es06,
      es07: _plans.es07,
      es08: _plans.es08,
      es09: _plans.es09,
      es10: _plans.es10,
      es11: _plans.es11,
      es12: _plans.es12,
      es01: _plans.es01,
      es02: _plans.es02,
      es03: _plans.es03
    }
    return plans
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
      display: 'inline-wblock',
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
    this.setState({status: "postIssueConfirming"})
  }

  onClick2 = event => {
    this.setState({
      register_processing: false,
      status: "processing"
    })
    this.props.onClickChangeIssueSubmit(this.state.change_data)
  }

  onClick3 = event => {
    this.setState({status: "inputing"})
  }

  onClickConfirm = event => {
    const id_filtered_rows = this.props.issue_rows.filter(row => row.id === this.state.id)
    this.props.onClickAddMemberSubmit(id_filtered_rows[0], this.state.addMemberForm.assigned)
    this.setState({
      addMemberForm: {
        assigned: "",
        assigned_name: ""
      },
      status: "processing",
    })
  }

  onClickSubmit = event => {
    this.setState({status: "confirming"})
  }

  onClickCancel = event => {
    this.setState({
      addMemberForm: {
        assigned: "",
        assigned_name: ""
      },
      status: "none",
    })
  }

  onClickPostIssueCancel = event => {
    this.setState({status: "none"})
  }

  onClickOK = event => {
    this.setState({
      status: "none",
      copyFlag : true
    })
    this.rowData(this.state.id, this.props.issue_rows, this.props.group_users, null, null)
  }

  onChange1 = (event, key, payload) => {
    const id = this.props.groupUsers[key].id
    const name = this.props.groupUsers[key].name
    this.setState({
      addMemberForm: {
        ...this.state.addMemberForm,
        assigned: id,
        assigned_name: name
      }
    })
  }

  onChange2 = (changes, source) => {
    if(source === 'edit' || source === 'CopyPaste.paste'){
      // 変更された要素をlocalState.change_dataに保存
      // 画面で同一項目が複数回更新され場合はlocalState.change_dataを上書き
      // console.log("onChange2が呼び出しされた")
      for (let i in changes) {
        if(changes[i][3] === "") {
          changes[i][3] = 0.0
        }
        const change_row = changes[i][0]
        const change_key = changes[i][1]
        const change_value = changes[i][3]
        //issue_rows全体から案件登録画面に表示されている案件の子チケットのみを絞り込む

        const row_data = this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers, changes, i)
        // console.log("this.state.summary:",this.state.summary);
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

  //required check
  required = value => value === "" ? "この項目は必須入力項目です。" : ""
  allRequired = form => {
    return (
      form.assigned === ""
    )
  }

  //カラムヘッダー定義
  colHeaders = ["#", "種別", "所属", "氏名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']
  //カラムヘッダー定義(山積＆作業工数の算出)
  colHeaders0 = ["種別",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義(要員計画)
  columns = [
    { data: 'id', readOnly: true, width: 40 },
    { data: 'category', readOnly: true, width: 60 },
    { data: 'grade', readOnly: true, width: 60 },
    { data: 'assigned_name', readOnly: true, width: 150 },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
  ]

  //カラムデータ定義(山積＆作業工数の算出)
  columns0 = [
    { data: 'id', readOnly: true, width: 310 },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00', width: 50 },
  ]

  render() {
    // console.log("render start");

    const actionPostIssueSubmit = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClick2}
      />
    ]

    const actionPostIssueConfirm = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.onClickPostIssueCancel}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClick2}
      />,
    ]

    const actionSubmit = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.onClickCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClickSubmit}
        disabled={this.allRequired(this.state.addMemberForm)}
      />,
    ]

    const actionConfirm = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.onClickCancel}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClickConfirm}
      />,
    ]

    // <Link to={`/issue`}>
    const actionOK = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClickOK}
      />
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
            <div>　■山積＆予定工数</div>
            <div style={this.styles.hot}>
              <HotTable
                floatingLabelText={<span style={{fontSize: 16}}>山積＆作業工数の算出</span>}
                root="hot0"
                data={this.rowData0(this.state.id, this.props.issue_rows)}
                colHeaders={this.colHeaders0}
                columns={this.columns0}
                columnSorting={true}
                readOnly={true}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
                />
              <HotTable
                floatingLabelText={<span style={{fontSize: 16}}>山積＆作業工数の算出</span>}
                root="hot3"
                data={this.rowData2(this.state.summary)}
                columns={this.columns0}
                columnSorting={true}
                readOnly={true}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
                />
            </div>
            <br />
            <div>　■要員計画</div>
            <div style={this.styles.hot}>
              <HotTable
                floatingLabelText={<span style={{fontSize: 16}}>要員計画</span>}
                root="hot1"
                data={this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers, null, null)}
                colHeaders={this.colHeaders}
                columns={this.columns}
                columnSorting={true}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
                afterChange={this.onChange2}
                columnSorting={true}
                />
              <HotTable
                floatingLabelText={<span style={{fontSize: 16}}>予定工数</span>}
                root="hot2"
                data={this.state.summary}
                columns={this.columns0}
                columnSorting={true}
                readOnly={true}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
                />
            </div>
            <Link to='/issue'>
              <FlatButton
                label="Cancel"
                primary={false}
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
              title="現在の入力内容を確定しますか?"
              actions={actionPostIssueConfirm}
              modal={true}
              open={this.state.status==="postIssueConfirming"}
            >
            </Dialog>
            <Dialog
              title="要員追加"
              actions={actionSubmit}
              modal={true}
              open={this.state.status === "inputing"}
            >
              <SelectField
              floatingLabelText="担当"
              value={this.state.addMemberForm.assigned}
              onChange={this.onChange1}
              errorText={this.required(this.state.addMemberForm.assigned)}
              >
                {this.props.groupUsers.map(group_user => <MenuItem key={group_user.id} value={group_user.id} primaryText={group_user.name} />)}
              </SelectField><br />
            </Dialog>
            <Dialog
              title="以下の内容で登録して良いですか?"
              actions={actionConfirm}
              modal={true}
              open={this.state.status==="confirming"}
            >
              <List>
                <ListItem style={this.styles.listItem} disabled={true} primaryText='担当'
                  secondaryText={this.state.addMemberForm.assigned_name} />
              </List>
            </Dialog>
            <Dialog
              title="更新処理実行中..."
              modal={true}
              open={this.state.status === "processing" && this.props.isLoading}
            >
              <CircularProgress size={80} thickness={7} />
            </Dialog>
            <Dialog
              title="更新処理が完了しました。"
              actions={actionOK}
              modal={true}
              open={this.state.status==="processing" && !this.props.isLoading}
              >
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
