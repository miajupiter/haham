import React from 'react'
import { MJGrid, Column } from '../../components/ui/Grid'
export default function DataLogs() {
  return (
    <React.Fragment>
      <h2 className={'content-block'}>Data Logs</h2>
      <div className={'content-block'}>
        <MJGrid
          // dataSource={customDataSource}
          // columns={[
          //   new Column({ dataField: 'logDate', caption:''  }),
          //   'machine.name',
          //   'status',
          //   'value',
          //   'transferred',
          // ]}
          
        >
          <Column
            dataField={'logDate'}
            width={120}
            dataType={'date'}
            caption={'Date'}
            format={'yyyy-MM-dd hh:mm:ss'}
          />

          <Column
            dataField={'machine.name'}
            width={190}
            caption={'Machine Name'}
          />
          <Column dataField={'status'} caption={'Status'} />

          <Column
            dataField={'transferred'}
            caption={'Transferred'}
            dataType={'boolean'}
          />
        </MJGrid>
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
