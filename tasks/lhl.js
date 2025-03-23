const { task } = require("hardhat/config")


task("lhl", "Test for HardHat Tasks")
    .addParam("addr", "contract address")
    .setAction(async(taskArgs, hre) => {

        const myCounterFactory = await ethers.getContractFactory("MyCounter")
        const MyCounter = myCounterFactory.attach(taskArgs.addr)

        const val = await MyCounter.getCount()
        console.log(val);
        console.log(process.env.SEPOLIA_RPC_URL);
        console.log(process.env.PRIVATE_KEY);
        console.log(process.env.ETHERSCAN_API_KEY);

        //查看这个地址有多少钱
        const balanceOfAddr = await ethers.provider.getBalance("0x4814D09BA8e141f755B08F08C8cc07A221274E81")
        console.log(`Balance of the contract is ${balanceOfAddr}`)
})

module.exports = {}