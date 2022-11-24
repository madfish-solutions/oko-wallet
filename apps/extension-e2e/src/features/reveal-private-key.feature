Feature: Reveal Privat Key

@dev
  Scenario: As a user, I'd like to import account with existing seed phrase
    Given I am on the Welcome page
    And I press Import Existing Wallet button on the Welcome page

    And I am on the ImportExistingWallet page
    And I enter my mnemonic
    And I press Next button on the ImportExistingWallet page

    And I am on the AlmostDone page
    And I enter password into Password input on the AlmostDone page
    And I enter password into Password Confirm input on the AlmostDone page
    And I press Accept Terms checkbox on the AlmostDone page
    And I press Create button on the AlmostDone page

    And I am on the Wallet page
    And I press Settings button on the Navigation Bar page

    And I am on the Settings page
    And I press Accounts Settings button on the Settings page

    And I am on the AccountsSettings page
    And I press Reveal Private Key button on the AccountsSettings page
    
    And I am on the RevealPrivateKey page
    And I press Tap To Reveal overlay on the RevealPrivateKey page
    And I verify private key
