import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import HotTable from 'react-handsontable'
import { Link } from 'react-router-dom'

const Member = ({issue_rows, selected_member}) => {
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

  const rowData2 = (issue_rows, selected_member) => {
    const assigned_projects = issue_rows.filter(issue_row => issue_row.assigned_id === selected_member)

    const sum_rows = assigned_projects.reduce((result, current) => {
      let element = result
      if (element.length === 0) {
        result.push({...current})
        result[0].title = "集計"
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

  const hotTable2 = [
    <div style={styles.hot}>
      <HotTable
        root="hot"
        data={rowData2(issue_rows, selected_member)}
        colHeaders={colHeaders2}
        columns={columns2}
        columnSorting={true}
        width="1000"
        stretchH="all"
        manualColumnResize={true}
      />
    </div>,
  ]

  //カラムヘッダー定義_要員別集計
  const colHeaders2 = ["#", "氏名", "案件名",
    '4月' , '5月','6月', '7月', '8月', '9月',
    '10月', '11月', '12月', '1月', '2月', '3月']

  //カラムデータ定義_要員別集計
  const columns2 = [
    { data: 'assigned_id', editor: false, readOnly: true },
    { data: 'assigned_name', editor: false, readOnly: true },
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

  return(
    <MuiThemeProvider>
      <div>
        <div>要員別集計情報</div>
        {hotTable2}
      </div>
    </MuiThemeProvider>
  )
}

export default Member
