
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import '../scripts/capture'
// Styles
import './index.css'

class Transfer extends Component {
	
	componentWillMount() {
		this.state = {
			hasVerify: false
		};
	}
	
	displayTransfer() {
		if(this.state.hasVerify) {
			return (
				<RaisedButton
				  target="_blank"
			      label="Verify"
			      secondary={true}
			      icon={<FontIcon className="muidocs-icon-custom-github" />}
			    />
			);
		} else {
			return (
				<RaisedButton
				  target="_blank"
			      label="Confirm"
			      secondary={true}
			      icon={<FontIcon className="muidocs-icon-custom-github" />}
			    />
			);
		}
	}

	render() {
		return (
			<List>
				<ListItem >
					<TextField
						hintText="Insert received account"
						floatingLabelText="Send to"
				    />
				    <RaisedButton
					  target="_blank"
				      label="QR Scan"
				      secondary={true}
				      icon={<FontIcon className="muidocs-icon-custom-github" />}
				    />
				</ListItem>
				<ListItem >
					<TextField
						hintText="insert amount"
						floatingLabelText="Amount"
				    />
				    <RaisedButton
					  target="_blank"
				      label="50"
				      secondary={true}
				      icon={<FontIcon className="muidocs-icon-custom-github" />}
				    />
				    <RaisedButton
					  target="_blank"
				      label="100"
				      secondary={true}
				      icon={<FontIcon className="muidocs-icon-custom-github" />}
				    />
				    <RaisedButton
					  target="_blank"
				      label="200"
				      secondary={true}
				      icon={<FontIcon className="muidocs-icon-custom-github" />}
				    />
				    <RaisedButton
					  target="_blank"
				      label="1000"
				      secondary={true}
				      icon={<FontIcon className="muidocs-icon-custom-github" />}
				    />
				</ListItem>
				<ListItem
				>
					{this.displayTransfer()}
				</ListItem>
			</List>
		);
	}
}
export default Transfer;
