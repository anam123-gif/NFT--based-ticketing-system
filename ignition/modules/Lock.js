import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTTicketingModule = buildModule("NFTTicketingModule", (m) => {
  // Deploy NFT Ticketing Platform
  const nftTicketingSystem = m.contract("NFTTicketingSystem");

  // Example Ticket Parameters
  const EXAMPLE_TICKET = {
    recipient: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Example address
    tokenId: 1,
    tokenURI: "https://example.com/tickets/1"
  };

  // Issue initial ticket after deployment
  m.call(nftTicketingSystem, "issueTicket", [
    EXAMPLE_TICKET.recipient,
    EXAMPLE_TICKET.tokenId,
    EXAMPLE_TICKET.tokenURI
  ], { id: "issueExampleTicket" });

  return { nftTicketingSystem };
});

export default NFTTicketingModule;