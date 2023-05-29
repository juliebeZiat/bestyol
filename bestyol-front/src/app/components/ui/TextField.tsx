'use client'

import { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react'

interface TextFieldProps {
	label?: string
	labelFor?: string
	inputType?: HTMLInputTypeAttribute
	placeholder?: string
	error?: boolean
	errorMessage?: string
	value?: string
	inputFocus?: boolean
}

const TextField = ({
	label,
	labelFor,
	inputType = 'text',
	placeholder,
	error,
	errorMessage = 'Erreur',
	inputFocus,
}: TextFieldProps) => {
	const [isFocused, setIsFocused] = useState(false)
	const inputReference = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputReference.current) {
			inputReference.current.focus()
		}
	}, [])

	return (
		<div className='mb-4 w-full'>
			<label className='block text-xl mb-2 text text-white' htmlFor={labelFor}>
				{label}
			</label>
			<div className='relative'>
				<input
					ref={inputFocus ? inputReference : null}
					className={`appearance-none w-full py-2 px-3 pl-6 focus:outline-none outline-none text-xl ${
						error && 'border-error border-2'
					} `}
					type={inputType}
					placeholder={placeholder}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				{error && <p className='text-lg text-error'>{errorMessage}</p>}
				{isFocused && (
					<div className='absolute top-5 left-1 grid h-5 w-5 -translate-y-2/4 place-items-center'>
						&gt;
					</div>
				)}
			</div>
		</div>
	)
}

export default TextField
