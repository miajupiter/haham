/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
// import 'devextreme/data/odata/store'
import ODataStore from 'devextreme/data/odata/store'
import CustomStore from 'devextreme/data/custom_store'
import * as api from '../../providers/_api'

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Lookup,
  Label,
} from 'devextreme-react/data-grid'
import './DataLogs.scss'
import { t } from '../../utils/translate'

export default function DataLogs() {
  // const gridRef = useRef(null)
  const [pageIndex, setPageIndex] = useState(0) // 0 based page number
  const [pageSize, setPageSize] = useState(5)
  const [pageCount, setPageCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  // [
  //   'filter',
  //   'group',
  //   'groupSummary',
  //   'parentIds',
  //   'requireGroupCount',
  //   'requireTotalCount',
  //   'searchExpr',
  //   'searchOperation',
  //   'searchValue',
  //   'select',
  //   'sort',
  //   'skip',
  //   'take',
  //   'totalSummary',
  //   'userData'
  // ]

  var customDataSource = new CustomStore({
    key: '_id',
    // keyType: 'string',
    // loadMode: 'raw',
    // jsonp: true,

    load: (loadOptions) => {
      console.log('loadOptions:', loadOptions)
      let params= {
        page: pageIndex + 1,
        pageSize: pageSize,
      }
      if (loadOptions) {
        if (loadOptions.take) params.pageSize=loadOptions.take
        if (loadOptions.skip) {
          params.page=Math.round(loadOptions.skip / params.pageSize)+1
        }
      }


      return api
        .getData('/dataLog', {
          params:params,
          // params: { page: pageIndex + 1, pageSize: pageSize },
        })
        .then((response) => {
          let obj = {
            data: response.data && response.data.docs,
            totalCount: response.data && response.data.recordCount,
            // pageCount: response.data.pageCount,
            // pageSize: response.data.pageSize,
            // pageIndex: response.data.page - 1,
            //take:response.data.pageSize,
            //skip:(response.data.page - 1) * response.data.pageSize,
          }
          //   console.log('sonuc:', obj)
          // setPageIndex(response.data.page - 1)
          // setPageSize(response.data.pageSize)
          // setPageCount(response.data.pageCount)
          // setTotalCount(response.data.recordCount)

          return obj
          // return response.data.docs
        })
        .catch(() => {
          throw 'Network error'
        })
    },
    // beforeSend(e) {
    //   // e.params = {}
    //   e.headers = { token: localStorage.getItem('token') || '' }
    // },
  })

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Data Logs</h2>
      <p className={'content-block'}>
        pageIndex:{pageIndex} , pageSize:{pageSize} , totalCount:{totalCount}
      </p>
      <div className={'content-block'}>
        <DataGrid
          // ref={gridRef}
          className={'dx-card wide-card'}
          dataSource={customDataSource}
          focusedRowEnabled={true}
          defaultFocusedRowIndex={0}
          columnAutoWidth={false}
          columnHidingEnabled={true}
          columnResizingMode='widget'
          allowColumnResizing={true}
          // dateSerializationFormat={'yyyy-MM-dd hh:mm:ss'}
          pager={{
            allowedPageSizes: [5, 10, 20, 50, 'all'],
            displayMode: 'full',
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true,
            infoText: t('Page {0} of {1} ({2} items)'),
            label: t('Page Navigation'),

          }}
          highlightChanges={true}
          hoverStateEnabled={true}
          // paging={{
          //   enabled: true,
          //   pageIndex: pageIndex,
          //   pageSize: pageSize,
          // }}
          // onPagingChange={(e,d) => {
          //   console.log('onPagingChange e:', e,d)
          // }}
          onContentReady={(e) => {
            // // console.log(new Date().toISOString(),'e:', e.component.totalCount())
            // console.log('onContentReady e.component.pageCount()', e.component.pageCount())
            // console.log('onContentReady e.component.totalCount()', e.component.totalCount())
            // console.log('onContentReady e.component.pageIndex()', e.component.pageIndex())
            // console.log('onContentReady e.component.pageSize()', e.component.pageSize())
          }}
          // remoteOperations={true} // except group paging
          remoteOperations={{
            paging: true,
            filtering: true,
            sorting: true,
          }}
          showBorders={true}
          showRowLines={true}
          showColumnLines={true}
          // bindingOptions={}
          allowColumnReordering={true}
          sorting={{
            ascendingText: t('Sort Ascending'),
            descendingText: t('Sort Descending'),
            clearText: t('Clear Sorting'),
          }}
          style={{ borderRadius: '5px', width: '100%' }}
          columnChooser={{
            enabled: true,
            // mode: 'select',
            mode: 'drapAndDrop',
            title: t('Column chooser'),
            // allowSearch: true,
            allowSorting: true,
          }}
          stateStoring={{
            enabled: false,
            type: 'localStorage',
            storageKey: `dataGrid_${window.location.hash}`,
          }}
          loadPanel={null}
          //   stateStoring={{ enabled: true, storageKey: 'DataLogs_grid' }}
          searchPanel={{ visible: true, placeholder: t('Search') }}
          noDataText={t('No data')}
          keyboardNavigation={{
            enterKeyAction: 'moveFocus',
            enabled: true,
            enterKeyDirection: 'row',
          }}
          // onPagingChange={(val) => {
          //   console.log('onPagingChange', val)
          // }}
          repaintChangesOnly={true}
          selection={{
            allowSelectAll: true,
            showCheckBoxesMode: 'always',
            selectAllMode: 'page',
            mode: 'multiple',
          }}
          wordWrapEnabled={true}
        >
          <Paging
            defaultPageIndex={0}
            defaultPageSize={5}
            // pageIndex={pageIndex}
            // pageSize={pageSize}
            onPageIndexChange={(e) => {
              console.log('onPageIndexChange e:', e)
            //  setPageIndex(e)
              // customDataSource.load({ pageIndex: e })
            }}
            onPageSizeChange={(e) => {
              console.log('onPageSizeChange e:', e)
              // setPageIndex(0)
              // setPageSize(e)
              //customDataSource.load()
            }}
            enabled={true}
            // ref={gridRef}
          />

          {/* <Pager
            allowedPageSizes={[5, 10, 20, 50, 'all']}
            showPageSizeSelector={true}
            showInfo={true}
            displayMode={'full'}
            visible={true}
            showNavigationButtons={true}
            infoText={t('Page {0} of {1} ({2} items)')}
            label={t('Page Navigation')}
          /> */}
          <FilterRow visible={false} />

          {/* <Column dataField={'Task_ID'} width={90} hidingPriority={2} /> */}
          <Column
            dataField={'logDate'}
            width={120}
            dataType={'date'}
            caption={t('Date')}
            format={'yyyy-MM-dd hh:mm:ss'}
            hidingPriority={3}
            allowHeaderFiltering={true}
            name={'tarih'}
          />
          <Column
            dataField={'_id'}
            width={100}
            caption={t('ID')}
            hidingPriority={2}
          />
          <Column
            dataField={'machine.name'}
            width={190}
            caption={t('Machine Name')}
            hidingPriority={8}
          />
          <Column
            dataField={'status'}
            caption={t('Status')}
            hidingPriority={6}
          />
          <Column
            dataField={'value'}
            caption={t('Value')}
            dataType={'number'}
            hidingPriority={6}
          />
          <Column
            dataField={'transferred'}
            caption={t('Transferred')}
            dataType={'boolean'}
            hidingPriority={6}
          />
        </DataGrid>
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
