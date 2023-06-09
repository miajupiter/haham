import React from 'react'
import './Home.scss'
import { toast, Button } from '../../components'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import { ReactComponent as SamplingIcon } from '../../assets/icons/Sampling.svg'

export default function Home() {
  const startSimulator=()=>{
    toast('merhaba dunya')
  }

	return (
		<React.Fragment>
			<div
				className='flex-between'
				style={{ marginRight: '8px' }}>
				<h2 className={'content-block'}>Home</h2>
				<Logo
					width='80px'
					height='80px'
					style={{ opacity: 0.6 }}
				/>
			</div>

			<div className={'content-block'}>
				<div className={'dx-card responsive-paddings1'}>
					<div style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
						<SamplingIcon
							width='64px'
							height='64px'
						/>
						<Button
							text='Start'
							icon='fas fa-play'
              onClick={startSimulator}
              style={{marginLeft:'8px'}}
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}
