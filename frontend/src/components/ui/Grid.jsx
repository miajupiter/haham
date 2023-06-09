import React, { useState } from 'react'
import CustomStore from 'devextreme/data/custom_store'
import * as api from '../../providers/_api'
import * as DxGrid from 'devextreme-react/data-grid'
import './Grid.scss'
import { t } from '../../utils/translate'
import { PropTypes } from 'prop-types'

export * from 'devextreme-react/data-grid'

export function MJGrid(props = { ...DxGrid.DataGrid.prototype.props }) {
  const [pageIndex, setPageIndex] = useState(0) // 0 based page number
  const [pageSize, setPageSize] = useState(10)
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
            data: response.data && response.data.docs,
            totalCount: response.data && response.data.recordCount,
          }
        })
        .catch(() => {
          throw new Error(t('Network error'))
        })
    },
  })

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Data Logs</h2>
      <div className={'content-block'}>
        <DxGrid.DataGrid
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
          // defaultFocusedRowIndex={0}
          columnAutoWidth={true}
          columnHidingEnabled={true}
          columnResizingMode='widget'
          allowColumnResizing={true}
          dateSerializationFormat={'yyyy-MM-dd hh:mm:ss'}
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
          ColumnChooser={{
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
          searchPanel={{ visible: true, placeholder: t('Search') }}
          noDataText={t('No data')}
          keyboardNavigation={{
            enterKeyAction: 'moveFocus',
            enabled: true,
            enterKeyDirection: 'column',
          }}
          repaintChangesOnly={false}
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
          toolbar={{
            visible: true,
            items: [
              'exportButton',
              'addRowButton',
              'columnChooserButton',
              'revertButton',
              'saveButton',
              'groupPanel',
            ],
          }}
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
              confirmDeleteMessage: t(
                'Are you sure you want to delete this record?'
              ),
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
          {...props}
        >
          {props.children}
        </DxGrid.DataGrid>
      </div>
    </React.Fragment>
  )
}

export function Column(props = { ...DxGrid.Column.prototype.props }) {
  return (
    <React.Fragment>
      <DxGrid.Column
        trueText={t('trueText')}
        falseText={t('falseText')}
        // caption={t(props.caption || '')}
        {...props}
        caption={'deneme'}
      />
    </React.Fragment>
  )
}
