describe('Request', () => {
    it('displays random pokemons from API', () => {
      cy.request('https://pokeapi.co/api/v2/pokemon?limit=10')
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        })
    })
  })