describe('Ambisius Challenge', () => {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('Page can be opened', () => {
    cy.contains('Ambisius Challenge')
  })

  it('Search Posts', function() {
    const searchBar = cy.get("[data-test-id='search-bar']")
    const query = 'dave'
    searchBar.type(query)

    cy.visit('http://localhost:3000/search?q=' + query)
    cy.get("[data-test-id='post-card']").should('have.length', 3)
  })

  it('Reply a Post', function() {
    cy.visit('http://localhost:3000/1')
    cy.get("[data-test-id='open-reply-button']").click()

    cy.get('[data-test-id="reply-input"]').type('new reply')
    cy.get('[data-test-id="reply-button"]').click()

    cy.contains('new reply')
  })

  it('Give a Post Reaction', function() {
    cy.visit('http://localhost:3000/1')
    cy.get("[data-test-id='reaction-button']").click()

    cy.get('[data-test-id="reaction-value"]').should('contain.text', '3')
  })
})
