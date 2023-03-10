Feature: Add imported account by mnemonic
  
  Scenario: As a user, I'd like to add imported account by mnemonic
    Given I have imported account
    And I press Accounts Selector button on the Wallet page

    And I am on the AccountsSelector page
    And I press Account Adding button on the AccountsSelector page

    And I select Seed Phrase as account adding method
    And I enter old mnemonic

    And I am on the AddNewAccountBySeed page
    And I press Import button on the AddNewAccountBySeed page

    And I am on the Wallet page
    And I press Accounts Selector button on the Wallet page

    And I am on the AccountsSelector page
    And I see Account 2 on the AccountsSelector page
