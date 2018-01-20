import React, { Component } from 'react'
import Bank from '../build/contracts/Bank.json'
import getWeb3 from './utils/getWeb3'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

const style = {
  height: 250,
  width: 250,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
  verticalAlign: 'top',
  paddingTop: '20',
};

const buttonStyle = {
  width: 250,
  height: 250,
  margin: 20,
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
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
    const bank = contract(Bank)
    bank.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var bankInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      bank.deployed().then((instance) => {
        bankInstance = instance

        // Stores a given value, 5 by default.
        return bankInstance.Balance({from: '0xfd7597Af18fB14fe283Bee7279ca3DdA4115df28'});
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result })
      })
    })
  }

  

  render() {

    return (
        <MuiThemeProvider>
          <div>
            <AppBar title="Status: Access Allowed / Denied" />
            <div>
              <div>
                  <Paper style={style} zDepth={1}>
                    <div className="total">950.00 Kina</div>
                  </Paper>
                  <RaisedButton label="Deposit" primary={true} style={buttonStyle} />
                </div>
                <div>
                  <RaisedButton label="Payment Transfer" primary={true} style={buttonStyle} />
                  <RaisedButton label="Withdraw" primary={true} style={buttonStyle} />
                </div>
            </div>
            <div className="right-side"></div>
          </div>
        </MuiThemeProvider>
    );
  }
}
export default App
