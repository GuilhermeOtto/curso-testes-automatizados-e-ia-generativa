import { test, expect } from '@playwright/test'

test.describe('API Tests for /customers endpoint', () => {
  const apiUrl = process.env.API_URL || 'http://localhost:3001'

  test.describe('Successful requests', () => {
    test('retrieves default customers', async ({ request }) => {
      // Arrange
      const url = `${apiUrl}/customers`

      // Act
      const response = await request.get(url)
      const body = await response.json()

      // Assert
      const { customers, pageInfo } = body

      // Status
      expect(response.status()).toBe(200)

      // PageInfo
      expect(pageInfo.currentPage).toBe(1)
      expect(pageInfo).toHaveProperty('totalPages')
      expect(pageInfo).toHaveProperty('totalCustomers')

      // Customers
      expect(customers).toBeInstanceOf(Array)
      customers.forEach(customer => {
        expect(customer).toHaveProperty('id')
        expect(customer).toHaveProperty('name')
        expect(customer).toHaveProperty('employees')
        expect(customer).toHaveProperty('contactInfo')
        expect(customer).toHaveProperty('size')
        expect(customer).toHaveProperty('industry')
        expect(customer).toHaveProperty('address')
      })
    })

    test('retrieves customers filtered by size and industry', async ({ request }) => {
      // Arrange
      const url = `${apiUrl}/customers?size=Medium&industry=Technology`

      // Act
      const response = await request.get(url)
      const body = await response.json()

      // Assert
      const { customers } = body

      // Status
      expect(response.status()).toBe(200)

      // Customers
      expect(customers).toBeInstanceOf(Array)
      customers.forEach(customer => {
        expect(customer.size).toBe('Medium')
        expect(customer.industry).toBe('Technology')
      })
    })
  })

  test.describe('Error scenarios', () => {
    test('returns 400 for invalid page and limit parameters (negative values)', async ({ request }) => {
      // Arrange
      const url = `${apiUrl}/customers?page=-1&limit=-1`

      // Act
      const response = await request.get(url)
      const body = await response.json()

      // Assert
      // Status
      expect(response.status()).toBe(400)
      // Error message
      expect(body.error).toBe('Invalid page or limit. Both must be positive numbers.')
    })

    test('returns 400 for invalid size parameter', async ({ request }) => {
      // Arrange
      const url = `${apiUrl}/customers?size=InvalidSize`

      // Act
      const response = await request.get(url)
      const body = await response.json()

      // Assert
      // Status
      expect(response.status()).toBe(400)
      // Error message
      expect(body.error).toBe('Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.')
    })

    test('returns 400 for invalid industry parameter', async ({ request }) => {
      // Arrange
      const url = `${apiUrl}/customers?industry=InvalidIndustry`

      // Act
      const response = await request.get(url)
      const body = await response.json()

      // Assert
      // Status
      expect(response.status()).toBe(400)
      // Error message
      expect(body.error).toBe('Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.')
    })
  })
})