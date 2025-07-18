export function createUser() {
    const currentDate: Date = new Date();
    const betterDate = currentDate.toString().substring(4,15).replaceAll(" ", "-")
    const email: string = "baingriffin+staging"+betterDate+"@gmail.com"
    cy.visit('/')    
    cy.get('ak-flow-executor').shadow().find('ak-stage-identification').shadow().find('a').contains('Sign up').click()
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[type="email"]').type(email)
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[name="password"]').type(betterDate+"test")
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[name="password_repeat"]').type(betterDate+"test")
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('button[type="submit"]').click()
}

export function logIn (username: string, password: string) {
    cy.visit('/')
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find("ak-form-element").find("input").type(username)
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find('button[type="submit"]').click()
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('#ak-stage-password-input').type(password)
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('button[type="submit"]').click()
    cy.url().should('eq', '')
}

export function logOut (oUrl: string){
    cy.origin(oUrl, () => {
        cy.get('button[role="button"][tabindex="0"]').click()
        cy.get('h6').contains('Logout').click()
    })
}

// In progress
export function createAgent (agentName: string){
    cy.origin('https://staging.syllable.cloud', () => {
        cy.get('button').contains('New agent').click()
        cy.get('input[name="agentName.name"]').type(agentName)
        cy.get('input[id="rhf-autocomplete-promptId"]').type("[SHOWCASE] Weather Prompt")
        cy.get('li').contains("[SHOWCASE] Weather Prompt").click()
        cy.get('input[id="rhf-autocomplete-customMessageId"]').type("[SHOWCASE] Weather Message")
        cy.get('li').contains("[SHOWCASE] Weather Message").click()
        cy.get('input[id="timezone-select-label"]').parent('div').click()
        cy.get('li').contains("America/Los_Angeles").click()
        cy.get('button').contains("Save").click()
    })
}

// cypress didn't handle while loops well so I made a recursive function
export const input = (text: string) => {
    cy.wait('@sessionPost').then(intercept => {
        expect(intercept.response?.statusCode).to.eq(200)
        const message = intercept?.response?.body
        if (message.includes('\n2:')){
            input(text)
        }
        else{
            const message2 = message.substring(message.indexOf('1:') + 2)
            var bubble = JSON.parse(message2)
            if ("testId" in bubble){
                const sample = bubble["response"]["content"]["action"]
                if (sample !== null && sample["name"] == 'hangup'){
                    // cy.task('log', 'Input: '+bubble['text'])
                    // cy.task('log', 'Output: '+sample["arguments"]["farewell_statement"]) 
                    cy.log(bubble['text'])
                    cy.log(sample["arguments"]["farewell_statement"])
                    cy.log("--CHAT ENDS--")
                    cy.screenshot()
                }
                else{
                    input(text)
                    // cy.task('log', 'Input: '+bubble['text'])
                    // cy.task('log', 'Output: '+bubble['response']['content']['message'])
                    cy.log(bubble['text'])
                    cy.log(bubble['response']['content']['message'])
                    cy.get('textarea[placeholder="Chat with agent..."]').type(text+'{enter}')
                }
            }
        }
    })
}

export function startSession(oUrl:string, aName: string) {
    // If you start at dashboard (for some reason this happens randomly)
    cy.origin(oUrl, () => {
        cy.get('path[opacity="0.32"]').parent().click()
        // cy.get('span').contains('Agents').parent().parent().click({ force: true })      //temp solution1
        cy.url().then(url => {                                                             // temp solution2
            const modifiedUrl = url.replace('/dashboards?page=0', '/agents'); 
            cy.visit(modifiedUrl); 
        })
    })

    // Go to the agent
    let agentUrl = ""
    cy.origin(oUrl, { args: { aName } }, ({ aName }) => {
        cy.get('p').contains(aName).click()
        cy.url().then((url) => {
            agentUrl = url
        })
    })

    // Start session
    cy.intercept('POST', agentUrl).as('sessionPost')            //for chatting with an agent: will input a message, waits for the post to complete, logs the input and output, then skips the followup 504 post 
    cy.origin(oUrl, () => {
        const { chat1, chat2 } = Cypress.require('./chats.ts')  // chats imported from chats.ts -- can customize what you want to input there
        
        //Chat functionality
        cy.get('button').contains('Start session').click()
        chat1() 

        // // For restart functionality
        // cy.get('button').contains('Restart').click()
        // cy.get('button').contains('Start session').click()
        // chat2('button')

        // // For exiting the test (for chaining multiple sessions together)
        // cy.get('svg[width="24"][height="24"][xmlns="http://www.w3.org/2000/svg"]').parent().click()

    })
}

// part of startSession I couldn't include in the page object model 
export function readPosts(oUrl: string, aName:string){
    let agentUrl = ""
    cy.origin(oUrl, { args: { aName } }, ({ aName }) => {
        cy.get('p').contains(aName).click()
        // cy.url().then((url) => {
        //     agentUrl = url
        // })
    })
    cy.intercept('POST', agentUrl).as('sessionPost')  
}