/// <reference types="cypress" />

export {};

// Custom commands for bug tracking application testing

// Login command
Cypress.Commands.add('login', (email: string = 'livuser@example.com', password: string = '123456789') => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });

  cy.visit('/userLogin');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/user/dashboard');
  cy.window().its('localStorage.token').should('exist');
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
  cy.visit('/userLogin');
});

// Navigate to dashboard sections
Cypress.Commands.add('navigateToBugs', () => {
  cy.visit('/dashboard/bugs');
  cy.contains('My Reported Bugs').should('be.visible');
});

Cypress.Commands.add('navigateToComments', () => {
  cy.visit('/dashboard/comments');
  cy.contains('Comments').should('be.visible');
});

Cypress.Commands.add('navigateToProjects', () => {
  cy.visit('/dashboard/projects');
  cy.contains('My Projects').should('be.visible');
});

// Bug management commands
Cypress.Commands.add('createBug', (bugData: { title: string; description: string; priority: string; projectId: number }) => {
  cy.get('input[placeholder="Bug title"]').type(bugData.title);
  cy.get('textarea[placeholder="Describe the bug"]').type(bugData.description);
  cy.get('select').select(bugData.priority);
  cy.get('input[placeholder="Project ID"]').type(bugData.projectId.toString());
  cy.get('button[type="submit"]').contains('Submit Bug').click();
  cy.contains('Bug created successfully!').should('be.visible');
});

Cypress.Commands.add('editBug', (oldTitle: string, newData: { title: string; description: string; priority: string }) => {
  cy.contains(oldTitle).parent().parent().find('button').contains('Edit').click();
  cy.get('input[placeholder="Bug title"]').clear().type(newData.title);
  cy.get('textarea[placeholder="Describe the bug"]').clear().type(newData.description);
  cy.get('select').select(newData.priority);
  cy.get('button[type="submit"]').contains('Update Bug').click();
  cy.contains('Bug updated successfully!').should('be.visible');
});

Cypress.Commands.add('deleteBug', (bugTitle: string) => {
  cy.window().then((win) => {
    cy.stub(win, 'confirm').returns(true);
  });
  cy.contains(bugTitle).parent().parent().find('button').contains('Delete').click();
  cy.contains('Bug deleted successfully!').should('be.visible');
});

// Comment management commands
Cypress.Commands.add('createComment', (bugId: number, commentText: string) => {
  cy.get('input[placeholder="Enter bug ID"]').type(bugId.toString());
  cy.get('textarea[placeholder="Write your comment here"]').type(commentText);
  cy.get('button[type="submit"]').contains('Post Comment').click();
  cy.contains('Comment added successfully!').should('be.visible');
});

// Project management commands
Cypress.Commands.add('viewProjectDetails', (projectIndex: number = 0) => {
  cy.get('button').contains('View').eq(projectIndex).click();
  cy.get('dialog#project-modal').should('be.visible');
});

Cypress.Commands.add('closeProjectModal', () => {
  cy.get('dialog#project-modal').find('button').contains('Close').click();
  cy.get('dialog#project-modal').should('not.be.visible');
});

// Utility commands
Cypress.Commands.add('waitForLoading', () => {
  cy.get('.loading-spinner', { timeout: 10000 }).should('not.exist');
});

Cypress.Commands.add('checkForError', (errorMessage?: string) => {
  if (errorMessage) {
    cy.contains(errorMessage).should('be.visible');
  } else {
    cy.get('.alert-error').should('be.visible');
  }
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable
      logout(): Chainable
      navigateToBugs(): Chainable
      navigateToComments(): Chainable
      navigateToProjects(): Chainable
      createBug(bugData: { title: string; description: string; priority: string; projectId: number }): Chainable
      editBug(oldTitle: string, newData: { title: string; description: string; priority: string }): Chainable
      deleteBug(bugTitle: string): Chainable
      createComment(bugId: number, commentText: string): Chainable
      viewProjectDetails(projectIndex?: number): Chainable
      closeProjectModal(): Chainable
      waitForLoading(): Chainable
      checkForError(errorMessage?: string): Chainable
    }
  }
}