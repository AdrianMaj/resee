'use client'
import React, { useEffect, useRef, useState } from 'react'
import classes from './formInput.module.scss'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

const FormInput = ({
	type,
	id,
	label,
	error,
	defaultValue,
	...props
}: {
	type: string
	id: string
	label: string
	error?: string
	defaultValue?: string
	[x: string]: any
}) => {
	const { register } = useFormContext()
	const { onChange, onBlur, name, ref } = register(id)
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const [isError, setIsError] = useState(false)
	const [borderState, setBorderState] = useState('1px solid #bebebe')
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
	const handleChange = () => {
		if ((defaultValue && defaultValue.length > 0) || (textInput && textInput.value.length > 0)) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}
	useEffect(() => {
		if ((defaultValue && defaultValue.length > 0) || (textInput && textInput.value.length > 0)) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}, [defaultValue, textInput])
	useEffect(() => {
		if (error && error !== '') {
			setIsError(true)
		} else {
			setIsError(false)
		}
	}, [error])
	useEffect(() => {
		if (isFocused && !isError) {
			setBorderState('1px solid #7527f1')
		} else if (!isFocused && !isError) {
			setBorderState('1px solid #bebebe')
		} else if (isError) {
			setBorderState('1px solid red')
		}
	}, [isError, isFocused])

	return (
		<div className={classes.inputContainer}>
			<motion.input
				animate={{ border: borderState }}
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
				onChange={event => {
					onChange(event)
					handleChange
				}}
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
			<p className={classes.errorMessage}>{error}</p>
		</div>
	)
}

export default FormInput
