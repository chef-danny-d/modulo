import React from 'react'

export const Label = ({
	children,
	...props
}: {
	children: React.ReactNode
} & React.LabelHTMLAttributes<HTMLLabelElement>) => {
	return <label {...props}>{children}</label>
}
