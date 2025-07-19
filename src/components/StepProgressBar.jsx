import React from 'react'
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import '../styleComponents/stepperStyle.css'
import Container from '@mui/material/Container';
import StepLabel from '@mui/material/StepLabel';


function StepProgressBar({step}) {
  const steps = [
    'Satisfaction',
    'Source',
    'Information',
  ];
  return (
    <Container className='stepper' maxWidth="sm" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div style={{width: '100%'}}>
            <Stepper activeStep={step} alternativeLabel
            sx={{
              padding: '24px 0',
              '& .MuiStepLabel-label': {
                fontSize: '1rem',
                color: '#888',
              },
              '& .Mui-active .MuiStepLabel-label': {
                color: '#1976d2', // Active step label color
                fontWeight: 'bold',
              },
              '& .MuiStepIcon-root': {
                color: '#ccc', // default icon color
              },
              '& .Mui-active .MuiStepIcon-root': {
                color: '#1976d2', // active icon color
              },
              '& .Mui-completed .MuiStepIcon-root': {
                color: '#4caf50', // completed step color
              },
            }}
            >
                {steps.map((label) => (
                <Step key={label}>
                  <StepLabel className='step-label'>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </div>
    </Container>
  )
}

export default StepProgressBar