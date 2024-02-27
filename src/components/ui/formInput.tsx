'use client'
import React, { useEffect, useRef, useState } from 'react'
import classes from './formInput.module.scss'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

const FormInput = ({
	type,
	id,
	label,
	defaultValue,
	...props
}: {
	type: string
	id: string
	label: string
	defaultValue?: string
	[x: string]: any
}) => {
	const { register } = useFormContext()
	const { onChange, onBlur, name, ref } = register(id)
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const input = document.querySelector(`#${id}`)
	const textInput = input as HTMLInputElement
	const handleFocus = () => {
		setIsFocused(true)
	}
	const handleBlur = () => {
		if (input && textInput.value.length === 0) {
			setIsFocused(false)
			setIsFilled(false)
		} else {
			setIsFocused(false)
			setIsFilled(true)
		}
	}
	useEffect(() => {
		if ((defaultValue && defaultValue.length > 0) || (textInput && textInput.value.length > 0)) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}, [defaultValue, textInput, textInput.value.length])

	return (
		<div className={classes.inputContainer}>
			<motion.input
				animate={{ border: isFocused ? '1px solid #7527f1' : '1px solid #bebebe' }}
				className={classes.input}
				type={type}
				id={id}
				defaultValue={defaultValue}
				{...props}
				onFocus={handleFocus}
				onBlur={event => {
					onBlur(event)
					handleBlur()
				}}
				onChange={onChange}
				name={name}
				ref={ref}
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
