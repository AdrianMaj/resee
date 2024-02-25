import React from 'react'
import classes from './sectionHeading.module.scss'

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
	return <h2 className={classes.sectionHeading}>{children}</h2>
}

export default SectionHeading
