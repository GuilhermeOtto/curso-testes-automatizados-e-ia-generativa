/// <reference types="cypress" />
import React from 'react';
import { ThankYouPage } from '../../../emoji-mart/src/components/ThankYouPage';

describe('ThankYouPage component', () => {
  const orderNumber = '12345';
  const onBackToStore = cy.stub();

  beforeEach(() => {
    cy.mount(<ThankYouPage orderNumber={orderNumber} onBackToStore={onBackToStore} />);
  });

  it('renders the Thank You message', () => {
    cy.contains('Thank You for Your Purchase!').should('be.visible');
  });

  it('displays the order number', () => {
    cy.contains('Order Number').should('be.visible');
    cy.contains(orderNumber).should('be.visible');
  });

  it('calls onBackToStore when the button is clicked', () => {
    cy.contains('Back to Store').click();
    cy.wrap(onBackToStore).should('have.been.called');
  });

  it('has a CheckMark icon', () => {
    cy.get('svg').should('have.class', 'text-green-500');
  });
});