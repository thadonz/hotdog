import React, { PureComponent } from 'react';

class ImagePreview extends PureComponent {
    constructor(props) {
        super(props);

        this.fileInput = React.createRef();
        this.imgPreview = React.createRef();
    }

    readURL = () => {
        const input = this.fileInput.current;

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                this.imgPreview.current.src = e.target.result;
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    render() {
        return (
            <div>
                <input 
                    type="file" 
                    accept="image/*" 
                    capture 
                    ref={this.fileInput} 
                    onChange={this.readURL}
                />
                <img id="preview" src="#" alt="preview" ref={this.imgPreview} />
            </div>
        );
    }
}

export default ImagePreview;