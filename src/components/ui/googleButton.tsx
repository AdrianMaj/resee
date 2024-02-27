import Image from 'next/image'
import React from 'react'
import classes from './googleButton.module.scss'

const GoogleButton = ({ children }: { children: React.ReactNode }) => {
	return (
		<button className={classes.button}>
			<div className={classes.buttonText}>
				<Image src="/googleLogo.svg" alt="Google logo" width={30} height={30} />
				{children}
			</div>
		</button>
	)
}

export default GoogleButton
