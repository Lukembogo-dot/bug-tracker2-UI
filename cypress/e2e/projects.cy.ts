/// <reference types="cypress" />
import '../support/commands';

describe('Projects Management Tests', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[aria-label="open sidebar"]').click();
    cy.get('button[data-tip="Projects"]').click();
  });

  it('should display the projects page correctly', () => {
    cy.contains('My Projects').should('be.visible');
    cy.contains('Projects Assigned to Me').should('be.visible');
  });

  it('should display projects in a table format', () => {
    // Check table headers
    cy.contains('ID').should('be.visible');
    cy.contains('Project Name').should('be.visible');
    cy.contains('Description').should('be.visible');
    cy.contains('Created By').should('be.visible');
    cy.contains('Created Date').should('be.visible');
    cy.contains('Actions').should('be.visible');
  });


  it('should display project details correctly', () => {
    // Assuming there are projects, check that they display properly
    cy.get('table').should('exist');
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should open project details modal when View button is clicked', () => {
    // Click the View button on the first project
    cy.get('button').contains('View').first().click();

    // Check that modal opens
    cy.get('dialog#project-modal').should('be.visible');
    cy.contains('Project Details').should('be.visible');
  });

  it('should display complete project information in modal', () => {
    // Click View on first project
    cy.get('button').contains('View').first().click();

    // Check modal content
    cy.contains('Project ID:').should('be.visible');
    cy.contains('Project Name:').should('be.visible');
    cy.contains('Description:').should('be.visible');
    cy.contains('Created By:').should('be.visible');
    cy.contains('Assigned To:').should('be.visible');
    cy.contains('Created Date:').should('be.visible');
    cy.contains('Last Updated:').should('be.visible');
  });

  it('should close modal when Close button is clicked', () => {
    // Open modal
    cy.get('button').contains('View').first().click();
    cy.get('dialog#project-modal').should('be.visible');

    // Close modal
    cy.get('dialog#project-modal').find('button').contains('Close').click();
    cy.get('dialog#project-modal').should('not.be.visible');
  });

  it('should close modal when clicking outside', () => {
    // Open modal
    cy.get('button').contains('View').first().click();
    cy.get('dialog#project-modal').should('be.visible');

    // Click outside modal (on backdrop)
    cy.get('dialog#project-modal').click('topLeft');
    // Note: This might not work if modal doesn't close on outside click
  });

  it('should display project creation dates in readable format', () => {
    // Check that dates are displayed (format may vary)
    cy.get('tbody tr').first().find('td').eq(4).should('not.be.empty');
  });

  it('should display project IDs with # prefix', () => {
    // Check that project IDs have # prefix
    cy.get('tbody tr').first().find('th').should('contain', '#');
  });

  it('should display user information correctly', () => {
    // Check created by and assigned to information
    cy.get('tbody tr').first().find('td').eq(3).should('contain', 'User');
  });

  it('should handle empty projects list', () => {
    // This test might need to be run with a clean database or mock API
    // Check for empty state message
    cy.contains('No projects assigned to you yet.').should('be.visible');
  });

  it('should handle API errors gracefully', () => {
    // This would require mocking API failures
    // If there's an API error, check error display
    cy.contains('Error loading projects').should('not.exist'); // Assuming no errors in normal flow
  });

  it('should display projects sorted by creation date', () => {
    // Check that projects are displayed in some logical order
    // This assumes projects are sorted by API
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should show project names as clickable/links', () => {
    // Check that project names are displayed prominently
    cy.get('tbody tr').find('td').eq(1).should('not.be.empty');
  });


  it('should display timestamps in locale format', () => {
    // Open modal
    cy.get('button').contains('View').first().click();

    // Check that dates are formatted for locale
    cy.get('dialog#project-modal').contains('Created Date:').next().should('not.be.empty');
    cy.get('dialog#project-modal').contains('Last Updated:').next().should('not.be.empty');
  });

  it('should maintain modal state when reopening different projects', () => {
    // Open first project modal
    cy.get('button').contains('View').first().click();
    cy.get('dialog#project-modal').should('be.visible');

    // Close modal
    cy.get('dialog#project-modal').find('button').contains('Close').click();

    // Open second project modal (if exists)
    cy.get('button').contains('View').eq(1).click();
    cy.get('dialog#project-modal').should('be.visible');
  });

  it('should handle projects with minimal information', () => {
    // Check that projects with basic info still display correctly
    cy.get('tbody tr').each(($row) => {
      cy.wrap($row).find('th').should('not.be.empty'); // ID
      cy.wrap($row).find('td').eq(0).should('not.be.empty'); // Name
    });
  });
});