import React, { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ContextMenu, { Position } from 'devextreme-react/context-menu'
import List from 'devextreme-react/list'
import { useAuth } from '../../providers/auth-provider'
import './UserPanel.scss'

export default function UserPanel({ menuMode }) {
	const { signOut } = useAuth()
	const navigate = useNavigate()

	const navigateToProfile = useCallback(() => navigate('/profile'), [navigate])

	

	const menuItems = useMemo(
		() => [
			{
				text: 'Profile',
				icon: 'user',
				onClick: navigateToProfile,
			},
			{
				text: 'Logout',
				icon: 'runner',
				onClick: signOut
			},
		],
		[signOut,navigateToProfile]
	)
	return (
		<div className={'user-panel'}>
			<div className={'user-info'}>
				<div className={'image-container'}>
					<div
						style={{
							// background: `url(${user.avatarUrl}) no-repeat #fff`,
							background: `url(https://randomuser.me/api/portraits/women/12.jpg) no-repeat #fff`,
							backgroundSize: 'cover',
						}}
						className={'user-image'}
					/>
				</div>
				{/* <div className={'user-name'}>{user.email}</div> */}
				<div className={'user-name'}>Kullanici adi</div>
			</div>

			{menuMode === 'context' && (
				<ContextMenu
					items={menuItems}
					target={'.user-button'}
					showEvent={'dxclick'}
					width={210}
					cssClass={'user-menu'}>
					<Position 
						my={{x:0,y:400}}
						// my={'bottom left'}
						// at={'bottom left'}
					/>
				</ContextMenu>
			)}
			{menuMode === 'list' && (
				<List
					className={'dx-toolbar-menu-action'} menuMode='slide'
					items={menuItems}
				/>
			)}
		</div>
	)
}
