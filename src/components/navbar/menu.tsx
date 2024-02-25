import React from 'react'
import classes from './menu.module.scss'
import MotionLink from '../ui/motionLink'
import LinkButton from '../ui/linkButton'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

const Menu = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const menuVariants = {
		hidden: {
			scaleY: 0,
		},
		shown: {
			scaleY: 1,
		},
	}
	const elementsVariants = {
		hidden: {
			opacity: 0,
		},
		shown: {
			opacity: 1,
		},
	}

	return (
		<motion.div
			initial={isMobile ? 'hidden' : 'shown'}
			animate="shown"
			exit="hidden"
			variants={menuVariants}
			className={classes.menu}>
			<MotionLink
				variants={elementsVariants}
				whileHover={{ color: '#7527f1' }}
				className={`${classes.menuLink}`}
				href="/resume-templates">
				Resume Templates
			</MotionLink>
			<MotionLink
				variants={elementsVariants}
				whileHover={{ color: '#7527f1' }}
				className={`${classes.menuLink}`}
				href="/resume-editor">
				Resume Editor
			</MotionLink>
			<div className={classes.menuLine}></div>
			<div className={classes.loginContainer}>
				<MotionLink
					variants={elementsVariants}
					whileHover={{ color: '#7527f1' }}
					className={`${classes.menuLink} ${classes.loginLink}`}
					href="/login">
					Log in
				</MotionLink>
				<LinkButton variants={elementsVariants} href="/sign-up">
					Sign up
				</LinkButton>
			</div>
		</motion.div>
	)
}

export default Menu
