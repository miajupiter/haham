import React, { useEffect, useState } from 'react'
import { HahamLayout } from '@/components/Layouts/HahamLayout'
import { useRouter } from 'next/router'

import 'devextreme/data/odata/store'
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid'
import CustomStore from 'devextreme/data/custom_store'
// import 'whatwg-fetch'

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== ''
}

const store = new CustomStore({
  key: 'OrderNumber',
  load(loadOptions) {
    let params = '?'
    ;[
      'skip',
      'take',
      'requireTotalCount',
      'requireGroupCount',
      'sort',
      'filter',
      'totalSummary',
      'group',
      'groupSummary',
    ].forEach((i) => {
      if (i in loadOptions && isNotEmpty(loadOptions[i])) {
        params += `${i}=${JSON.stringify(loadOptions[i])}&`
      }
    })
    params = params.slice(0, -1)
    return fetch(
      `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`
    )
      .then((response) => response.json())
      .then((data) => ({
        data: data.data,
        totalCount: data.totalCount,
        summary: data.summary,
        groupCount: data.groupCount,
      }))
      .catch(() => {
        throw new Error('Data Loading Error')
      })
  },
})

const allowedPageSizes = [8, 12, 20]

export const DashboardPage = () => {
  const [result, setResult] = useState([])
  const query = useRouter().query

  console.log('query:', query)

  useEffect(() => {}, [query])

  return (
    <React.Fragment>
      <HahamLayout>
        <h1>Dashboard</h1>
        <hr />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae aut,
          tenetur illum soluta quaerat accusantium reprehenderit error optio
          suscipit aperiam tempora qui consectetur totam unde fugit, fuga odit
          alias rem.
        </p>
        <DataGrid dataSource={store} showBorders={true} remoteOperations={true}>
          <Column dataField='OrderNumber' dataType='number' />
          <Column dataField='OrderDate' dataType='date' />
          <Column dataField='StoreCity' dataType='string' />
          <Column dataField='StoreState' dataType='string' />
          <Column dataField='Employee' dataType='string' />
          <Column dataField='SaleAmount' dataType='number' format='currency' />
          <Paging defaultPageSize={12} />
          <Pager
            showPageSizeSelector={true}
            allowedPageSizes={allowedPageSizes}
          />
        </DataGrid>
      </HahamLayout>
    </React.Fragment>
  )
}

export default DashboardPage
