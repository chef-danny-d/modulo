import React, { Suspense } from 'react'
import { useCurrentUser } from '../../users/hooks/useCurrentUser'
import { useMutation } from '@blitzjs/rpc'
import logout from '../../auth/mutations/logout'
import { Routes } from '@blitzjs/next'
import Link from 'next/link'
import type {Prisma} from 'db'

const Navbar = (props) => {
  // const currentUser = useCurrentUser()
  return(
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="#"></a>
          </div>
        </div>
        <div className="items-center md:flex">
          <div className="flex flex-col md:flex-row md:mx-6">
            <Link href={Routes.Home()} className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                >Home</Link>
            <Link href={Routes.CoursesPage()} className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 md:mx-4 md:my-0">Courses</Link>
            <Link href={Routes.Pricing()} className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 md:mx-4 md:my-0"
                >Pricing</Link>
          </div>
          <Suspense>
          <NavbarCTA />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}

const NavbarCTA = () => {
  const currentUser = useCurrentUser()
  if (currentUser) {
    return <NavbarAccount user={currentUser} />
  }
  else{
    return (
      <div className="flex items-center justify-center gap-2 md:mx-4">
        <Link href={Routes.SignupPage()} className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md dark:bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                aria-label="toggle color mode">
          Sign Up
        </Link>
        <Link href={Routes.LoginPage()} className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md dark:bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                aria-label="toggle color mode">
          Login
        </Link>
      </div>
    )
  }
}

const NavbarAccount = ({user} : {
  user: Prisma.UserWhereUniqueInput
}) => {
  const [logoutMutation] = useMutation(logout)
  return (
    <div className="flex items-center justify-center gap-2 md:mx-4">
      <Link href={Routes.AccountPage({id: user.id!})} className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md dark:bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              aria-label="toggle color mode">
        Account
      </Link>
      <button
        className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-200 transform bg-indigo-600 rounded-md dark:bg-indigo-500 hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
        aria-label="toggle color mode"
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
