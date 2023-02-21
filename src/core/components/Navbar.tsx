import React, { Suspense, useEffect, useState } from 'react'
import { useCurrentUser } from '../../users/hooks/useCurrentUser'
import { useMutation } from '@blitzjs/rpc'
import logout from '../../auth/mutations/logout'
import { Routes } from '@blitzjs/next'
import Link from 'next/link'
import type { Prisma } from 'db'
import { FaHamburger } from 'react-icons/fa'

function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState<{
		width: number | undefined
		height: number | undefined
	}>({
		width: undefined,
		height: undefined,
	})

	useEffect(() => {
		// only execute all the code below in client side
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		// Add event listener
		window.addEventListener('resize', handleResize)

		// Call handler right away so state gets updated with initial window size
		handleResize()

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize)
	}, []) // Empty array ensures that effect is only run on mount
	return windowSize
}

const Navbar = () => {
	const size = useWindowSize()
	console.log(size)
	const [open, setOpen] = React.useState(true)
	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (size.width! >= 1023) {
				setOpen(true)
			} else {
				setOpen(false)
			}
		}
	}, [size.width])
	return (
		<header>
			<nav className="bg-white border-b shadow mb-2 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<a
						href="https://flowbite.com"
						className="flex items-center"
					>
						<img
							src="https://flowbite.com/docs/images/logo.svg"
							className="mr-3 h-6 sm:h-9"
							alt="Flowbite Logo"
						/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							Flowbite
						</span>
					</a>
					<div className="flex items-center lg:order-2">
						<Suspense>
							<NavbarCTA />
						</Suspense>
						<button
							data-collapse-toggle="mobile-menu-2"
							onClick={() => setOpen(!open)}
							type="button"
							className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="mobile-menu-2"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<FaHamburger className="w-6 h-6" />
						</button>
					</div>
					{open && (
						<div
							className={`block justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
							id="mobile-menu-2"
						>
							<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
								<li>
									<Link
										href={Routes.Home()}
										className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
										aria-current="page"
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href={Routes.CoursesPage()}
										className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
									>
										Courses
									</Link>
								</li>
								<li>
									<Link
										href={Routes.Pricing()}
										className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
									>
										Pricing
									</Link>
								</li>
							</ul>
						</div>
					)}
				</div>
			</nav>
		</header>
	)
}

const NavbarCTA = () => {
	const currentUser = useCurrentUser()
	if (currentUser) {
		return <NavbarAccount user={currentUser} />
	} else {
		return (
			<div className="flex items-center justify-center gap-2 md:mx-4">
				<Link
					href={Routes.SignupPage()}
					className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
				>
					Sign Up
				</Link>
				<Link
					href={Routes.LoginPage()}
					className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
				>
					Login
				</Link>
			</div>
		)
	}
}

const NavbarAccount = ({ user }: { user: Prisma.UserWhereUniqueInput }) => {
	const [logoutMutation] = useMutation(logout)
	return (
		<div className="flex items-center justify-center gap-2 md:mx-4">
			<Link
				href={Routes.AccountPage({ id: user.id! })}
				className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
			>
				Account
			</Link>
			<button
				className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
				onClick={async () => {
					await logoutMutation()
				}}
			>
				Logout
			</button>
		</div>
	)
}

export default Navbar
