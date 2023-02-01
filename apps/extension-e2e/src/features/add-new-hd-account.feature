Feature: Add HD Account

  Scenario: As a user, I'd like to add new hd account
    Given I have imported account
    And I press Accounts Selector button on the Wallet page

    And I am on the AccountsSelector page
    And I press Account Adding button on the AccountsSelector page
    
    And I am on the AddNewHdAccount page
    And I press Create button on the AddNewHdAccount page

    And I am on the Wallet page
    And I press Accounts Selector button on the Wallet page

    And I am on the AccountsSelector page
    And I see Account 2 on the AccountsSelector page
