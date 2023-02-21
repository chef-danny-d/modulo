import React from 'react'

export const Input = ({
	type = 'text',
	name,
	id,
	className,
	value,
	placeholder = '',
	required = false,
	...props
}: {
	type?: string
	name?: string
	id?: string
	className?: string
	value?: string | number
	placeholder?: string | number
	required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			type={type}
			name={name}
			id={id}
			className={className}
			value={value}
			placeholder={placeholder}
			required={required}
			{...props}
		/>
	)
}
