
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import '../scripts/capture'


class Verify extends Component {
	
	componentWillMount() {
		this.state = {
			CanTakePicture: true
		};
	}
	
	displayMainSpace() {
		return (
			<div>
			<video 
				id="video"
			>
				Video stream not available.
			</video>
			<canvas 
				id="canvas"
			>
				</canvas>
			</div>
		);
	}

	displayButton() {
		if (this.state.CanTakePicture) {
			return (
				<RaisedButton
				  id="startbutton"
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
				  id="retakebutton"
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
