describe('API Tests for /customers endpoint', () => {
    const apiUrl = Cypress.env('apiUrl')
   
    it('returns 400 status for invalid page parameter', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/customers?page=-1`,
        failOnStatusCode: false
      }).then((response) => {
        const { status } = response
        expect(status).to.eq(400)
      })
    })
  
    it('returns 400 status for invalid limit parameter', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/customers?limit=abc`,
        failOnStatusCode: false
      }).then((response) => {
        const { status } = response
        expect(status).to.eq(400)
      })
    })
  
    it('returns 400 status for unsupported size value', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/customers?size=Tiny`,
        failOnStatusCode: false
      }).then((response) => {
        const { status } = response
        expect(status).to.eq(400)
      })
    })
  
    it('returns 400 status for unsupported industry value', () => {
      cy.request({
        method: 'GET',
        url: `${apiUrl}/customers?industry=Healthcare`,
        failOnStatusCode: false
      }).then((response) => {
        const { status } = response
        expect(status).to.eq(400)
      })
    })
  })