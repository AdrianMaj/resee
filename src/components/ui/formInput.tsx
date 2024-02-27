'use client'
import React, { useRef, useState } from 'react'
import classes from './formInput.module.scss'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

const FormInput = ({ type, id, label, ...props }: { type: string; id: string; label: string; [x: string]: any }) => {
	const { register } = useFormContext()
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const input = useRef<HTMLInputElement>(null)
	const handleFocus = () => {
		setIsFocused(true)
	}
	const handleBlur = () => {
		if (input.current && input.current.value.length === 0) {
			setIsFocused(false)
			setIsFilled(false)
		} else {
			setIsFocused(false)
			setIsFilled(true)
		}
	}

	return (
		<div className={classes.inputContainer}>
			<motion.input
				animate={{ border: isFocused ? '1px solid #7527f1' : '1px solid #bebebe' }}
				className={classes.input}
				type={type}
				id={id}
				{...props}
				{...register(id)}
				onFocus={handleFocus}
				onBlur={handleBlur}
				ref={input}
			/>
			<motion.label
				animate={{
					top: isFocused || isFilled ? '0%' : '50%',
					left: isFocused || isFilled ? '0.5em' : '0.9em',
					fontSize:
						isFocused || isFilled
							? 'clamp(1.6rem, 1.4092rem + 0.9538vw, 2rem)'
							: 'clamp(1.8rem, 1.6694rem + 0.6531vw, 2.2rem)',
				}}
				className={classes.label}
				htmlFor={id}>
				<motion.div
					animate={{
						opacity: isFocused || isFilled ? 1 : 0,
					}}
					className={classes.labelBackground}></motion.div>
				{label}
			</motion.label>
		</div>
	)
}

export default FormInput
