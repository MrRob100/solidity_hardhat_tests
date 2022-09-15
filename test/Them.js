const { expect } = require("chai");
const { ethers } = require("hardhat");

require("@nomiclabs/hardhat-waffle");

describe("Them", function () {
    let contract;
    let owner;

    beforeEach(async function () {

        //get contract
        const Them = await ethers.getContractFactory("Them");

        //deploy contract passing in any constructor args
        const them = await Them.deploy();

        //wait till actually deployed
        contract = await them.deployed();

        [owner] = await ethers.getSigners();
    });

    it("Should return no books on init", async function () {
        let publicBookCounter = await contract.getPublicBookCounter();
        expect(publicBookCounter).to.equal(0);
    });

    it("Should be able to add and retrieve a book", async function () {
        await contract.addPublicBook("Harry Potter", "J K Rowling");
        let publicBooksFirst = await contract.publicBooks(1);
        expect(publicBooksFirst['title']).to.equal("Harry Potter");
        expect(publicBooksFirst['author']).to.equal("J K Rowling");

        let publicBookCounter = await contract.getPublicBookCounter();
        expect(publicBookCounter).to.equal(1);
    });

    it("Should be able to add and retrieve a book belonging to a user", async function () {
        await contract.addMyBook("Goosebumps", "R L Stine");
        let address = await owner.getAddress();
        let myBook = await contract.myBooks(address, 1);
        expect(myBook["title"]).to.equal("Goosebumps");
        expect(myBook["author"]).to.equal("R L Stine");

        let myBooksCounter = await contract.myBooksCounter(address);
        expect(myBooksCounter).to.equal(1);
    });

    //
    // it("Should show the book I added to my books", async function () {
    //     const test = await contract.subtract(6, 2);
    //     expect(test).to.equal(4);
    // });
});