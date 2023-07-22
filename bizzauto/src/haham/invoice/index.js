import {InvoiceInbox } from './inbox/index'
import {InvoiceInboxCreate } from './inbox/create'
import {InvoiceInboxEdit } from './inbox/edit'

import {InvoiceOutbox } from './outbox/index'
import {InvoiceOutboxCreate } from './outbox/create'
import {InvoiceOutboxEdit } from './outbox/edit'

export const Invoice={
  Inbox:{
    Index:InvoiceInbox,
    Edit:InvoiceInboxEdit,
    Create:InvoiceInboxCreate,
  },
  Outbox:{
    Index:InvoiceOutbox,
    Edit:InvoiceOutboxEdit,
    Create:InvoiceOutboxCreate,
  }
}

export default Invoice