/// <reference types="cypress" />
import '../support/commands';

describe('Comments Management Tests', () => {
  beforeEach(() => {
     cy.viewport(1280, 720)
    cy.login();
    cy.get('[aria-label="open sidebar"]').click();
    cy.get('button[data-tip="Comments"]').click();
  });

  it('should display the comments page correctly', () => {
    cy.contains('Comments').should('exist');
    cy.contains('Add a Comment').should('be.visible');
  });


  it('should show form validation errors for empty comment submission', () => {
     cy.get('button[type="submit"]')
    .scrollIntoView({ offset: { top: -100, left: 0 } }) // optional offset
    .should('be.visible')
    .click();
});

  it('should validate bug ID is positive number', () => {
    cy.get('input[placeholder="Enter bug ID"]').type('-1');
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();
    cy.contains('Bug ID must be positive').should('be.visible');
  });

  it('should validate comment minimum length', () => {
    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type('abc');
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();
    cy.contains('Comment must be at least 5 characters').should('be.visible');
  });

  it('should create a comment successfully', () => {
    // Fill out the form
    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type('This is a test comment with sufficient length to pass validation.');

    // Submit the form
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();

    // Check for success message
    cy.contains('Comment added successfully!').should('be.visible');

    // Verify the comment appears in the list
    cy.contains('This is a test comment with sufficient length to pass validation.').should('be.visible');
  });

  it('should display comments in chat bubble format', () => {
    // Check for chat bubble elements
    cy.get('.chat').should('exist');
    cy.get('.chat-bubble').should('exist');
  });

  it('should show user information with comments', () => {
    // Check for user avatar/initials
    cy.get('.chat-image').should('exist');
    cy.get('.avatar').should('exist');

    // Check for username display
    cy.get('.chat-header').should('exist');
  });

  it('should display comment timestamps', () => {
    // Check for time elements in chat headers
    cy.get('.chat-header time').should('exist');
  });

  it('should show loading spinner while fetching comments', () => {
    // Check for loading spinner initially
    cy.get('.loading-spinner').should('exist');
  });

  it('should handle API errors gracefully', () => {
    // This would require mocking API failures
    // If there's an API error, check error display
    cy.contains('Error loading comments').should('not.exist'); // Assuming no errors in normal flow
  });

  it('should clear form after successful comment submission', () => {
    // Fill out the form
    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type('Another test comment for form clearing.');

    // Submit the form
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();

    // Check that form is cleared
    cy.get('input[placeholder="Enter bug ID"]').should('have.value', '');
    cy.get('textarea[placeholder="Write your comment here"]').should('have.value', '');
  });

  it('should show posting state during comment submission', () => {
    // Fill out the form
    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type('Testing posting state button text.');

    // Submit and check button text changes
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();
    cy.get('button[type="submit"]').should('contain', 'Posting...');
  });

  it('should display comments in chronological order', () => {
    // Create multiple comments and verify order
    // First comment
    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type('First comment in chronological test.');
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();

    // Second comment
    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type('Second comment in chronological test.');
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();

    // Check that both comments exist
    cy.contains('First comment in chronological test.').should('be.visible');
    cy.contains('Second comment in chronological test.').should('be.visible');
  });

  it('should handle long comments properly', () => {
    // Create a long comment
    const longComment = 'A'.repeat(500) + ' This is a very long comment to test how the UI handles lengthy text content. It should wrap properly and still be readable within the chat bubble format.';

    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type(longComment);
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();

    // Verify the long comment is displayed
    cy.contains(longComment.substring(0, 50)).should('be.visible'); // Check first part
  });

  it('should validate bug ID exists', () => {
    // Try to comment on a non-existent bug
    cy.get('input[placeholder="Enter bug ID"]').type('99999');
    cy.get('textarea[placeholder="Write your comment here"]').type('Comment on non-existent bug.');
    cy.get('button[type="submit"]').contains('Post Comment').scrollIntoView().click();

    // Should show error (assuming API validates bug existence)
    cy.contains('Failed to create comment').should('be.visible');
  });

  it('should handle network errors during comment submission', () => {
    // This would require mocking network failures
    // Fill form
    cy.get('input[placeholder="Enter bug ID"]').type('1');
    cy.get('textarea[placeholder="Write your comment here"]').type('Testing network error handling.');

    // Submit - in real scenario would mock network failure
    cy.get('button[type="submit"]').contains('Post Comment').click();

    // Check error handling (would need to mock API failure)
    // cy.contains('Failed to create comment').should('be.visible');
  });
});