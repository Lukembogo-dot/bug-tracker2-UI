/// <reference types="cypress" />

describe('Login Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure clean state
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should display the login form', () => {
    cy.visit('http://localhost:5173/userLogin');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Login');
  });

  it('should login successfully with valid credentials', () => {
    cy.visit('http://localhost:5173/userLogin');
    cy.get('input[type="email"]').type('livuser@example.com');
    cy.get('input[type="password"]').type('123456789');
    cy.get('button[type="submit"]').click();
    // Assuming successful login navigates to dashboard
    cy.url().should('include', '/dashboard');
    // Check if token is stored in localStorage
    cy.window().its('localStorage.token').should('exist');
  });

  it('should show error with invalid credentials', () => {
    cy.visit('http://localhost:5173/userLogin');
    cy.get('input[type="email"]').type('invalid@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    // Check for error message
    cy.contains('Login failed').should('be.visible');
  });

  it('should validate email format', () => {
    cy.visit('http://localhost:5173/userLogin');
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    // Assuming client-side validation prevents submission or shows error
    // If using yup, it might show validation error
    cy.get('input[type="email"]:invalid').should('exist'); // Or check for specific error text if displayed
  });

  it('should require password', () => {
    cy.visit('http://localhost:5173/userLogin');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();
    // Password is required, so form shouldn't submit or show error
    cy.url().should('not.include', '/dashboard');
  });
});