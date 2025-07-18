class loginPage{
    elements ={
        visitPage : () => cy.visit('/'),
        enterUsername : () => cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find("ak-form-element").find("input"),
        loginBtn : () =>  cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find('button[type="submit"]'),
        enterPassword : () => cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('#ak-stage-password-input'),
        continueBtn : () => cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('button[type="submit"]'),
        confirmRedirect: () => cy.url().should('eq', '')    // detects going out of scope
    }
    login(username: string, password: string){
        this.elements.visitPage()
        this.elements.enterUsername().type(username)
        this.elements.loginBtn().click()
        this.elements.enterPassword().type(password)
        this.elements.continueBtn().click()
        this.elements.confirmRedirect()
    }
    loginAA(username:string, password: string){
        // If you have the application code, you can direclty access it here instead of goin throug the UI
    }
}

export default new loginPage()