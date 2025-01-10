// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTTicketingSystem is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _ticketIds;

    struct Ticket {
        uint256 ticketId;
        address owner;
        uint256 eventId;
        string uri;
        bool used;
    }

    struct Event {
        uint256 royaltyPercentage;
    }

    mapping(uint256 => Ticket) public tickets;
    mapping(uint256 => Event) public events;

    constructor() ERC721("EventNFTTicket", "ENT") {}

    function issueTicket(address buyer, uint256 eventId, string memory uri) public onlyOwner {
        _ticketIds.increment();
        uint256 ticketId = _ticketIds.current();
        tickets[ticketId] = Ticket(ticketId, buyer, eventId, uri, false);
        _mint(buyer, ticketId);
        _setTokenURI(ticketId, uri);
        emit TicketIssued(ticketId, buyer, eventId);
    }

    function resellTicket(uint256 ticketId, address newOwner) public {
        require(msg.sender == tickets[ticketId].owner, "Only the ticket owner can resell");
        require(!tickets[ticketId].used, "Ticket has already been used");
        tickets[ticketId].owner = newOwner;
        _transfer(msg.sender, newOwner, ticketId);
        emit TicketResold(ticketId, newOwner);
    }

    function validateTicket(uint256 ticketId) public onlyOwner {
        require(!tickets[ticketId].used, "Ticket has already been used");
        tickets[ticketId].used = true;
        emit TicketUsed(ticketId);
    }

    function setEventRoyalty(uint256 eventId, uint256 royaltyPercentage) public onlyOwner {
        events[eventId].royaltyPercentage = royaltyPercentage;
    }

    function getEventRoyalty(uint256 eventId) public view returns (uint256) {
        return events[eventId].royaltyPercentage;
    }

    function getTicketUsed(uint256 ticketId) public view returns (bool) {
        return tickets[ticketId].used;
    }

    function getTicketId() public view returns (uint256) {
        return _ticketIds.current();
    }

    // The following functions are overrides required by Solidity.
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal override(ERC721) {
        super._transfer(from, to, tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    event TicketIssued(uint256 indexed ticketId, address indexed owner, uint256 eventId);
    event TicketResold(uint256 indexed ticketId, address indexed newOwner);
    event TicketUsed(uint256 indexed ticketId);
}
