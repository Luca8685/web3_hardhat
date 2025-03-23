// import ethers.js
// create main function
// execute main function

const { ethers } = require("hardhat") 

async function main() {
    // create factory 
    const myCounterFactory = await ethers.getContractFactory("MyCounter")
    console.log("contract deploying")
    // deploy contract from factory
    const myCounter = await myCounterFactory.deploy()
    await myCounter.waitForDeployment()
    console.log(`contract has been deployed successfully, contract address is ${myCounter.target}`);

    // verify
    if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        //等5个区块
        console,log("Waiting for 5 confirmations")
        await myCounter.deploymentTransaction().wait(5)
        await verifyFundMe(myCounter.target)
    } else {
        console.log("verification skipped..")
    }
    
}

async function verifyFundMe(addr) {
    // verify
    await hre.run("verify:verify", {
        address: addr,
        constructorArguments: [],
      });
}

main().then().catch((error) => {
    console.error(error)
    process.exit(0)
})