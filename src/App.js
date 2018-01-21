import React, { Component } from 'react'
import BankContract from '../build/contracts/Bank.json'
import getWeb3 from './utils/getWeb3'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			storageValue: 0,
			web3: null,
			bank: null,
		}
	}

	componentWillMount() {
		// Get network provider and web3 instance.
		// See utils/getWeb3 for more info.

		getWeb3
			.then(results => {
				this.setState({
					web3: results.web3
				})

				// Instantiate contract once web3 provided.
				this.instantiateContract()
			})
			.catch(() => {
				console.log('Error finding web3.')
			})
	}

	instantiateContract() {
		/*
		 * SMART CONTRACT EXAMPLE
		 *
		 * Normally these functions would be called in the context of a
		 * state management library, but for convenience I've placed them here.
		 */

		const contract = require('truffle-contract')
		const bank = contract(BankContract)
		bank.setProvider(this.state.web3.currentProvider)

		// Get accounts.
		this.state.web3.eth.getAccounts((error, accounts) => {
			bank.deployed().then((instance) => {
				this.setState({ bank: instance, accounts: accounts.map((acc) => acc.toString())});
			})
		})
	}

	deposit = (amount, from = this.state.accounts[0]) => {
		this.state.bank.Deposit(amount, {from})
	};

	withdraw = (amount, from = this.state.accounts[0]) => {
		this.state.bank.Withdraw(amount, {from}).then((res) => console.log(res))
	};

	transfer = (amount, from = this.state.accounts[0], to) => {
		this.state.web3.eth.sendTransaction({from, to, value: this.state.web3.toWei(amount, 'ether')}, (err, res) => {
			this.balance(from);
		})
	};

	balance = (from = this.state.accounts[1]) => {
		this.state.bank.Balance.call({from}).then((res) => console.log(res))
	};

	render() {
		return (
			<h1 onClick={() => {this.transfer(3, this.state.accounts[0], this.state.accounts[1])}}>Hello world</h1>
		);
	}
}

export default App
