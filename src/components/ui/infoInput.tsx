'use client'
import React, { useEffect, useState } from 'react'
import FormInput from './formInput'
import FormTextArea from './formTextArea'
import classes from './infoInput.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import _ from 'lodash'
import { infoInputFormSchema } from './infoInput.data'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Employment } from '@prisma/client'

const InfoInput = ({
	setArray,
	defaultValues,
	handleRemove,
}: {
	setArray: (values: z.infer<typeof infoInputFormSchema>) => void
	handleRemove: (id: string) => void
	defaultValues: Employment
}) => {
	const form = useForm({
		resolver: zodResolver(infoInputFormSchema),
		defaultValues: {
			id: defaultValues.id,
			name: defaultValues.name,
			description: defaultValues.description,
			from: defaultValues.from,
			to: defaultValues.to,
		},
	})
	useEffect(() => {
		const debouncedLogValues = _.debounce(async values => {
			setArray(values)
		}, 1000)

		const subscription = form.watch(values => {
			debouncedLogValues(values)
		})

		return () => {
			subscription.unsubscribe()
			debouncedLogValues.cancel()
		}
	}, [form, form.watch, setArray])
	return (
		<FormProvider {...form}>
			<form className={classes.infoForm}>
				<div className={classes.infoForm__date}>
					<FormInput
						defaultValue={defaultValues.from || undefined}
						disableLabelAnimation
						type="month"
						id="from"
						label="From"
					/>
					<FormInput
						defaultValue={defaultValues.to || undefined}
						disableLabelAnimation
						type="month"
						id="to"
						label="To"
					/>
				</div>
				<FormInput defaultValue={defaultValues.name || undefined} type="text" id="name" label="Job Title" />
				<FormTextArea defaultValue={defaultValues.description || undefined} id="description" label="Description" />
				<motion.p
					onClick={() => {
						handleRemove(defaultValues.id)
					}}
					whileHover={{
						color: '#a50000',
					}}
					className={classes.infoForm__delete}>
					Remove
				</motion.p>
			</form>
		</FormProvider>
	)
}

export default InfoInput
