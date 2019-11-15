import React, { PureComponent } from 'react';
import {Dialog, DialogActions, DialogContent, Button, LinearProgress} from '@material-ui/core';
import {CheckCircleOutline, HighlightOff} from '@material-ui/icons';
import classNames from 'classnames';
import './styles.css';

class ResultDialog extends PureComponent {
    render() {
        const {open, handleClose, imageToClassify, isHotdog, info} = this.props;

        return (
            <Dialog
                open={open}
            >
                <DialogContent className='result-content'>
                    {
                        isHotdog != null 
                            ? (
                                <div className={classNames({success: isHotdog, error: !isHotdog})}>
                                    <h2>{`${isHotdog ? '': 'not a '}hotdog`}</h2>
                                    <div className='icon-wrapper'>
                                        {
                                            isHotdog ? <CheckCircleOutline fontSize='large' /> : <HighlightOff fontSize='large' />
                                        }
                                    </div>
                                    <div className='classification-info'>
                                        {
                                            info.map(({className, probability}) => (
                                                <div key={className}>
                                                    <div className='classification'>{`classnames: ${className}`}</div>
                                                    <div>{`probability: ${probability * 100}%`}</div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>                

                            )
                            : (<LinearProgress />)
                    }
                    {imageToClassify && (<img src={imageToClassify} alt="classified" />)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ResultDialog;