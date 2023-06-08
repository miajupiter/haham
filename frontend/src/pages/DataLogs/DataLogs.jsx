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
  const [pageSize, setPageSize] = useState(50)
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

  const customDataSource = new CustomStore({
    key: '_id',
    // keyType: 'string',
    // loadMode: 'raw',
    // jsonp: true,

    load: (loadOptions) => {
      console.log('loadOptions:', loadOptions)
      let params = {
        page: pageIndex + 1,
        pageSize: pageSize,
      }
      if (loadOptions) {
        if (loadOptions.take) params.pageSize = loadOptions.take
        if (loadOptions.skip) {
          params.page = Math.round(loadOptions.skip / params.pageSize) + 1
        }
      }

      return api
        .getData('/dataLog', {
          params: params,
          // params: { page: pageIndex + 1, pageSize: pageSize },
        })
        .then((response) => {
          let obj = {
            data: response.data && response.data.docs,
            totalCount: response.data && response.data.recordCount,
          }
          setTotalCount(response.data.recordCount)

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
      <div className={'content-block'}>
        <DataGrid
          // ref={gridRef}
          className={'dx-card wide-card'}
          dataSource={customDataSource}
          highlightChanges={true}
          hoverStateEnabled={true}
          showBorders={true}
          showRowLines={false}
          showColumnLines={false}
          rowAlternationEnabled={true}
          focusedRowEnabled={false}
          // defaultFocusedRowIndex={0}
          columnAutoWidth={true}
          columnHidingEnabled={true}
          columnResizingMode='widget'
          allowColumnResizing={true}
          // dateSerializationFormat={'yyyy-MM-dd hh:mm:ss'}
          pager={{
            allowedPageSizes: [10, 20, 50, 'all'],
            displayMode: 'full',
            showInfo: true,
            showNavigationButtons: true,
            showPageSizeSelector: true,
            visible: true,
            infoText: t('Page {0} of {1} ({2} items)'),
            label: t('Page Navigation'),
          }}
          paging={{
            enabled: true,
            pageIndex: pageIndex,
            pageSize: pageSize,
          }}
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
          // bindingOptions={}
          allowColumnReordering={true}
          sorting={{
            ascendingText: t('Sort Ascending'),
            descendingText: t('Sort Descending'),
            clearText: t('Clear Sorting'),
          }}
          style={{ borderRadius: '15px', width: '100%' }}
          columnChooser={{
            enabled: true,
            // mode: 'select',
            mode: 'drapAndDrop',
            title: t('Column chooser'),
            // allowSearch: true,
            allowSorting: true,
          }}
          stateStoring={{
            enabled: true,
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
            enterKeyDirection: 'column',
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
          wordWrapEnabled={false}
          height={'auto'}
          filterRow={{ visible: true }}
          headerFilter={{ visible: true }}
          toolbar={{visible:true,items:['exportButton','addRowButton','columnChooserButton','revertButton','saveButton','groupPanel']}}
        
          editing={{
            allowAdding: true,
            allowDeleting: true,
            allowUpdating: true,
            // changes: {
            //   data: null,
            //   insertAfterKey: null,
            //   insertBeforeKey: null,
            //   key: null,
            //   type: null,
            // },
            confirmDelete: true,
            editColumnName: null,
            editRowKey: null,
            form: null,
            mode: 'row',
            newRowPosition: 'last',
            popup: null,
            refreshMode: 'reshape',
            selectTextOnEditStart: false,
            startEditAction: 'dblClick',
            texts: {
              addRow: t('Add a row'),
              cancelAllChanges: t('Discard changes'),
              cancelRowChanges: t('Cancel'),
              confirmDeleteMessage:
                t('Are you sure you want to delete this record?'),
              confirmDeleteTitle: '',
              deleteRow: t('Delete'),
              editRow: t('Edit'),
              saveAllChanges: t('Save changes'),
              saveRowChanges: t('Save'),
              undeleteRow: t('Undelete'),
              validationCancelChanges: t('Cancel changes'),
            },
            useIcons: true,
          }}
        >
          {/* <FilterRow visible={true}  /> */}

          {/* <Column dataField={'Task_ID'} width={90} hidingPriority={2} /> */}
          <Column
            dataField={'logDate'}
            width={120}
            dataType={'date'}
            caption={t('Date')}
            format={'yyyy-MM-dd hh:mm:ss'}
            hidingPriority={3}
            allowHeaderFiltering={true}
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
