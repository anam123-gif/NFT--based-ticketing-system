const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTTicketingSystem", function () {
  let nftTicketingSystem;
  let owner;
  let buyer;
  let ticketId;
  let eventId = 1;
  let royaltyPercentage = 10;

  beforeEach(async function () {
    [owner, buyer] = await ethers.getSigners();
    const NFTTicketingSystem = await ethers.getContractFactory("NFTTicketingSystem");
    nftTicketingSystem = await NFTTicketingSystem.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right name and symbol", async function () {
      expect(await nftTicketingSystem.name()).to.equal("EventNFTTicket");
      expect(await nftTicketingSystem.symbol()).to.equal("ENT");
    });
  });

  describe("Ticket Issuance", function () {
    it("Should issue a new ticket", async function () {
      await nftTicketingSystem.issueTicket(buyer.address, eventId, "(link unavailable)");
      ticketId = await nftTicketingSystem.getTicketId();
      expect(await nftTicketingSystem.ownerOf(ticketId)).to.equal(buyer.address);
    });
  });

  describe("Ticket Resale", function () {
    beforeEach(async function () {
      await nftTicketingSystem.issueTicket(buyer.address, eventId, "(link unavailable)");
      ticketId = await nftTicketingSystem.getTicketId();
    });

    it("Should resell a ticket", async function () {
      await nftTicketingSystem.connect(buyer).resellTicket(ticketId, owner.address);
      expect(await nftTicketingSystem.ownerOf(ticketId)).to.equal(owner.address);
    });
  });

  describe("Ticket Validation", function () {
    beforeEach(async function () {
      await nftTicketingSystem.issueTicket(buyer.address, eventId, "(link unavailable)");
      ticketId = await nftTicketingSystem.getTicketId();
    });

    it("Should validate and mark ticket as used", async function () {
      await nftTicketingSystem.validateTicket(ticketId);
      expect((await nftTicketingSystem.tickets(ticketId)).used).to.be.true;
    });
  });

  describe("Event Royalty", function () {
    it("Should set royalty percentage for an event", async function () {
      await nftTicketingSystem.setEventRoyalty(eventId, royaltyPercentage);
      expect(await nftTicketingSystem.getEventRoyalty(eventId)).to.equal(royaltyPercentage);
    });
  });
});
