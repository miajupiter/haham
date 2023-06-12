import React from 'react'
import { Grid, RestApiDataSource, RestApiLookupSource } from '../../components/ui/Grid'
export default function DataLogs() {
  
  // const dataSource=RestApiDataSource('/dataLog')

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Data Logs</h2>
      <div className={'content-block'}>
        <Grid
          dataSource={RestApiDataSource('/dataLog')}
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
            { dataField: 'machine', caption: 'Machine', lookup:{
              displayExpr:'name', valueExpr:'_id',
              dataSource: RestApiLookupSource('/machine')
            }},
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
