Feature: Reveal Privat Key

  Scenario: As a user, I'd like to import account with existing seed phrase
    Given I have imported account
    And I press Settings button on the Navigation Bar page

    And I am on the Settings page
    And I press Accounts Settings button on the Settings page

    And I am on the AccountsSettings page
    And I press Reveal Private Key button on the AccountsSettings page
    
    And I am on the RevealPrivateKey page
    And I press Tap To Reveal overlay on the RevealPrivateKey page
    And I verify private key
