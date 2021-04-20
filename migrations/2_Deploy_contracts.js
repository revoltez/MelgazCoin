const DZToken = artifacts.require("DZToken.sol");
const DZTokenSale = artifacts.require("DZTokenSale.sol");

module.exports = async function (deployer) {
	var Token = await deployer.deploy(DZToken, 10000000);
	// passing the token price and the Token smart contract Address to the tokensale sm contract
	return deployer.deploy(DZTokenSale, DZToken.address, 1000000000000000);
};
