describe('API Tests for /customers endpoint', () => {
    const apiUrl = Cypress.env('apiUrl')
  
    context('Successful requests', () => {
      it('retrieves default customers', () => {
        // Arrange
        const url = `${apiUrl}/customers`
  
        // Act
        cy.request('GET', url)
          .then((response) => {
            // Assert
            const { status, body } = response
            const { customers, pageInfo } = body
  
            // Status
            expect(status).to.eq(200)
  
            // PageInfo
            expect(pageInfo).to.have.property('currentPage', 1)
            expect(pageInfo).to.have.property('totalPages')
            expect(pageInfo).to.have.property('totalCustomers')
  
            // Customers
            expect(customers).to.be.an('array')
            customers.forEach(customer => {
              expect(customer).to.have.all.keys('id', 'name', 'employees', 'contactInfo', 'size', 'industry', 'address')
            })
          })
      })
  
      it('retrieves customers filtered by size and industry', () => {
        // Arrange
        const url = `${apiUrl}/customers?size=Medium&industry=Technology`
  
        // Act
        cy.request('GET', url)
          .then((response) => {
            // Assert
            const { status, body } = response
            const { customers } = body
  
            // Status
            expect(status).to.eq(200)
  
            // Customers
            expect(customers).to.be.an('array')
            customers.forEach(customer => {
              expect(customer.size).to.eq('Medium')
              expect(customer.industry).to.eq('Technology')
            })
          })
      })
    })
  
    context('Error scenarios', () => {
      it('returns 400 for invalid page and limit parameters (negative values)', () => {
        // Arrange
        const url = `${apiUrl}/customers?page=-1&limit=-1`
  
        // Act
        cy.request({
          method: 'GET',
          url,
          failOnStatusCode: false
        }).then((response) => {
          // Assert
          const { status, body } = response
          // Status
          expect(status).to.eq(400)
          // Error message
          expect(body.error).to.eq('Invalid page or limit. Both must be positive numbers.')
        })
      })
  
      it('returns 400 for invalid size parameter', () => {
        // Arrange
        const url = `${apiUrl}/customers?size=InvalidSize`
  
        // Act
        cy.request({
          method: 'GET',
          url,
          failOnStatusCode: false
        }).then((response) => {
          // Assert
          const { status, body } = response
          // Status
          expect(status).to.eq(400)
          // Error message
          expect(body.error).to.eq('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
        })
      })
  
      it('returns 400 for invalid industry parameter', () => {
        // Arrange
        const url = `${apiUrl}/customers?industry=InvalidIndustry`
  
        // Act
        cy.request({
          method: 'GET',
          url,
          failOnStatusCode: false
        }).then((response) => {
          // Assert
          const { status, body } = response
          // Status
          expect(status).to.eq(400)
          // Error message
          expect(body.error).to.eq('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.')
        })
      })
    })
  })