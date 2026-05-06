describe('Aplicacion', () => {

  it('carga pagina principal', () => {

    cy.visit('http://localhost:4200');

  });

  it('hace click en boton', () => {

    cy.visit('http://localhost:4200');

    cy.contains('Click aquí').click();

  });

  it('muestra contador', () => {

    cy.visit('http://localhost:4200');

    cy.contains('Click aquí').click();

    cy.contains('1');

  });

});