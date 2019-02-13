import React, { Component } from 'react'
import {FlatButton, Dialog, CircularProgress, FloatingActionButton, SelectField, MenuItem,
        Paper, List, ListItem, TextField, IconButton} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

export default class Issue extends Component {

  //constructor
  constructor(props) {
    super(props)
    const id = props.match.params.id
    props.getAroundIssueRows(props.issue_rows.filter(row => row.id === props.match.params.id))
    this.state = {
      id: id,
      info: this.initInfo(id, props.issue_rows),
      register_processing: false,
      addMemberForm: {
        assigned: [],
        assigned_name: [],
        addMemberOpen: false,
      },
      removeMemberForm: {
        assigned: [],
        assigned_name: [],
        delete_issue: "",
        removeMemberOpen: false,
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
      localBusinessYear: parseFloat(Object.assign(props.selected_year)),
      // hot0Data: null
      hot0Data: this.rowData0(id, this.props.issue_rows, props.selected_year, null, null, null),
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

  rowData = (id, issue_rows, group_users, changes, i, cancel) => {
    const businessYear = String(this.state.localBusinessYear)
    let new_issue_rows = []
    if(businessYear === this.props.selected_year) {
      new_issue_rows = issue_rows.filter(row => row.parent === id && row.id !== id)
    } else {
      new_issue_rows = this.props.around_issue_rows.filter(row => row.business_year === businessYear && row.parent !== row.id)
    }
    if(this.state.copyFlag === true || cancel !== null) {
      this.state.details = JSON.parse(JSON.stringify(new_issue_rows))
      this.state.copyFlag = true
    }

    //編集された場合にローカルステートを更新する
    if(changes !== undefined && changes !== null) {
        eval("this.state.details[" + changes[i][0] + "]." + changes[i][1] + "=" + changes[i][3])
    }
    //編集後の値で明細表示
    if(this.state.copyFlag === true || changes !== null) {
      const details_data = this.state.details.map(row => {
        const grade = group_users.filter(group_users => group_users.id === row.assigned_id)[0].grade
        const category = grade.substring(0,1) === 'G' || grade.substring(0,1) === 'M' ? 'プロパー' : 'BP'

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
      return data
    }
    else {
      //氏名順にソート
      this.state.details.sort(function(a, b) {
        if(a.assigned_name > b.assigned_name) {
          return 1;
        }
        else if(a.assigned_name < b.assigned_name) {
          return -1;
        }
        else {
          return 0;
        }
      });
      //種別＋グレード順にソート
      this.state.details.sort(function(a, b) {
        if(a.category < b.category) {
          return 1;
        }
        else if(a.category > b.category) {
          return -1;
        }
        else {
          if((a.grade === "G3a" && b.grade === "G3b") || (a.grade === "G2a" && b.grade === "G2b")) {
            return 0;
          }
          else if((a.grade === "G3b" && b.grade === "G3a") || (a.grade === "G2b" && b.grade === "G2a")) {
            return 1;
          }
          else if(a.grade < b.grade) {
            return 1;
          }
          else if(a.grade > b.grade) {
            return -1;
          }
          else {
            return 0;
          }
        }
      });
      return this.state.details
    }
  }

  rowData0 = (id, issue_rows, selected_year, changes, i, localBusinessYear) => {
    let _piling = []
    if(this.state === undefined) {
      // 初回描画
      // メニューバーで選択されている年度のチケットを表示する
      const businessYear = String(parseFloat(Object.assign(selected_year)))

      let new_issue_rows = []
      new_issue_rows = issue_rows.filter(row => row.parent === id && row.id === id)

      _piling = JSON.parse(JSON.stringify(new_issue_rows))

    }else if(changes !== null) {
      // 再描画（山積み変更）
      // 編集された箇所の更新
      _piling[0] = this.state.hot0Data
      _piling[0][changes[i][1]] = changes[i][3]

    }else if(localBusinessYear !== null) {
      // 再描画（年度変更）
      // localBusinessYearに設定された年度のチケットを表示する
      const businessYear = localBusinessYear === null ?
                              String(parseFloat(Object.assign(selected_year))) :
                              String(localBusinessYear)

      let new_issue_rows = []
      if(businessYear === this.props.selected_year) {
        new_issue_rows = issue_rows.filter(row => row.parent === id && row.id === id)
      } else {
        new_issue_rows = this.props.around_issue_rows.filter(row => row.business_year === businessYear && row.parent === row.id)
      }

      _piling = JSON.parse(JSON.stringify(new_issue_rows))

    }else {
      _piling[0] = this.state.hot0Data
    }

    let hot0Data = {}
     if(_piling.length === 0) {
      hot0Data = {
        id: "山積工数　※該当年度のチケット無し",
        es04: 0,
        es05: 0,
        es06: 0,
        es07: 0,
        es08: 0,
        es09: 0,
        es10: 0,
        es11: 0,
        es12: 0,
        es01: 0,
        es02: 0,
        es03: 0
      }
    } else {
      hot0Data = {
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
    }
    if(changes === null && localBusinessYear === null){
      return hot0Data
    } else {
      this.setState({
        hot0Data: {
          id: hot0Data.id,
          es04: hot0Data.es04,
          es05: hot0Data.es05,
          es06: hot0Data.es06,
          es07: hot0Data.es07,
          es08: hot0Data.es08,
          es09: hot0Data.es09,
          es10: hot0Data.es10,
          es11: hot0Data.es11,
          es12: hot0Data.es12,
          es01: hot0Data.es01,
          es02: hot0Data.es02,
          es03: hot0Data.es03
        }
      })
    }
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

  rowData3 = (r1,r2) => {
    const plans = {
      id: "未アサイン（山積 - 予定）",
      es04: r1.es04 - r2.es04,
      es05: r1.es05 - r2.es05,
      es06: r1.es06 - r2.es06,
      es07: r1.es07 - r2.es07,
      es08: r1.es08 - r2.es08,
      es09: r1.es09 - r2.es09,
      es10: r1.es10 - r2.es10,
      es11: r1.es11 - r2.es11,
      es12: r1.es12 - r2.es12,
      es01: r1.es01 - r2.es01,
      es02: r1.es02 - r2.es02,
      es03: r1.es03 - r2.es03
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
      marginTop: "75px",
    },
    lnk: {
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
      right: 90,
      bottom: 30,
      position: "fixed",
      zIndex: 1
    },
    removeMemberButton:{
      marginLeft: 20,
      right: 30,
      bottom: 30,
      position: "fixed",
      zIndex: 1
    },
    Clear:{
      color: '#FF7F50',
      // backgroundColor: '#A9A9A9',
    },
    PrevYear:{
      marginLeft: 470,
    },
    // NextYear:{
    //   marginLeft: 60,
    // }
  }

  //SUBMIT
  onClickPostIssueSubmit = event => {
    this.setState({status: "postIssueConfirming"})
  }

  onClickPostIssueConfirm = event => {
    this.setState({
      register_processing: false,
      status: "processing"
    })
    this.props.onClickChangeIssueSubmit(this.state.change_data, this.props.issue_rows.filter(row => row.id === this.props.match.params.id))
  }

  onClickTableClear = event => {
    const row_data = this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers, null, null,true)
  }

  onClickAddMemberOpen = event => {
    this.setState({status: "inputing"})
  }

  onChangeAddMember = (event, key, payload) => {
    //multipeの場合、keyはundefined、payloadに配列で情報保持
    const id = payload
    let name = []
    let index = 0
    for(let i = 0; i < this.props.groupUsers.length; i++) {
      for(let j = 0; j < payload.length; j++) {
        if(this.props.groupUsers[i].id === payload[j]) {
          name[index] = this.props.groupUsers[i].name
          index++
        }
      }
    }
    this.setState({
      addMemberForm: {
        ...this.state.addMemberForm,
        assigned: id,
        assigned_name: name
      }
    })
  }

  onClickSubmit = event => {
    this.setState({status: "confirming"})
  }

  onClickConfirm = event => {
    const businessYear = String(this.state.localBusinessYear)

    let id_filtered_rows = []
    if(businessYear === this.props.selected_year) {
      id_filtered_rows = this.props.issue_rows.filter(row => row.parent === this.state.id)
    }else {
      id_filtered_rows = this.props.around_issue_rows.filter(row => row.business_year === businessYear && row.parent === row.id)
    }

    this.props.onClickAddMemberSubmit(id_filtered_rows[0], this.state.addMemberForm.assigned)
    this.setState({
      addMemberForm: {
      assigned: "",
      assigned_name: ""
    },
      status: "processing",
    })
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

  onClickRemoveMemberOpen = event => {
    this.setState({status: "removeMemberinputing"})
  }

  onChangeRemoveMember = (event, key, payload) => {
    const filtered_issue_rows = this.props.issue_rows.filter(row => row.parent === this.state.id && row.id !== this.state.id)
    //multipeの場合、keyはundefined、payloadに配列で情報保持
    const id = payload
    let name = []
    let index = 0
    for(let i = 0; i < filtered_issue_rows.length; i++) {
      for(let j = 0; j < payload.length; j++) {
        if(filtered_issue_rows[i].assigned_id === payload[j]) {
          name[index] = filtered_issue_rows[i].assigned_name
          index++
        }
      }
    }
    this.setState({
      removeMemberForm: {
        ...this.state.removeMemberForm,
        assigned: id,
        assigned_name: name
      }
    })
  }

  onClickRemoveSubmit = event => {
    this.setState({status: "removeMemberconfirming"})
  }

  onClickRemoveConfirm = event => {
    const filtered_issue_rows = this.props.issue_rows.filter(row => row.parent === this.state.id && row.id !== this.state.id)
    let delete_id = []
    for(let i = 0; i < this.state.removeMemberForm.assigned.length; i++) {
      delete_id[i] = filtered_issue_rows.filter(row => row.assigned_id === this.state.removeMemberForm.assigned[i])[0].id
    }

    this.props.onClickRemoveMemberSubmit(delete_id)
    this.setState({
      removeMemberForm: {
        assigned: "",
        assigned_name: ""
      },
      status: "processing",
    })
  }

  onClickRemoveCancel = event => {
    this.setState({
      removeMemberForm: {
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
    this.rowData(this.state.id, this.props.issue_rows, this.props.group_users, null, null,null)
  }

  onChangeTable = (changes, source, row_data) => {
    if(source === 'edit' || source === 'CopyPaste.paste'){
      // 変更された要素をlocalState.change_dataに保存
      // 画面で同一項目が複数回更新され場合はlocalState.change_dataを上書き
      for (let i in changes) {
        if(changes[i][3] === "" || changes[i][3] === "." || changes[i][3] === "," || changes[i][3] === "-") {
          changes[i][3] = 0.0
        }
        const change_row = changes[i][0]
        const change_key = changes[i][1]
        const change_value = changes[i][3]

        //issue_rows全体から案件登録画面に表示されている案件の子チケットのみを絞り込む
        const row_data = this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers, changes, i, null)

        //localState.change_dataを更新
        this.changeDataUpdate(row_data[change_row]["id"], change_key, change_value)
      }
    }
  }

  onChangeTable2 = (changes, source, row_data) => {
    if(source === 'edit' || source === 'CopyPaste.paste'){
      // 変更された要素をlocalState.change_dataに保存
      // 画面で同一項目が複数回更新され場合はlocalState.change_dataを上書き
      for (let i in changes) {
        if(changes[i][3] === "" || changes[i][3] === "." || changes[i][3] === "," || changes[i][3] === "-") {
          changes[i][3] = 0.0
        }
        const change_row = changes[i][0]
        const change_key = changes[i][1]
        const change_value = changes[i][3]

        //issue_rows全体から案件登録画面に表示されている案件の子チケットのみを絞り込む
        const row_data = this.rowData0(this.state.id, this.props.issue_rows, this.props.groupUsers, changes, i, null)

        //localState.change_dataを更新
        this.changeDataUpdate(this.state.id, change_key, change_value)
      }
    }
  }

  onChangeRemarks = (event, newValue) => {
    this.changeDataUpdate(this.state.id, "note", newValue)
  }

  changeDataUpdate = (id, key, value) => {
    if(this.state.change_data.id.length === 0){
      this.state.change_data.id.push(id)
      this.state.change_data.key.push(key)
      this.state.change_data.value.push(value)
    } else {
      for(let i=0; i<this.state.change_data.id.length; i++){
        // idとkeyの組み合わせが既にlocalState.change_dataにあるか判定し、存在する場合はvalueを更新
        if(this.state.change_data.id[i] === id &&
           this.state.change_data.key[i] === key){
             this.state.change_data.value[i] = value
             break
           }
        // localState.change_dataを全て検査し、idとkeyが重複しない場合のみ要素を追加する
        else if(i === this.state.change_data.key.length -1) {
          this.state.change_data.id.push(id)
          this.state.change_data.key.push(key)
          this.state.change_data.value.push(value)
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
  requiredAddMember = value => {
    const already = this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers, null, null, null);
    if(value.length === 0) return "この項目は必須入力項目です。"
    for(let i = 0; i < already.length; i++) {
      for(let j = 0; j < value.length; j++) {
        if(already[i].assigned_id === value[j])
          return "既に追加されている要員です。"
      }
    }
    return ""
  }

  requiredRemoveMember = value => {
    if(value.length === 0) return "この項目は必須入力項目です。"
    else return ""
  }

  onClickUpdateBusinessYear = value => {
    const oldBusinessYear = this.state.localBusinessYear

    let old_issue_rows = []
    if(oldBusinessYear === parseFloat(this.props.selected_year)) {
      old_issue_rows = this.props.issue_rows.filter(row => row.parent === this.state.id)
    }else {
      old_issue_rows = this.props.around_issue_rows.filter(row => row.business_year === oldBusinessYear)
    }

    let change_data = {id: [], key: [], value: []}

    if(old_issue_rows.length !== 0){
      old_issue_rows.map(row => {
        let idx = this.state.change_data.id.indexOf(row.id)
        let new_change_data = this.state.change_data

        while(idx !== -1) {
          new_change_data.id.splice(idx, 1)
          new_change_data.key.splice(idx, 1)
          new_change_data.value.splice(idx, 1)
          idx = this.state.change_data.id.indexOf(row.id)
        }

        change_data = new_change_data
      })

    }

    const newBusinessYear = oldBusinessYear + value

    this.rowData0(this.state.id, this.props.issue_rows, this.props.selected_year, null, null, newBusinessYear)


    this.setState({
      copyFlag: true,
      localBusinessYear: newBusinessYear,
      change_data: change_data
    })
  }

  //カラムヘッダー定義
  colHeaders = ["種別", "グレード/所属", "氏名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']
  //カラムヘッダー定義(山積＆作業工数の算出)
  colHeaders0 = ["種別",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義(要員計画)
  columns = [
    // { data: 'id', readOnly: true, width: 40 },
    { data: 'category', readOnly: true, width: 60 },
    { data: 'grade', readOnly: true, width: 90 },
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
    { data: 'id', readOnly: true, width: 300 },
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
        onClick={this.onClickPostIssueConfirm}
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
        disabled={this.requiredAddMember(this.state.addMemberForm.assigned) !== "" ? true : false}
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

    const actionRemoveSubmit = [
      <FlatButton
        label="Cancel"
        primary={false}
        onClick={this.onClickRemoveCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClickRemoveSubmit}
        disabled={this.requiredRemoveMember(this.state.removeMemberForm.assigned) !== "" ? true : false}
      />,
    ]

    const actionRemoveConfirm = [
      <FlatButton
        label="Cancel"
        primary={false}
        keyboardFocused={true}
        onClick={this.onClickRemoveCancel}
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        keyboardFocused={true}
        onClick={this.onClickRemoveConfirm}
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
    //SVG Icons
    const EditIcon = () => {
      return (
        <IconButton tooltip="SVG Icon" >
          <ModeEdit />
        </IconButton>
      )
    }
    const hot1Data = this.rowData(this.state.id, this.props.issue_rows, this.props.groupUsers, null, null, null)
    const hot4Data = this.rowData3(
                        this.state.hot0Data,
                        this.rowData2(this.state.summary))

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
              hintText="Remarks can be described freely."
              onChange={this.onChangeRemarks}
              />
            <br />
            <div>　■山積＆予定工数　＠{this.state.localBusinessYear}年度
            <FlatButton
              label="PrevYear"
              style={this.styles.PrevYear}
              onClick={() => this.onClickUpdateBusinessYear(-1)}
            />
            <FlatButton
              label="NextYear"
              style={this.styles.Cancel}
              onClick={() => this.onClickUpdateBusinessYear(1)}
            />
            </div>
            <div style={this.styles.hot}>
              <HotTable
                root="hot0"
                // data={this.state.hot0Data}
                data={this.state.hot0Data}
                colHeaders={this.colHeaders0}
                columns={this.columns0}
                // columnSorting={true}
                readOnly={this.state.hot0Data.id === "山積工数　※該当年度のチケット無し" ? true : false}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
                afterChange={this.onChangeTable2}
              />
              <HotTable
                root="hot3"
                data={this.rowData2(this.state.summary)}
                columns={this.columns0}
                // columnSorting={true}
                readOnly={true}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
              />
              <HotTable
                root="hot4"
                data={hot4Data}
                columns={this.columns0}
                // columnSorting={true}
                readOnly={true}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
              />
            </div>
            <br />
            <div>　■要員計画　＠{this.state.localBusinessYear}年度</div>
            <div style={this.styles.hot}>
              <HotTable
                root="hot1"
                data={hot1Data}
                colHeaders={this.colHeaders}
                columns={this.columns}
                // columnSorting={true}
                width="910"
                stretchH="all"
                fixedColumnsLeft="3"
                manualColumnResize={false}
                fillHandle={false}
                afterChange={this.onChangeTable}
                />
              <HotTable
                root="hot2"
                data={this.state.summary}
                columns={this.columns0}
                // columnSorting={true}
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
                label="Clear"
                style={this.styles.Clear}
                onClick={this.onClickTableClear}
            />
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.onClickPostIssueSubmit}
            />
            <FloatingActionButton
              mini={true}
              style={this.styles.addMemberButton}
              onClick={this.onClickAddMemberOpen}
              title='要員追加'
            >
              <ContentAdd />
            </FloatingActionButton>
            <FloatingActionButton
              mini={true}
              secondary={true}
              style={this.styles.removeMemberButton}
              onClick={this.onClickRemoveMemberOpen}
              title='要員削除'
            >
              <ContentRemove />
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
              multiple={true}
              floatingLabelText="担当"
              value={this.state.addMemberForm.assigned}
              onChange={this.onChangeAddMember}
              errorText={this.requiredAddMember(this.state.addMemberForm.assigned)}
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
                  secondaryText={this.state.addMemberForm.assigned_name + " , "} />
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
            <Dialog
              title="要員削除"
              actions={actionRemoveSubmit}
              modal={true}
              open={this.state.status === "removeMemberinputing"}
            >
              <SelectField
              multiple={true}
              floatingLabelText="担当"
              value={this.state.removeMemberForm.assigned}
              onChange={this.onChangeRemoveMember}
              errorText={this.requiredRemoveMember(this.state.removeMemberForm.assigned)}
              >
                {this.props.issue_rows.filter(row => row.parent === this.state.id && row.id !== this.state.id).map(row => <MenuItem key={row.assigned_id} value={row.assigned_id} primaryText={row.assigned_name} />)}
              </SelectField><br />
            </Dialog>
            <Dialog
              title="以下の要員を削除して良いですか?"
              actions={actionRemoveConfirm}
              modal={true}
              open={this.state.status==="removeMemberconfirming"}
            >
              <List>
                <ListItem style={this.styles.listItem} disabled={true} primaryText='担当'
                  secondaryText={this.state.removeMemberForm.assigned_name + " , "} />
              </List>
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    )
  }

}
//{this.props.groupUsers.map(group_user => <MenuItem key={group_user.id} value={group_user.id} primaryText={group_user.name} />)}
