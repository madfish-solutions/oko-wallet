Feature: Reveal Privat Key
  
  Scenario: As a user, I'd like to reveal private key
    Given I have imported account
    And I press Settings button on the Navigation Bar page

    And I am on the Settings page
    And I press Accounts Settings button on the Settings page

    And I am on the AccountsSettings page
    And I press Account button on the AccountsSettings page
    
    And I am on the EditAccount page
    And I press Reveal Private Key button on the EditAccount page

    And I am on the ConfirmAccess page
    And I enter password into Password input on the ConfirmAccess page
    And I press Reveal Sensitive Data button on the ConfirmAccess page

    And I am on the RevealPrivateKey page
    And I press Tap To Reveal overlay on the RevealPrivateKey page
    And I verify private key
