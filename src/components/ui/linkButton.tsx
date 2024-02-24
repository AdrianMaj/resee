import React from 'react'
import MotionLink from './motionLink'
import classes from './linkButton.module.scss'

const LinkButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
	return (
		<MotionLink whileHover={{ backgroundColor: '#7527f1' }} href={href} className={classes.linkButton}>
			{children}
		</MotionLink>
	)
}

export default LinkButton
