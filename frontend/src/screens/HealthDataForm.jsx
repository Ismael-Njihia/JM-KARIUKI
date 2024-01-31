import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { useAddHealthDataMutation, useFetchHealthDataByUserQuery } from '../slices/healthDataApiSlice';
import { useSelector } from 'react-redux';
import {toast, ToastContainer} from 'react-toastify'

const HealthDataForm = () => {
  const [addHealthData, { isLoading }] = useAddHealthDataMutation();
  const { fetchHealthDataByUser } = useFetchHealthDataByUserQuery();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [dietType, setDietType] = useState('');
  const [mentalHealthStatus, setMentalHealthStatus] = useState('');
  const [disabilityType, setDisabilityType] = useState('');


  const handleCheckboxChange = () => {
    setDisabled(true);
   };
   
  const handleChronicDiseasesChange = (e) => {
    setChronicDiseases(e.target.value);
  }
  const handleAllergiesChange = (e) => {
    setAllergies(e.target.value);
  }
  const handleMedicationsChange = (e) => {   
    setMedications(e.target.value);
  }
  const handleDietTypeChange = (e) => {
    setDietType(e.target.value);
  }
  const handleMentalHealthStatusChange = (e) => {
    setMentalHealthStatus(e.target.value);
  }
  const handleDisabilityTypeChange = (e) => {
    setDisabilityType(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const user  = userInfo?.userId;
     const res =  fetchHealthDataByUser(user);
      if(res?.data?.length > 0 ){
        toast.info('Health data already submitted you csn edit it from dashboard');
        navigate('/dashboard');
        }



       // Convert multiline text inputs to arrays
       const chronicDiseasesArray = chronicDiseases.split('\n').filter(item => item.trim() !== '');
       const allergiesArray = allergies.split('\n').filter(item => item.trim() !== '');
       const medicationsArray = medications.split('\n').filter(item => item.trim() !== '');
       const mentalHealthStatusArray = mentalHealthStatus.split('\n').filter(item => item.trim() !== '');
   
       // Convert arrays to strings
       const chronicDiseasesString = chronicDiseasesArray.join(', ');
       const allergiesString = allergiesArray.join(', ');
       const medicationsString = medicationsArray.join(', ');
       const mentalHealthStatusString = mentalHealthStatusArray.join(', ');

      

   
       // Create the data object for Prisma
       const healthData = {
         userId: userInfo?.userId, 
         disabled: disabled, 
         disabilityType: disabilityType,
         chronicDiseases: chronicDiseasesString,
         allergies: allergiesString,
         medications: medicationsString,
         dietType: dietType,
         mentalHealthStatus: mentalHealthStatusString,
       };
   
       // Call the Prisma mutation
       await addHealthData(healthData);
       toast.success('Health data submitted successfully');
       navigate('/dashboard');
    } catch (error) {
       toast.error('Failed to submit health data: ' + error?.data?.error?.message || 'Something went wrong');
    }
   };
   
  // Conditional check for redirecting Admins and Doctors
  useEffect(() => {
    if (userInfo?.userType === 'admin' || userInfo?.userType === 'doctor') {
      navigate('/dashboard'); // Redirect to the dashboard
    }
  }, [userInfo, navigate]);

  return (
    <Container fluid style={{ backgroundColor: '#87CEEB',paddingBottom:'50px',paddingTop:'40px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Row className="justify-content-center">
      <Col xs={12} md={12}>
        <h2 className="text-center">Health Data Form</h2>
        <p className="text-center">Please fill out the form below to submit your health data.</p>
        {isLoading && <p>Loading...</p>}
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="disabled">
            <Form.Check type="checkbox" label="Disabled" name="disabled" checked={disabled} onChange={handleCheckboxChange} />
          </Form.Group>
          {disabled && (
            <Form.Group controlId="disabilityType">
              <Form.Label>Disability Type</Form.Label>
              <Form.Control type="text" name="disabilityType" value={disabilityType} onChange={handleDisabilityTypeChange} />
            </Form.Group>
          )}
          <Form.Group controlId="chronicDiseases">
            <Form.Label>Chronic Diseases (One item per line)</Form.Label>
            <Form.Control as="textarea" name="chronicDiseases" value={chronicDiseases} onChange={handleChronicDiseasesChange} />
          </Form.Group>
          <Form.Group controlId="allergies">
            <Form.Label>Allergies (One item per line)</Form.Label>
            <Form.Control as="textarea" name="allergies" value={allergies} onChange={handleAllergiesChange} />
          </Form.Group>
          <Form.Group controlId="medications">
            <Form.Label>Medications (One item per line)</Form.Label>
            <Form.Control as="textarea" name="medications" value={medications} onChange={handleMedicationsChange} />
          </Form.Group>
          <Form.Group controlId="dietType">
            <Form.Label>Diet Type</Form.Label>
            <Form.Control type="text" name="dietType" value={dietType} onChange={handleDietTypeChange} />
          </Form.Group>
          <Form.Group controlId="mentalHealthStatus">
            <Form.Label>Mental Health Status (One item per line)</Form.Label>
            <Form.Control as="textarea" name="mentalHealthStatus" value={mentalHealthStatus} onChange={handleMentalHealthStatusChange} />
          </Form.Group>
          <Button type="submit"style={{

backgroundColor: '#87CEEB',
color: 'black',
border: '2px solid black',
borderRadius: '10px',
padding: '10px 20px',
fontSize: '15px',
fontWeight: 'bold',
cursor: 'pointer',
outline: 'none',
width: '100%',
marginTop: '30px',
}}disabled={isLoading}>Submit</Button>
        </Form>
      </Col>
      <ToastContainer/>
    </Row>
    </Container>
  );
};

export default HealthDataForm;
