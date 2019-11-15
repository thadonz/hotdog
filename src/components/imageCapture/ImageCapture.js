import React, { PureComponent } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import {Input} from '@material-ui/core';
import ResultDialog from '../resultDialog/ResultDialog';
import './styles.css';

class ImagePreview extends PureComponent {
    state = {
        hotdog: null,
        classificationInfo: '',
        image: null,
        showResults: false
    };

    constructor(props) {
        super(props);

        this.imgToClassify = React.createRef();
    }

    readURL = (event) => {
        const input = event.target;

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                this.showResultDialog(e.target.result);

                this.imgToClassify.current.src = e.target.result;
                this.classifyImage();
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    };

    classifyImage = async () => {
        console.log('Loading mobilenet..');

        // Load the model.
        let net = await mobilenet.load();
        console.log('Successfully loaded model');
      
        // Make a prediction through the model on our image.
        const imgEl = this.imgToClassify.current;
        const result = await net.classify(imgEl);
        console.log(result);

        this.isHotdog(result);
    };

    isHotdog = (classifications) => {
        const threshold = 0.8;
        let hotdog = null;

        if(classifications && Array.isArray(classifications) && classifications.length > 0) {
            //only care about the top classification
            const classification = classifications[0];

            hotdog = classification.className.toLowerCase().includes("hotdog") && classification.probability >= threshold;
        } 

        this.setState({hotdog, classificationInfo: classifications});
    };

    hideResultDialog = () => this.setState({showResults: false, hotdog: null, classifications: '', image: null});
    showResultDialog = (image) => this.setState({showResults: true, image});

    render() {
        const {hotdog, classificationInfo, showResults, image} = this.state;

        return (
            <div>
                <Input 
                    type="file" 
                    accept="image/*" 
                    capture 
                    onChange={this.readURL}
                />
                <ResultDialog 
                    open={showResults} 
                    handleClose={this.hideResultDialog} 
                    imageToClassify={image} 
                    info={classificationInfo}
                    isHotdog={hotdog}
                />
                <div style={{visibility: 'hidden'}}>
                    <img id='img-preview' src="#" alt="preview" ref={this.imgToClassify} />
                </div>
                
            </div>
        );
    }
}

export default ImagePreview;