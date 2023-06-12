import React from 'react'
import './Home.scss'
import { toast, Button } from '../../components'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import { ReactComponent as SamplingIcon } from '../../assets/icons/Sampling.svg'
import ResponsiveBox, {
  Row,
  Col,
  Item,
  Location,
} from 'devextreme-react/responsive-box'

const startSimulator = () => {
  toast('merhaba dunya')
}

const Simulator = () => (
  <div className={'dx-card'}>
    <div
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <SamplingIcon width='64px' height='64px' />
      <Button
        text='Start'
        icon='fas fa-play'
        onClick={startSimulator}
        style={{ marginLeft: '8px' }}
      />
    </div>
  </div>
)

const Lorem = () => (
    <div className={''} style={{width:'100%', height:'100%'}}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero ullam at
        eligendi magni. Iure, quaerat beatae modi nesciunt dignissimos harum.
        Laboriosam eum sunt cumque tenetur illum doloribus commodi quaerat
        dolorem?
      </p>
      
    </div>
)
export default function Home() {
  return (
    <React.Fragment>
      <div className='flex-between' style={{ marginRight: '8px' }}>
        <h2 className={'content-block'}>Home</h2>
        <Logo width='80px' height='80px' style={{ opacity: 0.6 }} />
      </div>
      <ResponsiveBox singleColumnScreen='xs sm'>
        <Row ratio={1} /> {/* Header */}
        <Row ratio={2} /> {/* Content */}
        <Row ratio={0.7} /> {/* Footer */}
        <Col ratio={5} screen='md lg' /> {/* Left-side bar */}
        <Col ratio={11} /> {/* Content */}
        <Col ratio={4.5} screen='md lg' /> {/* Right-side bar */}
        <Item>
          <Location screen='md lg' row={0} col={0} colspan={3} />
          {/* <Location screen='xs sm' row={0} col={0} /> */}
          <Lorem />
        </Item>
        <Item>
          <Location screen='md lg' row={0} col={1} colspan={2} />
          {/* <Location screen='xs sm' row={0} col={0} /> */}
          <Lorem />
        </Item>
        {/* <Item>
          <Location screen='md lg' row={1} col={2} />
          <Location screen='xs sm' row={1} col={0} />
          <Simulator />
        </Item> */}
      </ResponsiveBox>
    </React.Fragment>
  )
}
