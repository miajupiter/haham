import React, { useState } from 'react'
import CustomStore from 'devextreme/data/custom_store'
import * as api from '../../providers/_api'
import * as DxGrid from 'devextreme-react/data-grid'
import './Grid.scss'
import { t } from '../../utils/translate'
import { PropTypes } from 'prop-types'
import { Button } from './FormItems'

export { default as DxGrid } from 'devextreme-react/data-grid'

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
  // mode: 'select',
  mode: 'drapAndDrop',
  title: t('Column chooser'),
  // allowSearch: true,
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
  editRowKey: null,
  form: null,
  mode: 'row',
  newRowPosition: 'last',
  popup: null,
  refreshMode: 'repaint',
  selectTextOnEditStart: false,
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

export function Grid(props = { ...DxGrid.DataGrid.prototype.props }) {
  const [pageIndex, setPageIndex] = useState(0) // 0 based page number
  const [pageSize, setPageSize] = useState(10)
  const [pageCount, setPageCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)

  if (props.columns) {
    props.columns.forEach((e) => (e.caption = t(e.caption)))
  }
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
        .getData('/dataLog', { params: params })
        .then((response) => {
          setTotalCount(response.data.recordCount)
          return {
            data: (response.data && response.data.docs) || response.data || [],
            totalCount: (response.data && response.data.recordCount) || 0,
          }
        })
        .catch(() => {
          throw new Error(t('Network error'))
        })
    },
  })

  return (
    <DxGrid.DataGrid
      keyExpr={'_id'}
      className={'dx-card wide-card bg-transparent'}
      style={{ borderRadius: '12px', width: '100%' }}
      dataSource={customDataSource}
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
      remoteOperations={true}
      sorting={sorting}
      ColumnChooser={columnChooser}
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
        deferred: false,
      }}
      wordWrapEnabled={false}
      height={'auto'}
      filterRow={{ visible: true }}
      headerFilter={{ visible: true }}
      toolbar={{
        visible: true,
        items: [
          () => (
            <>
              <Button text='OK' stylingMode='text' className='bg-transparent' />
            </>
          ),
          'exportButton',
          'addRowButton',
          'columnChooserButton',
          'revertButton',
          'saveButton',
          'groupPanel',
        ],
      }}
      editing={editing}
      {...props}
    >
      {props.children}
    </DxGrid.DataGrid>
    // <React.Fragment>
    //   <h2 className={'content-block'}>Data Logs</h2>
    //   <div className={'content-block'}>

    //   </div>
    // </React.Fragment>
  )
}

export function MiaColumn(props = { ...DxGrid.Column.prototype.props }) {
  return (
    <>
      <DxGrid.Column
        // name={props.name || props.dataField || props.dataType}
        // trueText={t('trueText')}
        // falseText={t('falseText')}
        {...props}
        // caption={t(props.caption || '')}
      />
    </>
  )
}
