'use client'
import React from 'react'
import classes from './button.module.scss'
import { motion } from 'framer-motion'

const Button = ({
	children,
	filled,
	className,
	...props
}: {
	children: React.ReactNode
	filled?: boolean
	className?: string
	[x: string]: any
}) => {
	return (
		<motion.button
			whileHover={{
				backgroundColor: filled ? '#7527f1' : '#9357f4',
				color: '#ffffff',
			}}
			className={`${classes.button} ${!filled && classes.textButton} ${className}`}
			{...props}>
			{children}
		</motion.button>
	)
}

export default Button
