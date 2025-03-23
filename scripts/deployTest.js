

async function main() {
    console.log(process.env.SEPOLIA_RPC_URL);
    console.log(process.env.PRIVATE_KEY);
    console.log(process.env.ETHERSCAN_API_KEY);
}

main().then().catch((error) => {
    console.error(error)
    process.exit(0)
})