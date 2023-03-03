Feature: Create new wallet

  Scenario: As a user, I'd like to create account with new seed phrase
    Given I am on the Welcome page
    And I press Create New Wallet button on the Welcome page

    And I am on the CreateNewWallet page
    And I press Tap To Reveal layout on the CreateNewWallet page
    And I save my mnemonic
    And I press Mnemonic Saved checkbox on the CreateNewWallet page
    And I press Next button on the CreateNewWallet page

    And I am on the VerifyMnemonic page
    And I verify my mnemonic
    And I press Next button on the VerifyMnemonic page

    And I am on the AlmostDone page
    And I enter password into Password input on the AlmostDone page
    And I enter password into Password Confirm input on the AlmostDone page
    And I press Create button on the AlmostDone page

    And I am on the WalletCreated page
    And I press Accept Terms checkbox on the WalletCreated page
    And I press Get started button on the WalletCreated page

    Then I am on the Wallet page
