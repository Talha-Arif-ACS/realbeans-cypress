const STORE_URL = 'https://r1066207-realbeans.myshopify.com'
const PASSWORD = 'tayflo'

describe('RealBeans Shopify Store', () => {

  beforeEach(() => {
    cy.visit(STORE_URL)
    cy.get('body').then(($body) => {
      if ($body.find('input[type="password"]').length > 0) {
        cy.get('input[type="password"]').type(PASSWORD)
        cy.get('button[type="submit"]').click()
      }
    })
  })

  it('homepage shows intro text', () => {
    cy.contains('Since 1801, RealBeans').should('exist')
  })

  it('product catalog shows correct items', () => {
    cy.visit(STORE_URL + '/collections/all')
    cy.contains('Roasted coffee beans 5kg').should('exist')
    cy.contains('Blended coffee 5kg').should('exist')
  })

  it('can sort products by price', () => {
    cy.visit(STORE_URL + '/collections/all')
    cy.get('select').first().select('price-ascending')
    cy.url().should('include', 'sort_by=price-ascending')
  })

  it('product detail page shows correct info', () => {
    cy.visit(STORE_URL + '/products/roasted-coffee-beans-5kg')
    cy.contains('Our best and sustainable real roasted beans.').should('exist')
    cy.contains('Roasted coffee beans 5kg').should('exist')
  })

  it('About page has history paragraph', () => {
    cy.visit(STORE_URL + '/pages/about', {failOnStatusCode: false})
    cy.get('body').then(($body) => {
      if ($body.find('input[type="password"]').length > 0) {
        cy.get('input[type="password"]').type(PASSWORD)
        cy.get('button[type="submit"]').click()
      }
    })
    cy.contains('From a small Antwerp grocery').should('exist')
  })

})