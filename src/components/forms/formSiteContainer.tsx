import React from 'react'
import classes from './formSiteContainer.module.scss'

const FormSiteContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={classes.formBackgroundContainer}>
			<div className={classes.form}>{children}</div>
		</div>
	)
}

export default FormSiteContainer
