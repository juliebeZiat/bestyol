'use client'

import Image from 'next/image'
import { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react'

interface TextFieldProps {
	label?: string
	labelFor?: string
	inputType?: HTMLInputTypeAttribute
	placeholder?: string
	error?: boolean
	errorMessage?: string
	inputFocus?: boolean
	value?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	needsSaving?: boolean
	onValidate?: () => void
	onCancel?: () => void
}

const TextField = ({
	label,
	labelFor,
	inputType = 'text',
	placeholder,
	error,
	errorMessage,
	inputFocus,
	value,
	onChange,
	needsSaving = false,
	onValidate,
	onCancel,
}: TextFieldProps) => {
	const [isFocused, setIsFocused] = useState(false)
	const [passwordShown, setPasswordShown] = useState(false)
	const inputReference = useRef<HTMLInputElement>(null)

	const togglePassword = () => {
		setPasswordShown(!passwordShown)
	}

	useEffect(() => {
		if (inputReference.current) {
			inputReference.current.focus()
		}
	}, [])

	return (
		<div className='mb-4 w-full relative'>
			<label className='block text-xl mb-2 text text-white' htmlFor={labelFor}>
				{label}
			</label>
			<div className='relative text-white'>
				<input
					ref={inputFocus ? inputReference : null}
					className={`pixel-corners-items appearance-none w-full py-2 px-3 sm:pl-6 focus:outline-none outline-none text-[.7rem] sm:text-xl bg-lowOpacity ${
						error && 'border-error border-2'
					} `}
					type={passwordShown ? 'text' : inputType}
					placeholder={placeholder}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					value={value ?? undefined}
					onChange={onChange ?? undefined}
				/>
				{inputType === 'password' && (
					<Image
						src='/assets/icons/eye.svg'
						width={20}
						height={20}
						alt='edit-icon'
						className='invert cursor-pointer absolute top-[50%] translate-y-[-50%] right-5'
						onClick={togglePassword}
					/>
				)}
				{needsSaving && (
					<div className='absolute top-[50%] right-0 px-4 flex gap-x-4 translate-y-[-50%]'>
						<button onClick={onValidate}>&#10004;</button>
						<button onClick={onCancel}>&#10539;</button>
					</div>
				)}
				{isFocused && (
					<div className='absolute top-[50%] translate-y-[-50%] left-2'>
						&gt;
					</div>
				)}
			</div>
			{errorMessage && (
				<div>
					<p className='text-error'>{errorMessage}</p>
				</div>
			)}
		</div>
	)
}

export default TextField
