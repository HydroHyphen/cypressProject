describe('syllable login', () => {
  it('passes', () => {

    const  username = Cypress.env('username')
    const  password = Cypress.env('password')

    cy.visit('/')
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find("ak-form-element").find("input").type(username)
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find('button[type="submit"]').click()
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('#ak-stage-password-input').type(password)
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('button[type="submit"]').click()
    cy.url().should('eq', '')

    // cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow()    
    // .then(($shadowRoot) => {
      //   // Log innerHTML of the shadow root
        // cy.log($shadowRoot[0].innerHTML)
      // // Finds a nested element inside the shadow root
      //   cy.wrap($shadowRoot)
      //     .find('ak-stage-identification') // or whatever is inside
      //     .should('exist')
      // })
  })
})