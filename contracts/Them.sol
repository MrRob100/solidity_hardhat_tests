// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Them {
    mapping(uint => Book) public publicBooks;
    mapping(address => mapping(uint => Book)) public myBooks;
    mapping(address => uint) public myBooksCounter;

    uint public publicBookCounter = 0;

    struct Book {
        string title;
        string author;
    }

    function getPublicBookCounter() public view returns (uint) {
        return publicBookCounter;
    }

    function addPublicBook(string memory _title, string memory _author) public {
        publicBookCounter++;
        publicBooks[publicBookCounter] = Book(_title, _author);
    }

    //    function addMyBook(uint _id, string memory _title, string memory _author) public {
    //        myBooks[msg.sender][_id] = Book(_title, author);
    //    }

    function addMyBook(string memory _title, string memory _author) public {
        myBooksCounter[msg.sender]++;
        myBooks[msg.sender][myBooksCounter[msg.sender]] = Book(_title, _author);
    }
}