import React from 'react'
import MotionLink from './motionLink'
import classes from './linkButton.module.scss'

const LinkButton = ({ href, children, ...props }: { href: string; children: React.ReactNode; [x: string]: any }) => {
	return (
		<MotionLink whileHover={{ backgroundColor: '#7527f1' }} href={href} className={classes.linkButton} {...props}>
			{children}
		</MotionLink>
	)
}

export default LinkButton
