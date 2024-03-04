import React from 'react'
import ThemeClassical from '../themes/themeClassical'
import classes from './themeContainer.module.scss'

const ThemeContainer = () => {
	return (
		<section className={classes.container}>
			<ThemeClassical />
		</section>
	)
}

export default ThemeContainer
