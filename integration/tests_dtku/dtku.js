describe('Dataiku API Testing', () => {
    before(function () {
        //clean database before running test 
        cy.request({ 
            method: "GET", 
            url: "/reset", 
        }).then((response) => { 
            cy.log ("erase the db")
            expect(response.status).to.equal(200); 
        }); 
        cy.login(); 
        //cy.login_UI(); 
    }) 
    beforeEach (function () { 
        //Loading tasks fixture 
        cy.fixture('tasksJson').as('tasksData')
    }) 
    it('Add task using request : PASSING CASE', () => {

        cy.get('@tasksData').then((tasksData) => {

            cy.request({ 
                method: "PUT", 
                url: "/", 
                headers : { 
                    'Content-Type':'application/json', 
                    'authorization': "Basic " + 'UUE6d2lsbFdpbg==' }, 
                    failOnStatusCode: true, 
                body: { 
                        "title" : tasksData.short_title,  
                        "tags" : tasksData.long_list_tags 
                    } 
                })
                .then((response) => { 
                    cy.log (response.body) 
                expect(response.status).to.equal(200); });
            
        })
         
        
    })
    it('Add task using request : NON PASSING CASE (MORE THAN 20 CHARACTERS TITLE)', () => {
        cy.get('@tasksData').then((tasksData) => {    
            
            cy.request({ 
                method: "PUT", 
                url: "/", 
                headers : { 
                    'Content-Type':'application/json', 
                    'authorization': "Basic " + 'UUE6d2lsbFdpbg==' }, 
                    failOnStatusCode: false, 
                body: { 
                        "title" : tasksData.long_title, 
                        "tags" : tasksData.tags 
                    } 
                })
                .then((response) => { 
                    cy.log (response.body) 
                expect(response.status).to.equal(500); });
        })
    }) 
    it('Add task using request : NON PASSING CASE (MORE THAN 20 CHARACTERS TAGS)', () => {
        cy.get('@tasksData').then((tasksData) => {
        
            cy.request({ 
                method: "PUT", 
                url: "/", 
                headers : { 
                    'Content-Type':'application/json', 
                    'authorization': "Basic " + 'UUE6d2lsbFdpbg==' }, 
                    failOnStatusCode: false, 
                body: { 
                        "title" : tasksData.short_title, 
                        "tags" : tasksData.wrong_tags 
                    } 
            })
            .then((response) => { 
            cy.log (response.body) 
            expect(response.status).to.equal(500); });
        })
        
    })   
 
    it('POST /users Method', () => {
        cy.request(
        { 
            method: "POST", 
            url: "/users", 
            headers : { 
                'Content-Type': 'application/json', 
            }, 
            body: { 
                "username" : "Thierry", 
                "password" : "toto", 
            } 
            }).then((response) => { 
                cy.log (response.body) 
                expect(response.status).to.equal(200); 
        }); 
    }) 
    it('List of all existing tags /GET', (tags_count=2) => { 
        cy.request({ 
            method: "GET", 
            url: "/", 
            failOnStatusCode: false 
        }).then((response) => { 
            expect(response.status).to.equal(200);
            expect(response.body).to.have.length(tags_count)
        });
    })
    it('List of all existing tags /task_id GET',  (task_id=1) => { 
        cy.get('@tasksData').then((tasksData) => {
            cy.request({ 
                method: "GET", 
                url: "/" + task_id, 
                failOnStatusCode: false 
            }).then((response) => { 
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property ('title', tasksData.short_title)
                expect(response.body).to.have.property ('id', task_id)
                expect(response.body.tags).to.have.lengthOf(tasksData.long_list_count_tags);
            })
        })
   })
   it('/task_id PATCH Method',  (task_id=1) => { 
    cy.request({ 
        method: "PATCH", 
        url: "/" + task_id,
        headers : { 
            'Content-Type':'application/json', 
            'authorization': "Basic " + 'UUE6d2lsbFdpbg==' 
        }, 
        body: { 
                "title" : "This is my new title with a great number of characters", 
                "tags" : ["tag_patch_one","tag_patch_two","tag_patch_three"],
                "done" : true
            } 
        })     
        .then((response) => { 
            expect(response.status).to.equal(200);
        });
    })
    /*it('DELETE Method', (task_id=2) => { 
        cy.request({ 
            method: "DELETE", 
            url: "/" + task_id, 
            headers : { 
                'Content-Type':'application/json', 
                'authorization': "Basic " + 'UUE6d2lsbFdpbg==' }, 
                failOnStatusCode: true, })
            .then((response) => { 
                cy.log (response.body) 
            expect(response.status).to.equal(200); });
        })*/
})