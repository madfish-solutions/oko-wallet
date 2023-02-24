Feature: Add imported account by private key

  Scenario: As a user, I'd like to add imported account by private key
    Given I have imported account
    And I press Accounts Selector button on the Wallet page

    And I am on the AccountsSelector page
    And I press Account Adding button on the AccountsSelector page

    And I select Private Key as account adding method

    And I am on the AddNewAccountByPrivateKey page
    And I enter private key into Private Key input on the AddNewAccountByPrivateKey page
    And I press Import button on the AddNewAccountByPrivateKey page

    And I am on the Wallet page
    And I press Accounts Selector button on the Wallet page

    And I am on the AccountsSelector page
    And I see Account 2 on the AccountsSelector page
    And I press Close button on the HeaderTitle page

    And I am on the Wallet page
    And I press Receive button on the NavigationBar page
    And I verify imported by private key public key