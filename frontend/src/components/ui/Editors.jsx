import React from 'react'
import PropTypes from 'prop-types'
import { Link as RcLink } from 'react-router-dom'

import * as Dx from 'devextreme-react'
//import DxValidator, { RequiredRule as DxRequiredRule } from 'devextreme-react/validator'
import notify from 'devextreme/ui/notify'
import config from 'devextreme/core/config'
import { t } from '../../utils/translate'
import './Editors.scss'

export function useTitle(title) {
  React.useEffect(() => {
    const prevTitle = document.title
    document.title = `${t(title)} - ${process.env.REACT_APP_TITLE}`
    return () => {
      document.title = prevTitle
    }
  },[])
}

config({
	defaultUseCurrencyAccountingStyle: false,
	editorStylingMode: 'outlined',
})

const enterNext = (e) => {
	if (e.event.currentTarget.nodeName === 'INPUT') {
		const form = e.event.currentTarget.form
		const index = Array.prototype.indexOf.call(form, e.event.currentTarget)
		index > -1 &&
			index < form.elements.length - 1 &&
			form.elements[index + 1].focus()
		e.event.preventDefault()
	}
}

export function TextBox(
	props = { dataField: PropTypes.string, ...Dx.TextBox.prototype.props },
) {
	return (
		<div className='zz-editor'>
			<Dx.TextBox
				labelMode='floating'
				stylingMode='outlined'
				showClearButton={true}
				onEnterKey={enterNext}
				inputAttr={{ 'data-field': props.dataField }}
				{...props}
				label={t(props.label)}
				placeholder={t(props.placeholder || ' ')}
			/>
		</div>
	)
}

export function CheckBox(
	props = { dataField: PropTypes.string, ...Dx.CheckBox.prototype.props },
) {
	return (
		<div className='zz-editor'>
			<Dx.CheckBox
				onEnterKey={enterNext}
				inputAttr={{ 'data-field': props.dataField }}
				{...props}
				text={t(props.text || props.label)}
			/>
		</div>
	)
}

const SwitchPropTypes = {
	label: PropTypes.any,
	dataField: PropTypes.string,
	labelPosition: PropTypes.oneOf(['start', 'end']),
	shrink: PropTypes.bool,
	...Dx.Switch.prototype.props,
}

export function Switch(props = SwitchPropTypes) {
	return (
		<div
			className='zz-editor'
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: props.shrink === true ? 'normal' : 'space-between',
				flexDirection: props.labelPosition === 'end' ? 'row-reverse' : 'row',
			}}>
			{props.label ?? props.label}
			<Dx.Switch
				stylingMode={'outlined'}
				onEnterKey={enterNext}
				inputAttr={{ 'data-field': props.dataField }}
				{...props}
				label={t(props.label)}
			/>
		</div>
	)
}

export function SelectBox(
	props = { dataField: PropTypes.string, ...Dx.SelectBox.prototype.props },
) {
	return (
		<div className='zz-editor'>
			<Dx.SelectBox
				placeholder={t(props.placeholder || ' ')}
				labelMode='floating'
				stylingMode='outlined'
				onEnterKey={enterNext}
				inputAttr={{ 'data-field': props.dataField }}
				label={t(props.label)}
				{...props}
			/>
		</div>
	)
}

export function Button(props = { ...Dx.Button.prototype.props }) {
	return (
		<div className='zz-editor'>
			<Dx.Button
				type='default'
				{...props}
				text={t(props.text)}
			/>
		</div>
	)
}

export function Link(props = { ...RcLink.prototype.props }) {
	return (
		<div className='zz-editor'>
			<RcLink
				className='link'
				{...props}>
				{t(props.children)}
			</RcLink>
		</div>
	)
}

export function toast(message, type = 'error', timeout = 2000) {
	notify(t(message), type, timeout)
}

export function Label(props) {
	return (
		<div className='zz-editor'>
			<label
				className='link'
				{...props}>
				{t(props.children)}
			</label>
		</div>
	)
}
