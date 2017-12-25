import React from 'react'
import {Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn,
        Toggle} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Body1= ({issue_rows, onToggleHide, onCheck, onToggleIssueHide}) => {

  const styles = {
    toggle: {
      maxWidth: 250,
      margin: 16,
    },
  }

  const _onCheck = index => {
    console.log(index)
    // index === undefined ? onCheck() : onCheck(issue_rows[index].id)
  }

  const _onToggleIssueHide = (event, value) => {
    console.log(event);
  }

  //return
  return (
   <MuiThemeProvider>
     <Toggle
       label="非表示案件を表示する"
       style={styles.toggle}
       onToggle={() => onToggleHide()}
     />
   <Table fixedHeader={true} onRowSelection={index => _onCheck(index[0])}>
       <TableHeader>
          <TableRow>
            <TableHeaderColumn style={{ width: '3%'}}>ID</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>分類</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '17%'}}>案件管理番号</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '15%'}}>タスクコード</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '15%'}}>サブコード</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '30%'}}>案件名称</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>見積</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '10%'}}>非表示</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={true} displayRowCheckbox={true} >
          {issue_rows.map(issue_row => {
            return (
              <TableRow key={issue_row.id} >
                <TableRowColumn style={{ width: '3%'}}>{issue_row.id}</TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}>{issue_row.kind}</TableRowColumn>
                <TableRowColumn style={{ width: '17%'}}>{issue_row.ankenno}</TableRowColumn>
                <TableRowColumn style={{ width: '15%'}}>{issue_row.taskcode}</TableRowColumn>
                <TableRowColumn style={{ width: '15%'}}>{issue_row.subcode}</TableRowColumn>
                <TableRowColumn style={{ width: '30%'}}>{issue_row.ankenname}</TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}>{issue_row.estimate}</TableRowColumn>
                <TableRowColumn style={{ width: '10%'}}><Toggle onToggle={(event, value) => _onToggleIssueHide(event, value)}/></TableRowColumn>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </MuiThemeProvider>
  )
}

export default Body1

// key={["id", issue_row.id]}
// key={["kind", issue_row.id]}
// key={["ankenno", issue_row.id]}
// key={["taskcode", issue_row.id]}
// key={["subcode", issue_row.id]}
// key={["ankenname", issue_row.id]}
// key={["estimate", issue_row.id]}
// key={["hide", issue_row.id]}
