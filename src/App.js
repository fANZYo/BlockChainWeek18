import React, { Component } from 'react'
import BankContract from '../build/contracts/Bank.json'
import getWeb3 from './utils/getWeb3'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

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
		const style = {
			height: 250,
			width: 250,
			margin: 20,
			textAlign: 'center',
			display: 'inline-block',
			verticalAlign: 'top',
			paddingTop: 20,
		};

		const buttonStyle = {
			width: 250,
			height: 250,
			margin: 20,
		}


		return (
			<MuiThemeProvider>
				<div>
					<AppBar title="Status: Access Allowed / Denied" />
					<div>
						<div>
							<Paper style={style} zDepth={1}>
								<p className="total">950.00 Kina</p>
							</Paper>
							<RaisedButton label="Deposit" style={buttonStyle} backgroundColor="#81C784" />
						</div>
						<div>
							<RaisedButton label="Payment Transfer" style={buttonStyle} backgroundColor="#80DEEA" />
							<RaisedButton label="Withdraw" style={buttonStyle} backgroundColor="#E57373" />
						</div>
					</div>
					<div className="right-side"></div>
				</div>
			</MuiThemeProvider>
		);
	}
}
export default App
