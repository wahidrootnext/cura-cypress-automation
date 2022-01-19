/// <reference types="cypress"/>

Cypress._.times(5, (n) => {
    describe(`${n} cura appointment testing`, () => {
        before(() => {
            cy.visit('/')
            cy.get('#menu-toggle').click()
            cy.get('.sidebar-nav').contains('Login').click()
    
            cy.url().should('include', 'profile.php#login')
            cy.get('#txt-username').type('John Doe')
            cy.get('#txt-password').type('ThisIsNotAPassword')
            cy.get('#btn-login').click()
        })
        
        it('appointment', () => {
    
            cy.visit('/')
            localStorage.clear()
            cy.get('#btn-make-appointment').click()
    
            cy.contains('Make Appointment').should('be.visible')
            cy.get('#combo_facility option').then(listing => {
                let randInt = Math.floor(Math.random() * listing.length)
                cy.get('#combo_facility option').eq(randInt).then(option => {
                    cy.get('#combo_facility').select(option.text())
                    localStorage.setItem('facility', option.text())
                })
            })
            
            cy.get('#chk_hospotal_readmission').then((elem) => {
                let randInt = Math.floor(Math.random() * 2);
                if (randInt === 1) {
                    cy.get(elem).check()
                    localStorage.setItem('hospital_readmission', 'Yes')
                } else {
                    cy.get(elem).uncheck()
                    localStorage.setItem('hospital_readmission', 'No')
                }
            })
    
            cy.get('input[name="programs"]').then(listing => {
                let randInt = Math.floor(Math.random() * listing.length)
                cy.get('input[name="programs"]').eq(randInt).then((input) => {
                    cy.get(input).check();
                    localStorage.setItem('program', input.val())
                });
            })
            cy.get('#txt_visit_date').click()
    
            cy.get('div.datepicker').should('be.visible')
    
            cy.get('#txt_visit_date').click()
            cy.get('div.datepicker').should('be.visible').then(() => {
                let randRow = Math.ceil(Math.random() * 6)
                let randCol = Math.ceil(Math.random() * 7)
                cy.get(`.datepicker-days tbody > :nth-child(${randRow}) > :nth-child(${randCol})`).click()
            })
            
            cy.get('#txt_visit_date').then((elem) => {
                localStorage.setItem('visit_date', elem.val())
            })
    
            cy.get('#txt_comment').type('Lorem ipsum', { force: true }).then(() => {
                localStorage.setItem('comment', 'Lorem ipsum')
            })
    
            cy.get('#btn-book-appointment').click()
    
            // cy.url().should('include', '#summary')
            cy.contains('Appointment Confirmation').should('be.visible')
    
            cy.get('#facility').then(elem => {
                expect(elem.text()).to.eq(localStorage.getItem('facility'))
            })
            cy.get('#hospital_readmission').then(elem => {
                expect(elem.text()).to.eq(localStorage.getItem('hospital_readmission'))
            })
            cy.get('#program').then(elem => {
                expect(elem.text()).to.eq(localStorage.getItem('program'))
            })
            cy.get('#visit_date').then(elem => {
                expect(elem.text()).to.eq(localStorage.getItem('visit_date'))
            })
            cy.get('#comment').then(elem => {
                expect(elem.text()).to.eq(localStorage.getItem('comment'))
            })
            cy.contains('Go to Homepage').click()
    
        })
    })
})