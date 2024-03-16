'use client'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import classes from './multiSelect.module.scss'
import Button from './button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

export const multiSelectFormSchema = z.object({
	inputValue: z.string().min(1, 'You must provide correct value!'),
})

const MultiSelect = ({
	type,
	label,
	defaultValue,
	disableLabelAnimation,
	setStateFn,
	deleteElementFn,
	...props
}: {
	type: string
	label: string
	setStateFn: (value: string) => void
	deleteElementFn: (value: string) => void
	disableLabelAnimation?: boolean
	defaultValue?: string[]
	[x: string]: any
}) => {
	const [isFocused, setIsFocused] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const [isError, setIsError] = useState(false)
	const [borderState, setBorderState] = useState('1px solid #bebebe')
	const form = useForm({
		resolver: zodResolver(multiSelectFormSchema),
		defaultValues: {
			inputValue: '',
		},
	})
	const { onChange, onBlur, name, ref } = form.register('inputValue')

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
		setIsFilled(form.getValues('inputValue') !== undefined && form.getValues('inputValue').length > 0)
	}
	const onSubmit = (values: z.infer<typeof multiSelectFormSchema>) => {
		setStateFn(values.inputValue)
		form.setValue('inputValue', '')
		setIsFilled(false)
	}
	useEffect(() => {
		setIsFilled(form.getValues('inputValue') !== undefined && form.getValues('inputValue').length > 0)
	}, [form])

	useEffect(() => {
		if (isFocused && !isError) {
			setBorderState('1px solid #7527f1')
		} else if (!isFocused && !isError) {
			setBorderState('1px solid #bebebe')
		} else if (isError) {
			setBorderState('1px solid red')
		}
	}, [isError, isFocused])

	useEffect(() => {
		setIsError(Boolean(form.formState.errors.inputValue))
	}, [form.formState.errors.inputValue])

	return (
		<div className={classes.container}>
			<FormProvider {...form}>
				<motion.form onSubmit={form.handleSubmit(onSubmit)} className={classes.inputContainer}>
					<motion.input
						animate={{ border: borderState, borderRightWidth: '0px' }}
						className={classes.input}
						type={type}
						id={`inputValue__${label}`}
						name={name}
						ref={ref}
						onFocus={handleFocus}
						onBlur={event => {
							onBlur(event)
							handleBlur()
						}}
						onChange={onChange}
						{...props}
					/>
					<Button
						type="submit"
						className={classes.button}
						filled
						whileHover={{
							backgroundColor: '#7527f1',
							border: '1px solid #7527f1',
							color: '#ffffff',
						}}>
						Add
					</Button>
					<motion.label
						animate={{
							top: isFocused || disableLabelAnimation || isFilled ? '0%' : '50%',
							left: isFocused || disableLabelAnimation || isFilled ? '0.5em' : '0.9em',
							fontSize:
								isFocused || disableLabelAnimation || isFilled
									? 'clamp(1.6rem, 1.4092rem + 0.9538vw, 2rem)'
									: 'clamp(1.8rem, 1.6694rem + 0.6531vw, 2.2rem)',
						}}
						className={classes.label}
						htmlFor={`inputValue__${label}`}>
						<motion.div
							animate={{
								opacity: isFocused || disableLabelAnimation || isFilled ? 1 : 0,
							}}
							className={classes.labelBackground}></motion.div>
						{label}
					</motion.label>
				</motion.form>
			</FormProvider>
			<p className={classes.errorMessage}>{form.formState.errors.inputValue?.message}</p>
			<ul className={classes.skillList}>
				{defaultValue &&
					defaultValue.length > 0 &&
					defaultValue.map((skill, index) => (
						<motion.li
							onClick={() => {
								deleteElementFn(skill + '_' + index)
							}}
							whileHover={{
								backgroundColor: '#7527f1',
							}}
							className={classes.skillList__element}
							key={skill + index}>
							{skill}
						</motion.li>
					))}
			</ul>
		</div>
	)
}

export default MultiSelect
