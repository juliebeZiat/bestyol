import { object, ref, string } from 'yup'

const requiredField = (value: string) => `${value} est requis`

const getCharacterValidationError = (str: string) => {
	return `Your password must have at least 1 ${str} character`
}

export const signinSchema = object().shape({
	username: string()
		.required(requiredField("Le nom d'utilisateur"))
		.min(3, "Le nom d'utilisateur doit contenir au minimum 3 caractères"),
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
		.required(requiredField('La confirmation du mot de passe'))
		.oneOf([ref('password')], 'Les mots de passe ne correspondent pas'),
})
