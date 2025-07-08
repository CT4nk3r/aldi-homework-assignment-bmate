describe('Login Feature', () => {
  beforeEach(() => {
    cy.visit('/log-in.html');

    cy.get('#onetrust-accept-btn-handler').click({ force: true });

    cy.get('.at-login_lnk').click();
  });

  it('should login successfully with valid credentials', () => {
    cy.fixture('userData.json').then((user) => {
      const { email, password } = user;

      cy.url().should('include', '/hu/log-in.html');

      cy.get('#member_login_email').type(email);
      cy.get('#member_login_password').type(password);

      cy.get('#login_submit').click();

      cy.url().should('not.include', '/log-in.html');
      cy.url().should('include', '/hu/my-profile.html');
    });
  });

  
  it('should show error for invalid password', () => {
    cy.fixture('userData.json').then((user) => {
      const { email, password } = user;

      cy.url().should('include', '/hu/log-in.html');

      cy.get('#member_login_email').type(email);
      cy.get('#member_login_password').type('badpassword123');

      cy.get('#login_submit').click();

      cy.url().should('include', '/hu/log-in.html');
      cy.get('.col_add-padding-right > .on-login-fail-generic-msg')
        .should('include.text', `Az email-cím és a jelszó nem egyeznek meg.`);
    });
  });
});
