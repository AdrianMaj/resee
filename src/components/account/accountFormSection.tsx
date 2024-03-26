import React from 'react'
import Wrapper from '../ui/wrapper'
import classes from './accountFormSection.module.scss'
import AccountForm from '../forms/account/accountForm'
import fetchAccount from '@/util/fetchAccount'

const AccountFormSection = async () => {
	const account = await fetchAccount()
	return (
		<Wrapper>
			<section className={`${classes.formSection} section`}>
				<h1 className={classes.formSection__headingH1}>Account settings</h1>
				<AccountForm account={account} />
			</section>
		</Wrapper>
	)
}

export default AccountFormSection
