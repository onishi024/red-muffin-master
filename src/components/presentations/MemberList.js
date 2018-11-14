import React from 'react'
import {Divider, Toggle, FlatButton} from 'material-ui'
// import { Divider } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'
import {Table, TableHeader, TableBody, TableFooter, TableRow, TableHeaderColumn, TableRowColumn,
         IconButton, FloatingActionButton, Snackbar} from 'material-ui'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';

const MemberList = ({show_hided_issue, parent_issue_rows, sub_issue_rows, selected_group_id, selected_year, current_id, group_users, assigned_projectlist_open, selected_member,
                    onoffAssignedProjectList, setSelectedMember, onToggleHidem, setTransitionIssue, transition_issue
                  }) => {
  const rowData1 = (sub_issue_rows, group_users) => {
    //表示対象の絞込み
    const _issue_rows = sub_issue_rows.filter(issue_row => issue_row.parent !== issue_row.id)
    const sum_rows = _issue_rows.reduce((result, current) => {
      let element = result.filter((p) => p.assigned_id === current.assigned_id)
      if (element.length === 0) {
        // 読み込んだチケットの担当者に紐付く集計レコードが存在しない場合
        // 集計レコードを新たに作成する
        const grade = group_users.filter(group_users => group_users.id === current.assigned_id)[0] ?
                        group_users.filter(group_users => group_users.id === current.assigned_id)[0].grade : ""
        const category = grade.substring(0,1) === 'G' || grade.substring(0,1) === 'M' ? 'プロパー' : 'BP'
        result.push({
          grade: grade,
          category: category,
          assigned_name: '<Link to={/issue_edit/${' + current.assigned_id + '}}>' + current.assigned_name + '</Link>',
          ...current
        })
      } else {
        // 読み込んだチケットの担当者に紐付く集計レコードが存在する場合
        // 既存の集計レコードに読み込んだチケットの見積工数を加算する
        element[0].es04 += current.es04
        element[0].es05 += current.es05
        element[0].es06 += current.es06
        element[0].es07 += current.es07
        element[0].es08 += current.es08
        element[0].es09 += current.es09
        element[0].es10 += current.es10
        element[0].es11 += current.es11
        element[0].es12 += current.es12
        element[0].es01 += current.es01
        element[0].es02 += current.es02
        element[0].es03 += current.es03
      }
      //種別＋グレード順にソート
      result.sort(function(a, b) {
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
          else  {
            return 0;
          }
        }
      });
      return result
    },[])
    return sum_rows
  }

  const rowData2 = (sub_issue_rows, selected_member) => {
    //表示対象の絞込み
    // const hided_parent_issue_rows = show_hided_issue ? parent_issue_rows : parent_issue_rows.filter(issue_row => issue_row.hide === false)
    // console.log("sub_issue_rows:",sub_issue_rows);
    // const __issue_rows = sub_issue_rows.map(issue_row => {
    //   // console.log("hided_parent_issue_rows:",hided_parent_issue_rows);
    //   // console.log("filtered hided_parent_issue_rows:",hided_parent_issue_rows.filter((parent, issue_row) => parent.id === issue_row.parent));
    //   const hided = hided_parent_issue_rows.map(parent => {
    //     if(parent.id === issue_row.parent){
    //       return true
    //     } else {
    //       return false
    //     }
    //   },issue_row)
    //
    //   if(hided === false){
    //     return issue_row
    //   }
    // }, hided_parent_issue_rows)
    // console.log("__issue_rows:",__issue_rows);
    const _issue_rows = sub_issue_rows.filter(issue_row => issue_row.parent !== issue_row.id)
    const assigned_projects = _issue_rows.filter(issue_row => issue_row.assigned_id === selected_member)
    return assigned_projects
  }

  const rowData3 = (sub_issue_rows, selected_member) => {
    //表示対象の絞込み
    const _issue_rows = sub_issue_rows.filter(issue_row => issue_row.parent !== issue_row.id)
    const assigned_projects = _issue_rows.filter(issue_row => issue_row.assigned_id === selected_member)

    const sum_rows = assigned_projects.reduce((result, current) => {
      let element = result
      if (element.length === 0) {
        result.push({...current})
        result[0].ankenno = "集計"
        result[0].title = "-  "
      } else {
        element[0].es04 += current.es04
        element[0].es05 += current.es05
        element[0].es06 += current.es06
        element[0].es07 += current.es07
        element[0].es08 += current.es08
        element[0].es09 += current.es09
        element[0].es10 += current.es10
        element[0].es11 += current.es11
        element[0].es12 += current.es12
        element[0].es01 += current.es01
        element[0].es02 += current.es02
        element[0].es03 += current.es03
      }
      return result
    },[])
    return sum_rows
  }
  const styles = {
    tableName1: {
      marginTop: "50px",
      paddingTop: "73px",
      marginBottom:"-90px",
      marginLeft:12,
      fontSize: 12,
      color: "#9E9E9E",
    },
    tableName2: {
      marginTop: "-50px",
      paddingTop: "73px",
      marginBottom:"-90px",
      marginLeft:12,
      fontSize: 12,
      color: "#9E9E9E",
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
      bottom: 20,
      position: "fixed",
      zIndex: 1,
    },
    hot: {
      marginTop: 100,
      marginBottom: 20,
      marginLeft: 12,
      fontSize: 12,
    },
    hot2: {
      fontSize: 12,
    },
    hot3: {
      fontSize: 12,
      backgroundColor: "#B2EBF2",
    },
    float: {
      marginTop: "-15px",
      paddingTop: "73px",
      marginBottom:"-90px",
      marginLeft:1160,
      // position: "fixed"
    },
  }

  //カラムヘッダー定義_要員別集計
  const colHeaders1 = ["氏名", "種別", "グレード/所属",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

　//カラム幅定義_要員別集計
  const colwidths1 = [220, 120, 120, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]

  //カラムデータ定義_要員別山積
  const columns1 = [
    { data: 'assigned_name', editor: false, readOnly: true },
    { data: 'category', editor: false, readOnly: true },
    { data: 'grade', editor: false, readOnly: true },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true }
  ]

  //カラムヘッダー定義_要員別山積
  const colHeaders2 = ["案件番号", "案件名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラム幅定義_要員別集計
  const colwidths2 = [80, 380, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]

  //カラムデータ定義_要員別集計
  const columns2 = [
    { data: 'ankenno', editor: false, readOnly: true },
    { data: 'title', editor: false, readOnly: true, },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true }
  ]

  //カラムデータ定義_要員別集計
  const columns3 = [
    { data: 'ankenno', editor: false, readOnly: true },
    { data: 'title', editor: false, readOnly: true },
    { data: 'es04', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es05', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es06', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es07', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es08', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es09', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es10', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es11', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es12', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es01', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es02', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true },
    { data: 'es03', type: 'numeric', allowInvalid: false, format: '0.00', readOnly: true }
  ]

  const onSelect = (r) => {
    setSelectedMember(rowData1(sub_issue_rows, group_users)[r]['assigned_id'])
    setTransitionIssue(null)
  }

  const selectCell = (row, column, row2, column2, selectionLayerLevel) => {
    if(selected_member !==  null) {
      let transitionId = (row2 - row === 0) ? rowData2(sub_issue_rows, selected_member)[row]['parent'] : null
      setTransitionIssue(transitionId)
    }
  }

  const EditIcon = () => {
    return (
      <IconButton
        tooltip="SVG Icon"
        disabled={transition_issue !== null ? false : true}>
      <ModeEdit />
      </IconButton>
    )
  }

  const hotTable1 = [
    <div style={styles.hot}>
      <HotTable
        root="hot1"
        data={rowData1(sub_issue_rows, group_users)}
        colHeaders={colHeaders1}
        colWidths={colwidths1}
        width="1200"
        columns={columns1}
        // columnSorting={true}
        stretchH="all"
        afterSelectionEnd={onSelect}
        fillHandle={false}
      />
    </div>,
  ]

  const hotTable2 = [
    <div style={styles.hot2}>
      <HotTable
        root="hot2"
        data={rowData2(sub_issue_rows, selected_member)}
        colHeaders={colHeaders2}
        colWidths={colwidths2}
        width="1200"
        columns={columns2}
        columnSorting={true}
        stretchH="all"
        fillHandle={false}
        afterSelectionEnd={selectCell}
      />
    </div>,
  ]

  const hotTable3 = [
    <div style={styles.hot2}>
      <HotTable
        root="hot3"
        data={rowData3(sub_issue_rows, selected_member)}
        colWidths={colwidths2}
        width="1200"
        columns={columns3}
        columnSorting={true}
        stretchH="all"
        fillHandle={false}
        />
    </div>,
  ]

  const toolbar_style = {

    height:45,
    width: '100%',
    top: 60,
    left:0,
    backgroundColor: "#FFFFFF",
    position: "fixed",
    zIndex:999

  }

  return(
    <MuiThemeProvider>
      <div>
        <Toolbar style={toolbar_style}>
          <ToolbarGroup style={styles.path}>
          <Link to={`/`}>Home</Link> > 要員別山積表
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.tableName1}>要員別集計</div>
          {hotTable1}
          <Divider/>
        <div style={styles.tableName2}>要員別山積</div>

        <div style={styles.float}>
        <Link to={transition_issue !== null ? `/issue_edit/${transition_issue}` : `/member`}>
        <EditIcon />
        </Link>
        </div>
        <div style={styles.hot} disabeld={true}>
          {hotTable2}
          {hotTable3}
        </div>
      </div>
    </MuiThemeProvider>
  )
}

export default MemberList

// <Toggle
//   style={styles.toggle}
//   thumbStyle={styles.toggle_icon}
//   trackStyle={styles.toggle_icon}
//   toggled={show_hided_issue}
//   onToggle={() => onToggleHide()}
//   title="非表示案件を表示/非表示切り替え" />
