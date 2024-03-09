import React from 'react'
import FormInput from './formInput'
import FormTextArea from './formTextArea'
import classes from './infoInput.module.scss'
import { FormProvider, useForm } from 'react-hook-form'

const InfoInput = () => {
	const form = useForm()
	return (
		<FormProvider {...form}>
			<form className={classes.infoForm}>
				<div className={classes.infoForm__date}>
					<FormInput disableLabelAnimation type="month" id="monthStart" label="From" />
					<FormInput disableLabelAnimation type="month" id="monthEnd" label="To" />
				</div>
				<FormInput type="text" id="Title" label="Job Title" />
				<FormTextArea id="description" label="Description" />
			</form>
		</FormProvider>
	)
}

export default InfoInput
