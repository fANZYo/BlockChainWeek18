import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon';
import '../scripts/capture'


class Verify extends Component {
	
	componentWillMount() {
		this.state = {
			CanTakePicture: true
		};
	}
	
	displayMainSpace() {
		// if(this.state.CanTakePicture) {
		// 	return (
		// 		<video id="video">Video stream not available.</video>
		// 	);
		// } else {
		// 	return (
		// 		<img id="photo" />
		// 	);
		// }
			return (
				<div>
				<video id="video">Video stream not available.</video>
				<canvas id="canvas">
  				</canvas>
				</div>
			);
	}

	displayButton() {
		if (this.state.CanTakePicture) {
			return (
				<RaisedButton
				  onClick={() => {
			      	this.setState({
						CanTakePicture: false
					});
			      }}
			      target="_blank"
			      label="Take Picture"
			      secondary={true}
			      icon={<FontIcon className="muidocs-icon-custom-github" />}
			    />
			);
		} else {
			return (
				<RaisedButton
			      onClick={() => {
			      	this.setState({
						CanTakePicture: true
					});
			      }}
			      target="_blank"
			      label="Retake Picture"
			      secondary={true}
			      icon={<FontIcon className="muidocs-icon-custom-github" />}
			    />
			);
		}
	}

	render() {
		return (
			<div>
				{this.displayMainSpace()}
				{this.displayButton()}
			</div>
		);
	}
}
export default Verify;
