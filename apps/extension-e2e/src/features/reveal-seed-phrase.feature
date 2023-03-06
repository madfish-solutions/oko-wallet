Feature: Reveal Private Key

  Scenario: As a user, I'd like to reveal seed phrase
    Given I have imported account
    And I press Settings button on the Navigation Bar page

    And I am on the Settings page
    And I press Reveal Seed Phrase button on the Settings page

    And I am on the ConfirmAccess page
    And I enter password into Password input on the ConfirmAccess page
    And I press Reveal Sensitive Data button on the ConfirmAccess page

    And I am on the RevealSeedPhrase page
    And I press Tap To Reveal layout on the RevealSeedPhrase page
    And I check my mnemonic

