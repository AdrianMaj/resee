import React from 'react'
import Wrapper from '../ui/wrapper'
import classes from './accountFormSection.module.scss'
import AccountForm from '../forms/account/accountForm'

const AccountFormSection = () => {
	return (
		<Wrapper>
			<section className={`${classes.formSection} section`}>
				<h1 className={classes.formSection__headingH1}>Account settings</h1>
				<AccountForm />
			</section>
		</Wrapper>
	)
}

export default AccountFormSection
