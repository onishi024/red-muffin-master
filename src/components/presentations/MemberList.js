import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'

const MemberList = ({show_hided_issue, issue_rows, selected_group_id, selected_year, current_id, group_users
                    // onToggleHide, onToggleIssueHide, onoffSnackBar, getIssue_rows
                  }) => {

  const rowData = (issue_rows, group_users) => {
    const sum_rows = issue_rows.reduce((result, current) => {
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

  //カラムヘッダー定義
  const colHeaders = ["#", "種別", "所属", "氏名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義
  const columns = [
    { data: 'assigned_id', editor: false, readOnly: true },
    { data: 'category', editor: false, readOnly: true },
    { data: 'grade', editor: false, readOnly: true },
    { data: 'assigned_name', editor: false, readOnly: true },
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

  return(
    <MuiThemeProvider>
      <div>
        <div style={styles.path}><Link to={`/`}>Home</Link>> 要員別山積表</div>
        <div style={styles.hot}>
          <HotTable
            root="hot"
            data={rowData(issue_rows, group_users)}
            colHeaders={colHeaders}
            columns={columns}
            columnSorting={true}
            width="1000"
            stretchH="all"
            fixedColumnsLeft="3"
            manualColumnResize={true}
          />
        </div>

      </div>
    </MuiThemeProvider>
  )
}

export default MemberList

// data={(issue_rows, group_users) => rowData(issue_rows, group_users)}


// <div style={styles.hot}>
//   <HotTable
//     floatingLabelText={<span style={{fontSize: 16}}>要員計画</span>}
//     root="hot"
//     data=""
//     colHeaders={colHeaders}
//     columns={columns}
//     columnSorting={true}
//     width="1000"
//     stretchH="all"
//     fixedColumnsLeft="3"
//     manualColumnResize={true}
//   />
// </div>
//

// <Table fixedHeader={true} >
//   <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
//     <TableRow>
//       <TableHeaderColumn style={{ width: '5%'}}>ID</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '15%'}}>案件管理番号</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '15%'}}>内部管理番号</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '25%'}}>案件名称</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>主担当</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>見積</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>詳細</TableHeaderColumn>
//       <TableHeaderColumn style={{ width: '10%'}}>表示</TableHeaderColumn>
//     </TableRow>
//   </TableHeader>
// </Table>
