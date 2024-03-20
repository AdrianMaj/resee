'use client'
import { motion } from 'framer-motion'
import React from 'react'
import classes from './spinner.module.scss'

const Spinner = ({ text, className }: { text?: string; className?: string }) => {
	return (
		<div className={`${classes.loadingContainer} ${className}`}>
			{text && <p className={classes.loadingText}>{text}</p>}
			<motion.div
				transition={{
					repeat: Infinity,
					ease: 'linear',
					duration: 1,
				}}
				animate={{ rotate: 360 }}
				className={classes.spinner}></motion.div>
		</div>
	)
}

export default Spinner
