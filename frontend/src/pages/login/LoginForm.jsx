import React, { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
// import {
//   Label, ButtonItem, ButtonOptions,
//   RequiredRule,
//   EmailRule, Form, Item
// } from 'devextreme-react/form'
import {
	TextBox,
	Button,
	toast,
  useTitle,
  
} from '../../components'

import * as api from '../../providers/_api'

import { isValidEmail, isValidTelephone } from '../../utils/util'
import './LoginForm.scss'
import { LoginLayout } from '../../layouts'

function enterNext(e) {
	if (e.event.currentTarget.nodeName === 'INPUT') {
		const form = e.event.currentTarget.form
		const index = Array.prototype.indexOf.call(form, e.event.currentTarget)
		index > -1 &&
			index < form.elements.length - 1 &&
			form.elements[index + 1].focus()
		e.event.preventDefault()
	}
}

export default function LoginForm() {
  useTitle('Log In')
	const navigate = useNavigate()
	// const { signIn } = useAuth()
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState(1)
	// let passInput
	const formData = useRef({
		username: '',
		password: '',
	})

	const stepOneClick = () => {

		if (
			!isValidEmail(formData.current.username) &&
			!isValidTelephone(formData.current.username)
		) {
			return toast('Invalid username')
		}
		api
			.post('/auth/check-username', {
				data: { username: formData.current.username },
			})
			.then((result) => {
				console.log('result:', result)
				formData.current.password = ''
				setStep(2)
			})
			.catch((err) => {
				toast(err.message)
			})
	}

	const loginClick = () => {
		if (
			!isValidEmail(formData.current.username) &&
			!isValidTelephone(formData.current.username)
		) {
			return toast('Invalid username')
		}
		api
			.post('/auth/login', {
				data: {
					username: formData.current.username,
					password: formData.current.password,
				},
			})
			.then((result) => {
				console.log('result:', result)
				toast('Login was successful','success')
        localStorage.setItem('token',result.data)
        //navigate('/home')
        window.location.reload()
			})
			.catch((err) => {
				toast(err.message)
			})
	}

	const onCreateAccountClick = useCallback(() => {
		navigate('/create-account')
	}, [navigate])

	// const telRules = { X: /[02-9]/ }
	return (
		<LoginLayout title={''}>
			<form className={'login-form'}>
				{step === 1 ? (
					<div>
						<TextBox
							label='Telephone or Email'
							showClearButton={true}
							onValueChanged={(e) => (formData.current.username = e.value)}
							defaultValue={formData.current.username}
							onEnterKey={()=>setTimeout(stepOneClick,0)}
						/>

						<div className='flex-between'>
              <div></div>
							{/* <Link
								className='link'
								to={'/create-account'}>
								Create an account
							</Link> */}
							<Button
								icon='fa-solid fa-chevron-right'
								type='default'
								onClick={stepOneClick}
							/>
						</div>
					</div>
				) : (
					''
				)}
				{step === 2 ? (
					<div>
						<TextBox
							label={'Telephone or Email'}
							readOnly={true}
							value={formData.current.username}
						/>
						<TextBox
							mode='password'
							label={'Password'}
							onInitialized={(e) => setTimeout(() => e.component.focus(), 0)}
              onValueChanged={(e) => (formData.current.password = e.value)}
						/>
						<div className='flex-between'>
							<Button
								type='normal'
                icon='back'
								onClick={() => setStep(1)}
							/>
							<Button
								icon='fa-solid fa-right-from-bracket'
								type='default'
								onClick={loginClick}
							/>
						</div>
						{/* <Link
							className='link'
							to={'/reset-password'}>
							Forgot password
						</Link> */}
					</div>
				) : (
					''
				)}
			</form>
		</LoginLayout>
	)
}
