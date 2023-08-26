import HahamLayout from '@/components/Layouts/HahamLayout'
import ModalDialogOk from '@/components/Modals/ModalDialogOk'
import { Button, Checkbox, Label, Table, TextInput, Modal } from 'flowbite-react'
import { useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
export const InvoiceOutbox = (props) => {
  const [result,setResult]=useState()
  // const fetchUsers=async ()=>{
  //   fetch(`/api/userList`)
  //   .then(resp=>resp.json())
  //   .then(resp=>{
  //     setResult(JSON.stringify(resp,null,2))
  //   })
  //   .catch(console.error)
  // }
  

  const fetchUsers=async ()=>{
    const resp=await (await fetch('https://jsonplaceholder.typicode.com/users')).json()
    console.log('resp:', resp)
    setResult(JSON.stringify(resp,null,2))
    
  }
  return (
    <HahamLayout>
      <h2>Invoice Outbox</h2>
      <button onClick={fetchUsers}>Fetch</button>
      <p>{result}</p>
      <Table striped={true} hoverable={true}>
        <Table.Head>
          <Table.HeadCell className='p-4'>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Product name</Table.HeadCell>
          <Table.HeadCell>Color</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className='sr-only'>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className='divide-y'>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell className='p-4'>
              <Checkbox />
            </Table.Cell>
            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
              Apple MacBook Pro 17"
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell className='flex' style={{fontSize:'1.25rem', cursor:'pointer'}}>
                <EditItem />
                <FaTrashAlt />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </HahamLayout>
  )
}

export default InvoiceOutbox

export const EditItem=(props)=>{
  const [isOpen,setOpen]=useState(false)

  return (
    <>
     <Button color="primary" onClick={() => setOpen(true)}>
        <div className="flex items-center gap-x-2">
          <FaEdit className="text-lg" />
          Edit
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Edit user</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First name</Label>
              <div className="mt-1">
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="Bonnie"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <div className="mt-1">
                <TextInput id="lastName" name="lastName" placeholder="Green" />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  placeholder="example@company.com"
                  type="email"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <div className="mt-1">
                <TextInput
                  id="phone"
                  name="phone"
                  placeholder="e.g., +(12)3456 789"
                  type="tel"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <div className="mt-1">
                <TextInput
                  id="department"
                  name="department"
                  placeholder="Development"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <div className="mt-1">
                <TextInput
                  id="company"
                  name="company"
                  placeholder="Somewhere"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordCurrent">Current password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordCurrent"
                  name="passwordCurrent"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">New password</Label>
              <div className="mt-1">
                <TextInput
                  id="passwordNew"
                  name="passwordNew"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={() => setOpen(false)}>
            Save all
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}