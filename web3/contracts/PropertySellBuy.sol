// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract PropertySellBuy {
    struct Transaction {
        address seller;
        address buyer;
        uint256 propertyId;
        uint256 amount;
    }

    Transaction[] public transactions;

    event TransactionCreated(
        address indexed seller,
        address indexed buyer,
        uint256 propertyId,
        uint256 amount
    );

    function createTransaction(
        address _seller,
        uint256 _propertyId,
        uint256 _amount
    ) public {
        Transaction memory transaction =
            Transaction(_seller, msg.sender, _propertyId, _amount);
        transactions.push(transaction);
        emit TransactionCreated(_seller, msg.sender, _propertyId, _amount);
    }

    function getTransactionByProductID(uint256 _propertyId)
        public
        view
        returns (Transaction memory)
    {
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].propertyId == _propertyId) {
                return transactions[i];
            }
        }
    }

}