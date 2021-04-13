describe("test modal functionalities ",()=>{
    it("renders correctly", ()=>{
        cy.visit("/");
        cy.get("#container").should("exist")
        
})
    it("click modal & display details of pokemon", ()=>{
        cy.get("#card").should("exist")
        cy.get('#chakra-modal-modal').should('not.exist')
        cy.wait(1500)
        cy.get('#card').click() 
        cy.get('#chakra-modal-modal').should('be.visible')


    })
    it("close modal button & icon", ()=>{
        cy.get(".chakra-modal__close-btn").click()
        cy.get('#chakra-modal-modal').should('not.exist')
        cy.get('#card').click() 
        cy.get('.chakra-button').click()
        cy.get('#chakra-modal-modal').should('not.exist')

    })

 
})