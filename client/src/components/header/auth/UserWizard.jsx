import StepWizard from 'react-step-wizard';
import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';

const UserDialog = ({ open, handleClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const stepLogin = () => {
        setCurrentStep(currentStep + 1);
    };

    const stepRegister = () => {
        setCurrentStep(currentStep + -1);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <StepWizard>
                {currentStep === 0 ? (
                    <LoginDialog
                        handleClose={handleClose}
                        stepLogin={stepLogin}
                    />
                ) : (
                    <RegisterDialog
                        handleClose={handleClose}
                        stepRegister={stepRegister}
                    />
                )}
            </StepWizard>
        </Dialog>
    );
};

export default UserDialog;
