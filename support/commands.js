// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add("login",() => {
    let my_token = null 
    const options = { 
        method: 'POST',
        failOnStatusCode: false, 
        url: '/authenticate', 
        body: { 
            username: 'QA', 
            password: 'willWin' 
        } 
        } 
        cy.request(options) 
        .then((response) => { 
            expect(response.status).to.equal(200);
            expect(response.body.username).to.equal('QA'); 
            expect(response.body.token).to.exist 
            localStorage.setItem("my_token",response.body.token); 
            my_token = response.body.token 
            Cypress.Cookies.preserveOnce('session_id', response.body.token) 
        }); 
    }) 
    
    Cypress.Commands.add("login_UI", () => {
        //Logging command using UI 
        cy.visit('/web/index.html') 
        cy.get('input[placeholder=Username]').type('QA') 
        cy.get('input[placeholder=Password]').type('willWin') 
        cy.contains('Sign in').click() 
    })
    
    Cypress.Commands.add("login_HTTP", () => { 
        cy.visit('/web/index.html') 
        //TODO HTTP REQUEST WITH USERNAME/PASSWORD  
    })
    
    Cypress.Commands.add("deleteTask", (task_id) => {
        cy.request({ 
            method: "DELETE", 
            url: "/" + task_id, 
            headers : { 
                'Content-Type':'application/json', 
                'authorization': "Basic " + 'UUE6d2lsbFdpbg==' }, 
                failOnStatusCode: true, })
        .then((response) => { 
            expect(response.status).to.equal(200);
        })
    })
    
    Cypress.Commands.add("verifyTags", (tasks_count) => {
        cy.request({ 
            method: "GET", 
            url: "/", 
            failOnStatusCode: false })
        .then((response) => { 
            expect(response.status).to.equal(200);
            expect(response.body).to.have.length(tasks_count)
            //TODO schema validation for tags
        })
    }) 
    
    // -- This is a child command --
    // Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
    //
    //
    // -- This is a dual command --
    // Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
    //
    //
    // -- This will overwrite an existing command --
    // Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
    
    