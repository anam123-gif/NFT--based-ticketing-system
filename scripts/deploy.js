const { ethers } = require("hardhat");

async function main() {
    const NFTTicketingSystem = await ethers.getContractFactory("NFTTicketingSystem");
    console.log("Deploying NFTTicketingSystem contract...");
    
    const nftTicketingSystem = await NFTTicketingSystem.deploy();
    await nftTicketingSystem.deployed();
    
    console.log("NFTTicketingSystem deployed to:", nftTicketingSystem.address);

    // Optional: Issue a test ticket
    const TICKET_PRICE = ethers.utils.parseEther("0.1");
    await nftTicketingSystem.issueTicket(
        await (await ethers.getSigners())[0].getAddress(),
        1,
        "https://example.com/ticket/1"
    );
    
    console.log("Test ticket issued successfully");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });