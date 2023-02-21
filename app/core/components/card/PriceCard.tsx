export const PriceCard = () => {
	return (
		<div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
			<h3 className="mb-4 text-2xl font-semibold">Starter</h3>
			<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
				Best option for personal use & for your next project.
			</p>
			<div className="flex justify-center items-baseline my-8">
				<span className="mr-2 text-5xl font-extrabold">$29</span>
				<span className="text-gray-500 dark:text-gray-400">/month</span>
			</div>
			<a
				href="#"
				className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
			>
				Get started
			</a>
		</div>
	)
}
