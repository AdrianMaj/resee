'use client'
import React, { useEffect, useState } from 'react'
import classes from './formTextArea.module.scss'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'

const FormTextArea = ({
	id,
	label,
	error,
	defaultValue,
	minHeight,
	...props
}: {
	id: string
	label: string
	error?: string
	defaultValue?: string
	minHeight?: string
	[x: string]: any
}) => {
	const { register } = useFormContext()
	const { onChange, onBlur, name, ref } = register(id)
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(Boolean(defaultValue))
	const [isError, setIsError] = useState(Boolean(error))
	const [borderState, setBorderState] = useState('1px solid #bebebe')
	const [inputValue, setInputValue] = useState(defaultValue || '')

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
		setIsFilled(inputValue.length > 0)
	}

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(event.target.value)
		onChange(event)
	}

	useEffect(() => {
		setIsFilled(inputValue.length > 0)
	}, [inputValue])

	useEffect(() => {
		setIsError(Boolean(error))
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
			<motion.textarea
				style={{
					minHeight,
				}}
				animate={{ border: borderState }}
				className={classes.input}
				id={id}
				value={inputValue}
				{...props}
				onFocus={handleFocus}
				onBlur={event => {
					onBlur(event)
					handleBlur()
				}}
				onChange={event => handleChange(event)}
				name={name}
				ref={ref}
			/>
			<motion.label
				animate={{
					top: isFocused || isFilled ? '0em' : '1.4em',
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

export default FormTextArea
