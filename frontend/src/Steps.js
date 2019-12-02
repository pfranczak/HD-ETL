import React, {useState} from 'react';
import Extract from './Extract'
import Transform from './Transform';
import Load from './Load';

export default ({extractData, transformData, getTransformed}) => {
    const [currentStep, setCurrentStep] = useState(0);
    
    const nextStep = () => {
        if (currentStep !== 2) {
            setCurrentStep((currentStep => currentStep + 1));
        }
    }

    const getStepComponent = () => {
        switch (currentStep) {
            case 1:
                return <Transform transformData={transformData} nextStep={nextStep}/>;
            case 2:
                return <Load getTransformed={getTransformed}/>;
            default:
                return <Extract extractData={extractData} nextStep={nextStep}/>

        }
    }

    return (
        <div style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {getStepComponent()}
        </div>
    );
};