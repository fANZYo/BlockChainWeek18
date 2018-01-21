import React, { Component } from 'react'
import BankContract from '../build/contracts/Bank.json'
import getWeb3 from './utils/getWeb3'

// Material ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import Dialog from 'material-ui/Dialog'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField';

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			storageValue: 0,
			web3: null,
			bank: null,
			showTransferDialog: false,
			transferWhoValue: 0,
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

	balance = (from = this.state.accounts[0]) => {
		this.state.bank.Balance.call({from}).then((res) => {
			this.setState({balance: res.c[0]})
		});
	};

	handleTransfer = () => {
		this.setState({showTransferDialog: true});
	};

	handleClose = (event) => {
		this.setState({showTransferDialog: false});
	};

	handleTransferSubmit = (event) => {
		this.transfer(this.state.transferAmount, this.state.accounts[0], this.state.accounts[this.state.transferWhoValue])
		this.setState({showTransferDialog: false});
	};

	handleWhoChange = (event, index, value) => {
		this.setState({transferWhoValue: value})
	};

	handleTransferAmountChange = (event, value) => {
		this.setState({transferAmount: value})
	}

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
		};

		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onClick={this.handleTransferSubmit}
			/>,
		];

		return (
			<MuiThemeProvider>
				<div>
					<AppBar title="Status: Access Allowed / Denied" />
					<div>
						<div>
							<Paper style={style} zDepth={1}>
								<p className="total">{this.state.balance/10000} Ether</p>
								<p className="total">{(this.state.balance/10000 * 1098.14 * 3.25).toFixed(2)} Kina</p>
							</Paper>
							<RaisedButton label="Deposit" style={buttonStyle} backgroundColor="#673AB7" labelColor="#FFF"  />
						</div>
						<div>
							<RaisedButton label="Payment Transfer" style={buttonStyle} backgroundColor="#E91E63" labelColor="#fff" onClick={this.handleTransfer} />
							<Dialog
								title="Dialog With Actions"
								modal={false}
								open={this.state.showTransferDialog}
								onRequestClose={this.handleClose}
								actions={actions}
							>
								<SelectField
									floatingLabelText="Frequency"
									value={this.state.transferWhoValue}
									onChange={this.handleWhoChange}
								>
									<MenuItem value={1} primaryText="Villager1" />
									<MenuItem value={2} primaryText="Villager2" />
									<MenuItem value={3} primaryText="Villager3" />
								</SelectField>
								<TextField floatingLabelText="Amount" type="number" onChange={this.handleTransferAmountChange} />
							</Dialog>
							<RaisedButton label="Withdraw" style={buttonStyle} backgroundColor="#009688" labelColor="#FFFFFF" />
						</div>
					</div>
					<div className="right-side"></div>
				</div>
			</MuiThemeProvider>
		);
	}
}
export default App


