import React from 'react'
import classes from './documentContainer.module.scss'

const DocumentContainer = ({ children }: { children: React.ReactNode }) => {
	return <main className={`${classes.mainContainer}`}>{children}</main>
}

export default DocumentContainer
