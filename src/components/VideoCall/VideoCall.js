import React from 'react';
import './VideoCall.css'
import DoctorImage from '../../assets/images/doctorVideoImage.png';
import PatientImage from '../../assets/images/patientImage.png'

const VideoCall = () => {
    return (
        <div className="videoscreen">
            <img className='doctor-image' src={DoctorImage} />
            <img className='patient-image' src={PatientImage} />
        </div>
    );
};

export default VideoCall;
