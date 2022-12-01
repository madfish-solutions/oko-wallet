Feature: Reveal Privat Key

@dev
  Scenario: As a user, I'd like to import account with existing seed phrase
    Given I have imported account
    And I press Settings button on the Navigation Bar page

    And I am on the Settings page
    And I press Accounts Settings button on the Settings page

    And I am on the AccountsSettings page
    And I press Reveal Seed Phrase button on the AccountsSettings page
    And I press Tap To Reveal layout on the RevealSeedPhrase page
    And I check my mnemonic

