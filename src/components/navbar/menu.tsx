import React from 'react'
import classes from './menu.module.scss'
import MotionLink from '../ui/motionLink'
import LinkButton from '../ui/linkButton'
import { motion } from 'framer-motion'

const Menu = () => {
	const menuVariants = {
		hidden: {
			top: '-250%',
		},
		shown: {
			top: '76px',
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
		<motion.div initial="hidden" animate="shown" exit="hidden" variants={menuVariants} className={classes.menu}>
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
