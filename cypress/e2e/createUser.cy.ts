import signupPage from '../pages/signupPage'

describe('syllable login', () => {
  it('passes', () => {
    const currentDate: Date = new Date();
    const betterDate = currentDate.toString().substring(4,15).replaceAll(" ", "-")
    const generateEmail: string = "YOUR_EMAIL_HERE"+"+staging"+betterDate+"@gmail.com" // removed for confidentiality
    const generatePassword: string = '...'

    signupPage.signup(generateEmail,generatePassword)
  })
})

