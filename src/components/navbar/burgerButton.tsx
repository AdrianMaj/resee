'use client'
import React from 'react'
import classes from './burgerButton.module.scss'
import { motion } from 'framer-motion'

const BurgerButton = ({ toggleMenu, isMenuOpen }: { toggleMenu: () => void; isMenuOpen: boolean }) => {
	return (
		<button onClick={toggleMenu} className={classes.burgerButton}>
			<div className={classes.container}>
				<motion.div
					className={classes.burgerButton__line}
					animate={{
						rotate: isMenuOpen ? '-45deg' : '0deg',
						top: isMenuOpen ? '50%' : '0',
					}}
					initial={{ top: '0' }}
				/>
				<motion.div
					className={classes.burgerButton__line}
					animate={{
						display: isMenuOpen ? 'none' : 'block',
						top: '50%',
					}}
					initial={{ top: '50%' }}
				/>
				<motion.div
					className={classes.burgerButton__line}
					animate={{
						rotate: isMenuOpen ? '45deg' : '0deg',
						top: isMenuOpen ? '50%' : '100%',
					}}
					initial={{ top: '100%' }}
				/>
			</div>
		</button>
	)
}

export default BurgerButton
