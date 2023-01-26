Feature: Add imported account by mnemonic

@dev
  Scenario: As a user, I'd like to add imported account by mnemonic
    Given I have imported account
    And I press Accounts Selector button on the Wallet page

    And I am on the AccountsSelector page
    And I press Account Adding button on the AccountsSelector page
    
    And I select Seed Phrase as account adding method
    

