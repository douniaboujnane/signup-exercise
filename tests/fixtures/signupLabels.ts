export const signupLabels = {
  firstName: { en: 'First name', fr: 'Prénom' },
  lastName: { en: 'Last name', fr: 'Nom' },
  phoneNumber: { en: 'Phone number', fr: 'Téléphone' },
  email: { en: 'Email', fr: 'Courriel' },
  password: { en: 'Password', fr: 'Mot de passe' },
  passwordConfirmation: { en: 'Confirm password', fr: 'Confirmation du mot de passe' }
} as const

export type SignupLabelKey = keyof typeof signupLabels
