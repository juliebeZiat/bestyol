import { object, ref, string } from 'yup'

const requiredField = (value: string) => `${value} est requis`

export const signinSchema = object().shape({
	username: string()
		.required(requiredField("Le nom d'utilisateur"))
		.min(3, "Le nom d'utilisateur doit contenir au minimum 3 caractères")
		.max(20, "Le nom d'utilisateur doit contenir au maximum 20 caractères"),
	email: string()
		.email('Votre email ne semble pas correct')
		.required(requiredField("L'email")),
	password: string()
		.required(requiredField('Le mot de passe'))
		.matches(
			/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
			'Votre mot de passe doit contenir au minimum 8 caractères, un nombre et un caractère spécial',
		),
	passwordConfirm: string()
		.required('La confirmation du mot de passe est requise')
		.oneOf([ref('password')], 'Les mots de passe ne correspondent pas'),
})

export const createYolSchema = object().shape({
	name: string()
		.required(requiredField('Le nom du Yol'))
		.min(3, 'Le nom de votre Yol doit faire au minimum 3 caractères'),
})

export const editUserUsernameEmailSchema = object().shape({
	username: string()
		.min(3, "Le nom d'utilisateur doit contenir au minimum 3 caractères")
		.max(20, "Le nom d'utilisateur doit contenir au maximum 20 caractères"),
	email: string().email('Votre email ne semble pas correct'),
})

export const editUserPasswordSchema = object().shape({
	newPassword: string().matches(
		/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,
		'Votre mot de passe doit contenir au minimum 8 caractères, un nombre et un caractère spécial',
	),
	newPasswordConfirm: string()
		.required('La confirmation du mot de passe est requise')
		.oneOf([ref('newPassword')], 'Les mots de passe ne correspondent pas'),
})
