'use client'
import React, { useEffect, useState } from 'react'
import Wrapper from '../ui/wrapper'
import classes from './navbar.module.scss'
import BurgerButton from './burgerButton'
import { useMediaQuery } from 'react-responsive'
import Menu from './menu'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Logo from '../ui/logo'
import fetchAccount from '@/util/fetchAccount'
import { Account } from '@prisma/client'

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [userAccount, setUserAccount] = useState<Account>()
	const [isScrollingDown, setIsScrollingDown] = useState(false)
	const toggleMenu = () => {
		setIsMenuOpen(prevState => !prevState)
	}
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const { scrollY } = useScroll()
	useMotionValueEvent(scrollY, 'change', latest => {
		const previousScroll = scrollY.getPrevious()
		if (previousScroll && latest > previousScroll) {
			setIsScrollingDown(true)
		} else {
			setIsScrollingDown(false)
		}
	})

	useEffect(() => {
		if (!isMobile) {
			setIsMenuOpen(true)
		}
		if (isMobile) {
			setIsMenuOpen(false)
		}
	}, [isMobile])

	useEffect(() => {
		const getAccount = async () => {
			const account = await fetchAccount()
			if (account) {
				setUserAccount(account)
			}
		}
		getAccount()
	}, [])

	return (
		<>
			<div className={classes.navbarOffset}></div>
			<motion.nav
				animate={{
					top: isScrollingDown ? '-100%' : '0%',
				}}
				initial={{
					boxShadow: '0 4px 25px -25px rgb(0, 0, 0)',
				}}
				style={{
					boxShadow: isMenuOpen && isMobile ? 'none' : '0 4px 25px -25px rgb(0, 0, 0)',
				}}
				className={classes.navbar}>
				<Wrapper>
					<div className={classes.navbarContainer}>
						<Logo />
						<BurgerButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
						<AnimatePresence>{isMenuOpen && <Menu userAccount={userAccount} />}</AnimatePresence>
					</div>
				</Wrapper>
			</motion.nav>
		</>
	)
}

export default Navbar
