import React, { Suspense } from 'react'
import Layout from '../../core/layouts/Layout'
import { useCurrentUser } from '../../users/hooks/useCurrentUser'
import updateUser from '../../users/mutations/updateUser'
import { useMutation } from '@blitzjs/rpc'
import { FaTrash } from 'react-icons/fa'
import { Button, Input, Label } from '../../../app/core/components/form'
import type { User } from '@prisma/client'

const AccountPage = () => {
	return (
		<Layout>
			<Suspense>
				<AccountInfo />
			</Suspense>
		</Layout>
	)
}

const AccountInfo = () => {
	const currentUser = useCurrentUser()
	const [user] = useMutation(updateUser)
	return (
		<>
			<AccountForm
				currentUser={currentUser}
				handle={user}
			/>
		</>
	)
}

const AccountForm = ({ currentUser, handle, ...props }) => {
	return (
		<section className="bg-white dark:bg-gray-900">
			<div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
				<h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update account</h2>
				<form
					onSubmit={async (e: React.SyntheticEvent) => {
						e.preventDefault()
						if (!currentUser) return
						const target = e.target as typeof e.target & {
							lastName: { value: User['lastName'] }
							firstName: { value: User['firstName'] }
							email: { value: User['email'] }
						}
						const lastName = target.lastName.value
						const firstName = target.firstName.value
						const email = target.email.value
						await handle({ id: currentUser!.id, lastName, firstName, email })
					}}
					{...props}
				>
					<div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
						<div className="w-full">
							<Label
								htmlFor="firstName"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								First name
							</Label>
							<Input
								type="text"
								name="firstName"
								id="firstName"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								defaultValue={currentUser?.firstName || ''}
								placeholder="John"
							/>
						</div>
						<div className="w-full">
							<Label
								htmlFor="lastName"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Last name
							</Label>
							<Input
								type="text"
								name="lastName"
								id="lastName"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								defaultValue={currentUser?.lastName || ''}
								placeholder="Doe"
							/>
						</div>
						<div className="sm:col-span-2">
							<Label
								htmlFor="email"
								className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>
								Email
							</Label>
							<Input
								type="email"
								name="email"
								id="email"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								defaultValue={currentUser?.email || ''}
								placeholder="account@modulo.com"
								required
							/>
						</div>
					</div>
					<div className="flex items-center space-x-4">
						<Button
							type="submit"
							className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							Update
						</Button>
						<Button
							type="button"
							className="group text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
						>
							<FaTrash className="mr-2 text-red-600 group-hover:text-white group-hover:bg-red-600 dark:text-red-500 dark:group-hover:text-white dark:group-hover:bg-red-600" />
							Delete
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default AccountPage
