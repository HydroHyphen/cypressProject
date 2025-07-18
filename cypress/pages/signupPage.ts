class signupPage{
    elements ={
        visitPage : () => cy.visit('/'),
        signupBtn : () => cy.get('ak-flow-executor').shadow().find('ak-stage-identification').shadow().find('a').contains('Sign up'),
        enterEmail : () => cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[type="email"]'),
        createPassword : () => cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[name="password"]'),
        confirmPassword :  () => cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[name="password_repeat"]'),
        confirmBtn : () => cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('button[type="submit"]')
    }
    signup(email: string, password: string){
        this.elements.visitPage()
        this.elements.signupBtn().click()
        this.elements.enterEmail().type(email)
        this.elements.createPassword().type(password)
        this.elements.confirmPassword().type(password)
        this.elements.confirmBtn().click()
    }
    signupAA(username:string, password: string){
        // If you have the application code, you can direclty access it here instead of goin throug the UI
        // It might be possible to bypass email verification by doing this 
    }
}

export default new signupPage()

// MailSlurp has a cypress plugin and can be used to create an email and extract a href from it 