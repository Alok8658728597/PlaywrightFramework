Feature: E-Commerce validations

  Scenario: Placing the Order Successfully
    Given a login to the E-Commerce application with "alo2k@gmail.com" and "Santi@123456"
    When Add the item "ZARA COAT 3" to the cart
    Then Verify the "ZARA COAT 3" is checkout successfully
    When Enter valid detials and place the order
    Then Verify the order present in the order history
    