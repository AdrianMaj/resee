'use client'
import React, { useEffect, useState } from 'react'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'
import classes from './navbar.module.scss'
import Link from 'next/link'
import BurgerButton from './burgerButton'
import { useMediaQuery } from 'react-responsive'
import Menu from './menu'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrollingDown, setIsScrollingDown] = useState(false)
	const toggleMenu = () => {
		setIsMenuOpen(prevState => !prevState)
	}
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	const { scrollY } = useScroll()
	useMotionValueEvent(scrollY, 'change', latest => {
		const previousScroll = scrollY.getPrevious()
		console.log(previousScroll)
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

	return (
		<>
			<div className={classes.navbarOffset}></div>
			<motion.nav
				animate={{
					top: isScrollingDown ? '-100%' : '0%',
					boxShadow: isMenuOpen && isMobile ? 'none' : '0 4px 25px -25px rgb(0, 0, 0)',
				}}
				initial={{
					boxShadow: '0 4px 25px -25px rgb(0, 0, 0)',
				}}
				className={classes.navbar}>
				<Wrapper>
					<div className={classes.navbarContainer}>
						<Link className={classes.logo} href="/">
							<Image
								src="/reseeLogo.svg"
								width={0}
								height={0}
								sizes="100vw"
								style={{ width: '100%', height: 'auto' }}
								alt="resee Logo"
							/>
						</Link>
						<BurgerButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
						<AnimatePresence>{isMenuOpen && <Menu />}</AnimatePresence>
					</div>
				</Wrapper>
			</motion.nav>
		</>
	)
}

export default Navbar
