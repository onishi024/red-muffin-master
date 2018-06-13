import React from 'react'
import {Divider} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'

const MemberList = ({show_hided_issue, issue_rows, selected_group_id, selected_year, current_id, group_users, assigned_projectlist_open, selected_member,
                    onoffAssignedProjectList, setSelectedMember
                  }) => {

  const rowData1 = (issue_rows, group_users) => {
    const _issue_rows = issue_rows.filter(issue_row => issue_row.parent !== issue_row.id)
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
      return result
    },[])
    return sum_rows
  }

  const rowData2 = (issue_rows, selected_member) => {
    const _issue_rows = issue_rows.filter(issue_row => issue_row.parent !== issue_row.id)
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

    return assigned_projects.concat(sum_rows)
  }

  const styles = {
    path: {
      margin: 12,
      fontSize: 12,
      color: "#9E9E9E",
    },
    hot: {
      margin: 12,
      fontSize: 12,
    }
  }

  //カラムヘッダー定義_要員別山積
  const colHeaders1 = ["氏名", "所属", "種別",
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

  //カラムヘッダー定義_要員別集計
  const colHeaders2 = ["案件番号", "案件名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラム幅定義_要員別集計
  const colwidths2 = [80, 380, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]

  //カラムデータ定義_要員別集計
  const columns2 = [
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
    setSelectedMember(rowData1(issue_rows, group_users)[r]['assigned_id'])
  }

  const hotTable1 = [
    <div style={styles.hot}>
      <HotTable
        root="hot1"
        data={rowData1(issue_rows, group_users)}
        colHeaders={colHeaders1}
        colWidths={colwidths1}
        width="1200"
        columns={columns1}
        columnSorting={true}
        stretchH="all"
        manualColumnResize={true}
        afterSelectionEnd={onSelect}
        fillHandle={false}
      />
    </div>,
  ]

  const hotTable2 = [
    <div style={styles.hot}>
      <HotTable
        root="hot2"
        data={rowData2(issue_rows, selected_member)}
        colHeaders={colHeaders2}
        colWidths={colwidths2}
        width="1200"
        columns={columns2}
        columnSorting={true}
        stretchH="all"
        manualColumnResize={true}
        fillHandle={false}
        // mergeCells={[
        //   {row:0, col:0, rowspan:issue_rows.filter(issue_row => issue_row.assigned_id === selected_member && issue_row.parent !== issue_row.id).length, colspan:1},
        //   {row:0, col:1, rowspan:issue_rows.filter(issue_row => issue_row.assigned_id === selected_member && issue_row.parent !== issue_row.id).length, colspan:1}
        // ]}
      />
    </div>,
  ]

  return(
    <MuiThemeProvider>
      <div>
        <div style={styles.path}><Link to={`/`}>Home</Link>> 要員別山積表</div>
        <div style={styles.path}>要員別集計</div>
          {hotTable1}
          <Divider/>
        <div style={styles.path}>要員別山積</div>
          {hotTable2}
      </div>
    </MuiThemeProvider>
  )
}

export default MemberList
