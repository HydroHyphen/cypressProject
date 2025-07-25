import { chat1, chat2 } from "../support/chats"

export class homePage{
    elements ={
        selectUser : () => cy.get('button[role="button"][tabindex="0"]'),
        logoutBtn : () => cy.get('h6').contains('Logout'),
        selectNavBar : () => cy.get('path[opacity="0.32"]').parent(),
        newAgentBtn : () => cy.get('button').contains('New agent'),
        agentName : () => cy.get('input[name="agentName.name"]'),
        agentPromptField : () => cy.get('input[id="rhf-autocomplete-promptId"]'),
        agentFieldSelect : () => cy.get('li'),
        agentMessageField : () => cy.get('input[id="rhf-autocomplete-customMessageId"]'),
        agentTimeField : () => cy.get('input[id="timezone-select-label"]').parent('div'),
        agentSaveBtn : () => cy.get('button').contains("Save"),
        startSession: () => cy.get('button').contains('Start session'),
        resetSession: () => cy.get('button').contains('Restart'),
        endSession: () => cy.get('svg[width="24"][height="24"][xmlns="http://www.w3.org/2000/svg"]').parent(), 
    }

    logout(){
        this.elements.selectUser().click()
        this.elements.logoutBtn().click()
    }

    navigateToAgents(){
        this.elements.selectNavBar().click()
        // cy.get('span').contains('Agents').parent().parent().click({ force: true })      //temp solution1
        cy.get('h4').contains('Dashboards')                                                // temp fix to temp solution 2 -- will only work if you start at dashboards -- for waiting for unexpected redirect to render
        cy.url().then(url => {                                                             // temp solution2
            const modifiedUrl = url.replace('/dashboards', '/agents'); 
            cy.visit(modifiedUrl); 
        })
    }

    createAgent(agentName: string){
        this.elements.newAgentBtn().click()
        this.elements.agentName().type(agentName)
        this.elements.agentPromptField().type("[SHOWCASE] Weather Prompt")
        this.elements.agentFieldSelect().contains("[SHOWCASE] Weather Prompt").click()
        this.elements.agentMessageField().type("[SHOWCASE] Weather Message")
        this.elements.agentFieldSelect().contains("[SHOWCASE] Weather Message").click()
        this.elements.agentTimeField().click()
        this.elements.agentFieldSelect().contains("America/Los_Angeles").click()
        this.elements.agentSaveBtn().click()
        cy.url().should('not.include', '/new')
        this.elements.endSession().click() 
    }

    testAgent(agentName: string, chat: VoidFunction){

        // this.elements.startSession().click()
        chat1()

        this.elements.resetSession().click()
        // this.elements.startSession().click()
        // chat2()

        // this.elements.endSession().click()  
    }

}

// export default new homePage()
