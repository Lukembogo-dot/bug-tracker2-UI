/// <reference types="cypress" />

describe('Registration Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure clean state
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should display the registration form', () => {
    cy.visit('/register');
    cy.get('input[type="text"]').should('be.visible'); // username
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('have.length', 2); // password and confirm password
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Register');
  });

  it('should register successfully with valid data', () => {
    cy.visit('/register');
    cy.get('input[type="text"]').type('testuser'); // username
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[type="password"]').last().type('password123'); // confirm password
    cy.get('button[type="submit"]').click();
    // Check for success message
    cy.contains('Registration successful! Please login.').should('be.visible');
    // Should navigate to login after 2 seconds
    cy.url({ timeout: 3000 }).should('include', '/userLogin');
  });

  it('should validate password confirmation mismatch', () => {
    cy.visit('/register');
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[type="password"]').last().type('differentpassword');
    cy.get('button[type="submit"]').click();
    // Check for validation error
    cy.contains('Passwords must match').should('be.visible');
  });

  it('should validate email format', () => {
    cy.visit('/register');
    cy.get('input[type="text"]').type('testuser');
    cy.get('input[type="email"]').type('invalidemail');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[type="password"]').last().type('password123');
    cy.get('button[type="submit"]').click();
    // Check for validation error
    cy.contains('Invalid email').should('be.visible');
  });

  it('should validate username length', () => {
    cy.visit('/register');
    cy.get('input[type="text"]').type('ab'); // too short
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').first().type('password123');
    cy.get('input[type="password"]').last().type('password123');
    cy.get('button[type="submit"]').click();
    // Check for validation error
    cy.contains('Min 3 characters').should('be.visible');
  });

  it('should require all fields', () => {
    cy.visit('/register');
    cy.get('button[type="submit"]').click();
    // Check for multiple validation errors
    cy.contains('Username is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
    cy.contains('Confirm password is required').should('be.visible');
  });
});