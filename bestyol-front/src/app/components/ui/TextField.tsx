'use client'

import { HTMLInputTypeAttribute } from 'react'

interface TextFieldProps {
	label: string
	labelFor: string
	inputType?: HTMLInputTypeAttribute
	placeholder?: string
}

const TextField = ({
	label,
	labelFor,
	inputType = 'text',
	placeholder,
}: TextFieldProps) => {
	return (
		<div>
			<label className='block text-xl mb-2 text text-white' htmlFor={labelFor}>
				{label}
			</label>
			<div className='relative'>
				<input
					className='appearance-none w-full py-2 px-3 pl-6 focus:outline-none outline-none text-xl'
					type={inputType}
					placeholder={placeholder}
				/>
				<div className='absolute top-5 left-1 grid h-5 w-5 -translate-y-2/4 place-items-center'>
					&gt;
				</div>
			</div>
		</div>
	)
}

export default TextField
