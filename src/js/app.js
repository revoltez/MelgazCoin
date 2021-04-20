const Web3 = require("web3");
const DZToken = require("../../build/contracts/DZToken.json");
const DZTokenSale = require("../../build/contracts/DZTokenSale.json");
import detectEthereumProvider from "@metamask/detect-provider";
const regeneratorRuntime = require("regenerator-runtime");

const App = {
	accounts: [],
	chainId: null,
	web3: null,
	contracts: {},
	init: async function () {
		let provider = await this.DetectETHProvider();
		let web3 = new Web3(window.ethereum);
		App.web3 = web3;

		// get contract instances
		const id = await web3.eth.net.getId();
		const DZTokenAddress = DZToken.networks[id];
		const DZTokenSalAddress = DZTokenSale.networks[id];
		const contract = new web3.eth.Contract(
			DZToken.abi,
			DZTokenAddress.address
		);
		const saleContract = new web3.eth.Contract(
			DZTokenSale.abi,
			DZTokenSalAddress.address
		);

		return {
			accounts: App.accounts,
			chainId: App.chainId,
			web3: App.web3,
			DZTokenContract: contract,
			DZTokenSaleContract: saleContract,
		};
	},
	handleChainChanged: (_chainId) => {
		// handle chian changed accordingly
		window.location.reload();
	},
	DetectETHProvider: async () => {
		const provider = await detectEthereumProvider();
		if (provider) {
			console.log("Ethereum successfully detected!");
			// From now on, this should always be true:
			// provider === window.ethereum
			// Access the decentralized web!
			App.accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			console.log(App.accounts);
			App.chainId = await ethereum.request({
				method: "eth_chainId",
			});
			ethereum.on("chainChanged", App.handleChainChanged);
		} else {
			// if the provider is not detected, detectEthereumProvider resolves to null
			alert("Please install MetaMask!", error);
		}
	},
};
class DZTokenDapp {
	constructor(appConf) {
		// Populate user info
		this.appConfigs = appConf;
		this.setTokenPrice();
		this.setUserTokenNummber();
		this.setTokensSold();
		setTimeout(() => {
			$("#UserInfo").fadeIn();
		}, 1500);
		setTimeout(() => {
			$("#form-data").slideDown();
		}, 2500);
	}
	async setTokenPrice() {
		this.tokenPrice = await this.appConfigs.DZTokenSaleContract.methods
			.TokenPrice()
			.call();

		const etherValue = this.appConfigs.web3.utils.fromWei(
			this.tokenPrice,
			"ether"
		);
		$("#TokenPrice").text("" + etherValue);
	}
	async setUserTokenNummber() {
		const userTokens = await this.appConfigs.DZTokenContract.methods
			.balanceOf(this.appConfigs.accounts[0])
			.call();
		console.log(userTokens);
		$("#userTokens").text("" + userTokens);
	}
	async setTokensSold() {
		const TokensSold = await this.appConfigs.DZTokenSaleContract.methods
			.TokensSold()
			.call();

		console.log(TokensSold);
		$(".progress-bar")
			.css("width", (TokensSold / 500) * 100 + "%")
			.attr("aria-valuenow", TokensSold)
			.text("" + TokensSold + "%");
	}
	async BuyTokens(numOfTokens) {
		const receipt = await this.appConfigs.DZTokenSaleContract.methods
			.buyTokens(numOfTokens)
			.send({
				from: this.appConfigs.accounts[0],
				value: this.tokenPrice,
			});
	}
}

App.init().then((appConfigs) => {
	const Dapp = new DZTokenDapp(appConfigs);
	$("#Buy").click(() => {
		console.log("buying Tokens");
		const number = $("#NumberOfTokens").val();
		console.log(number);
		Dapp.BuyTokens(number);
	});
});
