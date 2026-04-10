import hre from "hardhat";

async function main() {
  const CarbonCredits = await hre.ethers.getContractFactory("CarbonCredits");
  const carbonCredits = await CarbonCredits.deploy();

  await carbonCredits.waitForDeployment();

  console.log(`CarbonCredits deployed to: ${await carbonCredits.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
