
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import '../scripts/capture'


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
			<div>
				<div >
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
				</div>
				<div >
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
				</div>
				<div >
					<h2>Digital Signature:</h2>
					{this.displayTransfer()}
				</div>
			</div>
		);
	}
}
export default Transfer;
