import React, { useState, useRef } from 'react'
import CustomStore from 'devextreme/data/custom_store'
import * as api from '../../providers/_api'
import { DataGrid } from 'devextreme-react/data-grid'
import './Grid.scss'
import { t } from '../../utils/translate'
import { toast, Button } from './FormItems'

import { Toolbar, Item } from 'devextreme-react/toolbar'

const pager = {
  allowedPageSizes: [10, 20, 50, 'all'],
  displayMode: 'full',
  showInfo: true,
  showNavigationButtons: true,
  showPageSizeSelector: true,
  visible: true,
  infoText: t('Page {0} of {1} ({2} items)'),
  label: t('Page Navigation'),
}
const sorting = {
  ascendingText: t('Sort Ascending'),
  descendingText: t('Sort Descending'),
  clearText: t('Clear Sorting'),
}

const columnChooser = {
  enabled: true,
  mode: 'drapAndDrop',
  title: t('Column chooser'),
  allowSorting: true,
}

const stateStoring = {
  enabled: true,
  type: 'localStorage',
  storageKey: `dataGrid_${window.location.hash}`,
}

const searchPanel = { visible: true, placeholder: t('Search') }

const editing = {
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
  editRowKey: '_id',
  form: null,
  mode: 'cell',
  newRowPosition: 'first',
  popup: null,
  refreshMode: 'reshape',
  selectTextOnEditStart: true,
  startEditAction: 'dblClick',
  texts: {
    addRow: t('Add a row'),
    cancelAllChanges: t('Discard changes'),
    cancelRowChanges: t('Cancel'),
    confirmDeleteMessage: t('Are you sure you want to delete this record?'),
    confirmDeleteTitle: '',
    deleteRow: t('Delete'),
    editRow: t('Edit'),
    saveAllChanges: t('Save changes'),
    saveRowChanges: t('Save'),
    undeleteRow: t('Undelete'),
    validationCancelChanges: t('Cancel changes'),
  },
  useIcons: true,
}

const toolbar = (
  <Toolbar style={{backgroundColor:'transparent'}}>
    <Item location={'before'} width={'140px'}>
      <input type='date' />
    </Item>
    <Item location={'before'} width={'140px'}>
      <h2>Deneme1 dfdf dfd df</h2>
    </Item>
    <Item location={'before'} width='230'>
      <p>paragraf</p>
    </Item>

    <Item location={'after'} name='addRowButton' />
    <Item name='columnChooserButton' />
  </Toolbar>
)

export function Grid(props = { ...DataGrid.prototype.props }) {
  const [grid, setGrid] = useState()
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  // const [pageCount, setPageCount] = useState(0)
  // const [totalCount, setTotalCount] = useState(0)

  if (props.columns) {
    props.columns.forEach((e) => (e.caption = t(e.caption)))
  }

  // const customDataSource = RestApiDataSource('/dataLog')
  

  const d=new DataGrid()
  // d.instance.showColumnChooser()
  return (
    <>
    {toolbar}
      <Button text='deneme1' onClick={() => {grid.showColumnChooser()}} />
      <DataGrid
        onContentReady={(e)=>setGrid(e.component)}
        keyExpr={'_id'}
        className={'dx-card wide-card bg-transparent'}
        style={{ borderRadius: '8px', width: '100%' }}
        // dataSource={customDataSource}
        highlightChanges={true}
        hoverStateEnabled={true}
        showBorders={true}
        showRowLines={false}
        showColumnLines={false}
        rowAlternationEnabled={true}
        focusedRowEnabled={false}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
        columnResizingMode='widget'
        allowColumnResizing={true}
        allowColumnReordering={true}
        dateSerializationFormat={'yyyy-MM-dd hh:mm:ss'}
        pager={pager}
        paging={{
          enabled: true,
          pageIndex: pageIndex,
          pageSize: pageSize,
        }}
        scrolling={{ mode: 'standard', showScrollbar: true }}
        remoteOperations={true}
        sorting={sorting}
        columnChooser={columnChooser}
        stateStoring={stateStoring}
        loadPanel={null}
        searchPanel={searchPanel}
        noDataText={t('No data')}
        keyboardNavigation={{
          enterKeyAction: 'moveFocus',
          enabled: true,
          enterKeyDirection: 'column',
        }}
        repaintChangesOnly={true}
        selection={{
          allowSelectAll: true,
          showCheckBoxesMode: 'always',
          selectAllMode: 'page',
          mode: 'multiple',
          // mode: 'single',
          deferred: false,
        }}
        wordWrapEnabled={true}
        height={'100%'}
        width={'100%'}
        // filterRow={{ visible: true }}
        headerFilter={{ visible: true }}
        // toolbar={{
        //   visible:true,
        //   items:[
        //     {name:'columnChooserButton', location:'before'},
        //     {template:()=><ToolbarItem width={150}><div>Deneme1</div></ToolbarItem>, width:220},
        //     {name:'addRowButton', },

        //   ]
        // }}
        editing={editing}
        {...props}
      >
        {/* {toolbar} */}
      </DataGrid>
    </>
  )
}

export function RestApiDataSource(func, key = '_id') {
  return new CustomStore({
    key: key,
    load: (loadOptions) => {
      console.log('loadOptions:', loadOptions)
      let params = {
        page: 1,
        pageSize: 10,
      }
      if (loadOptions) {
        if (loadOptions.take) params.pageSize = loadOptions.take
        if (loadOptions.skip) {
          params.page = Math.round(loadOptions.skip / params.pageSize) + 1
        }
      }

      return api
        .getData(`${func}`, { params: params })
        .then((response) => {
          return {
            data: (response.data && response.data.docs) || response.data || [],
            totalCount: (response.data && response.data.recordCount) || 0,
          }
        })
        .catch((err) => toast(err, 'error'))
    },
    insert: (values) => {
      console.log('insert values:', values)
      return api
        .post(`${func}`, { data: values })
        .then((resp) => {
          toast('Successful', 'success')
          console.log('insert resp:', resp)
          return resp.data
        })
        .catch((err) => toast(err, 'error'))
    },
    update: (key, values) => {
      console.log('update key, values:', key, values)
      return api
        .put(`${func}/${key}`, { data: values })
        .then((resp) => {
          toast('Successful', 'success')
          console.log('update resp:', resp)
          return resp.data
        })
        .catch((err) => toast(err, 'error'))
    },
    remove: (key) => {
      console.log('delete key:', key)
      return api
        .remove(`${func}/${key}`)
        .then((resp) => {
          toast('Successful', 'success')
          console.log('remove resp:', resp)
          return true
        })
        .catch((err) => toast(err, 'error'))
    },
  })
}


export function RestApiLookupSource(func, key = '_id') {
  return new CustomStore({
    key: key,
    loadMode:'raw',
    load: (loadOptions) => {
      let params = {
        page: 1,
        pageSize: 1000,
      }
      if (loadOptions) {
        if (loadOptions.take) params.pageSize = loadOptions.take
        if (loadOptions.skip) {
          params.page = Math.round(loadOptions.skip / params.pageSize) + 1
        }
      }

      return api
        .getData(`${func}`, { params: params })
        .then((response) => {
          return (response.data && response.data.docs) || response.data || []
          // return {
          //   data: (response.data && response.data.docs) || response.data || [],
          //   totalCount: (response.data && response.data.recordCount) || 0,
          // }
        })
        .catch((err) => toast(err, 'error'))
    }
   
  })
}