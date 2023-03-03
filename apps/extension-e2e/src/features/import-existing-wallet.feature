Feature: Import existing wallet

  Scenario: As a user, I'd like to import account with existing seed phrase
    Given I am on the Welcome page
    And I press Import Existing Wallet button on the Welcome page

    And I am on the ImportExistingWallet page
    And I enter my mnemonic
    And I press Next button on the ImportExistingWallet page

    And I am on the AlmostDone page
    And I enter password into Password input on the AlmostDone page
    And I enter password into Password Confirm input on the AlmostDone page
    And I press Create button on the AlmostDone page

    And I am on the WalletCreated page
    And I press Accept Terms checkbox on the WalletCreated page
    And I press Get started button on the WalletCreated page

    Then I am on the Wallet page
