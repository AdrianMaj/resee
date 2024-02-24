'use client'
import React, { useEffect, useState } from 'react'
import Wrapper from '../ui/wrapper'
import Image from 'next/image'
import classes from './navbar.module.scss'
import Link from 'next/link'
import BurgerButton from './burgerButton'
import { useMediaQuery } from 'react-responsive'
import Menu from './menu'
import { AnimatePresence } from 'framer-motion'

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const toggleMenu = () => {
		setIsMenuOpen(prevState => !prevState)
	}
	const isMobile = useMediaQuery({ query: '(max-width: 991px)' })
	useEffect(() => {
		if (!isMobile) {
			setIsMenuOpen(true)
		}
		if (isMobile) {
			setIsMenuOpen(false)
		}
	}, [isMobile])
	return (
		<nav className={classes.navbar}>
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
		</nav>
	)
}

export default Navbar
