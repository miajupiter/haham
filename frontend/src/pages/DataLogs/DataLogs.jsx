import React from 'react'
import { Grid } from '../../components/ui/Grid'
export default function DataLogs() {
  
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Data Logs</h2>
      <div className={'content-block'}>
        <Grid
          // dataSource={customDataSource}
          keyExpr={'_id'}
          columnResizingMode='widget'
          columnAutoWidth={true}
          cacheEnabled={true}
          columns={ [
            {
              dataField: 'logDate',
              caption: 'Date',
              dataType: 'date',
              format: 'yyyy-MM-dd hh:mm:ss',
            },
            { dataField: 'machine.name', caption: 'Machine Name' },
            { dataField: 'status', caption: 'Status' },
            { dataField: 'value', caption: 'Value' },
            {
              dataField: 'transferred',
              caption: 'Transferred',
              
            },
          ]}
        />
        
      </div>
    </React.Fragment>
  )
}

// const priorities = [
//   { name: 'High', value: 4 },
//   { name: 'Urgent', value: 3 },
//   { name: 'Normal', value: 2 },
//   { name: 'Low', value: 1 }
// ]
