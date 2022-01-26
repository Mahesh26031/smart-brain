import React from 'react';
import './Face.css';
import BorderBox from './BorderBox';

const Face = ({box,imageurl}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2 '>
            <img id='inputimage' alt='' src={imageurl} width='500px' height='auto'/>
            {
                    box.map((b, i) => {
                        return (
                            <BorderBox
                                key = {box[i].topRow}
                                top={box[i].topRow}
                                right={box[i].rightCol}
                                bottom={box[i].bottomRow}
                                left={box[i].leftCol}
                            />
                        );
                    })
                }
            </div>
        </div>
        
    );
}


export default Face;