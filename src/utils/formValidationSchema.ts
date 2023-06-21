import { object, ref, string } from 'yup'

const requiredField = (value: string) => `${value} est requis`

export const signinSchema = object().shape({
	username: string()
		.required(requiredField("Le nom d'utilisateur"))
		.min(3, 'Minimum 3 caractères'),
	email: string().email('Format email').required(requiredField("L'email")),
	password: string()
		.min(5, 'Le mot de passe doit faire au minimum 5 caractères')
		.required(requiredField('Le mot de passe')),
	passwordConfirm: string()
		.min(5, '')
		.required(requiredField('La confirmation du mot de passe'))
		.oneOf([ref('password')], 'Les mots de passe ne correspondent pas'),
})
