const { network } = require("hardhat")
const { devlopmentChains, networkConfig, LOCK_TIME, CONFIRMATIONS } = require("../helper-hardhat-config")

//getNamdeAccounts和deployments 是从 hre 中取的
/*
hardhat.config.js中配置
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    },
  }
*/
// module.exports = async ({ getNamdeAccounts, deployments }) => { 
//     const firstAccount = (await getNamedAccounts()).firstAccount
//     console.log(`first account is ${ firstAccount }`)
//     console.log("this is a deploy function")
// }

//deployments：用于跟踪之前部署的合约
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy } = deployments
    //console.log(`first account is ${ firstAccount }`)

    console.log(network.name)
    console.log(network.config.chainId)
    let dataFeedAddr
    let confirmations
    if (devlopmentChains.includes(network.name)) {
        const mockV3Aggregator = await deployments.get("MockV3Aggregator")
        dataFeedAddr = mockV3Aggregator.address
        confirmations = 0
    } else {
        dataFeedAddr = networkConfig[network.config.chainId].ethUsdDataFeed
        confirmations = CONFIRMATIONS
    }
    console.log(`dataFeedAddr account is ${dataFeedAddr}`)
    console.log(`CONFIRMATIONS is ${confirmations}`)

    const fundMe = await deploy("FundMe", {
        from: firstAccount,
        args: [LOCK_TIME, dataFeedAddr],
        log: true,
        waitConfirmations: confirmations
    })

     // remove deployments directory or add --reset flag if you redeploy contract
     
     if(hre.network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        await hre.run("verify:verify", {
            address: fundMe.address,
            constructorArguments: [LOCK_TIME, dataFeedAddr],
          });        
    } else {
        console.log("Network is not sepolia, verification skipped...")
    }

}

//npx hardhat deploy --tags fundme
module.exports.tags = ["all", "fundme"]