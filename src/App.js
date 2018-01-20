import React, { Component } from 'react'
import Bank from '../build/contracts/Bank.json'
import getWeb3 from './utils/getWeb3'
import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import Paper from 'material-ui/Paper'

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

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
    // return (
    //   <div className="App">
    //     <nav className="navbar pure-menu pure-menu-horizontal">
    //         <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
    //     </nav>

    //     <main className="container">
    //       <div className="pure-g">
    //         <div className="pure-u-1-1">
    //           <h1>Good to Go!</h1>
    //           <p>Your Truffle Box is installed and ready.</p>
    //           <h2>Smart Contract Example</h2>
    //           <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
    //           <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
    //           <p>The stored value is: {this.state.storageValue}</p>
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // );
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar title="Access Allow" />
        <div>
          <div>
            <div>
              <Paper style={style} zDepth={1} />
              <Paper style={style} zDepth={1} />
            </div>
            <div>
              <Paper style={style} zDepth={1} />
              <Paper style={style} zDepth={1} />
            </div>
          </div>
          <div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App
