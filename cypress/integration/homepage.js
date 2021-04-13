describe("renders the home page ",()=>{
    it("renders correctly", ()=>{
            cy.visit("/");
            cy.get("#container").should("exist")
            
    })
    it("scroll down to bottom and display loader", ()=>{
        cy.get(".spinner").should("exist");
        cy.get("#card").should("exist")
        cy.scrollTo(0, "100vh") // Scroll the window 500px down
cy.get(".spinner").should("exist");
    })
    it("test different viewports",()=>{
        cy.viewport('iphone-6') // Set viewport to 375px x 667px
        cy.viewport('iphone-xr') // Set viewport to 375px x 667px
        cy.viewport('macbook-16') // Set viewport to 375px x 667px
        cy.viewport('ipad-mini') // Set viewport to 375px x 667px

    })
})