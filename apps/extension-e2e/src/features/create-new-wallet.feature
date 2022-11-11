Feature: Create new wallet

  @dev
  Scenario: As a user, I'd like to create account with new seed phrase
    Given I am on the Welcome page
    And I press Create New Wallet button on the Welcome page

    Then I am on the CreateNewWallet page
