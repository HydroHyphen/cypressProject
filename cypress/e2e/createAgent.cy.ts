describe('template spec', () => {
  it('passes', () => {
    
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    //Log in:
    cy.visit('/')
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find("ak-form-element").find("input").type(username)
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find('button[type="submit"]').click()
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('#ak-stage-password-input').type(password)
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('button[type="submit"]').click()
    cy.url().should('eq', '')
    // Instead of waiting see if you can trigger on final page's get command -- only run when it is finished loading -- will be useful for waiting for agent response 

    //Create agent: 
    cy.origin('https://staging.syllable.cloud', () => {
      cy.get('button').contains('New agent').click()
      cy.get('input[name="agentName.name"]').type("Test1")
      cy.get('input[id="rhf-autocomplete-promptId"]').type("[SHOWCASE] Weather Prompt")
      cy.get('li').contains("[SHOWCASE] Weather Prompt").click()
      cy.get('input[id="rhf-autocomplete-customMessageId"]').type("[SHOWCASE] Weather Message")
      cy.get('li').contains("[SHOWCASE] Weather Message").click()
      cy.get('input[id="timezone-select-label"]').parent('div').click()
      cy.get('li').contains("America/Los_Angeles").click()
      cy.get('button').contains("Save").click()
    })
  })
})