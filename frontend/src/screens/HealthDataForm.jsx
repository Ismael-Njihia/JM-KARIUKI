import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { useAddHealthDataMutation } from '../slices/healthDataApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import {toast, ToastContainer} from 'react-toastify';
import '../Assets/Homepage.css'


const HealthDataForm = () => {
  const dispatch = useDispatch();
 const [addHealthData, { isLoading }] = useAddHealthDataMutation();
 
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
        disabled: disabled,
        disabilityType: disabilityType,
        chronicDiseases: chronicDiseasesString,
        allergies: allergiesString,
        medications: medicationsString,
        dietType: dietType,
        mentalHealthStatus: mentalHealthStatusString,
      };
 
      // Call the Prisma mutation
    const res =  await addHealthData(healthData);
    console.log(res);
    //check the response
    if(res.error){
      toast.error(res.error?.data?.errMessage);
    }else{
    toast.success('Health Data Submitted Successfully');
    navigate('/')
    }
    
   } catch (error) {
      console.log(error);
    }
  };

 
 
 // Conditional check for redirecting Admins and Doctors
 useEffect(() => {
   if (userInfo?.userType === 'admin' || userInfo?.userType === 'doctor') {
     navigate('/'); 
   }

   
 }, [userInfo, navigate]);


 return (
   <Container fluid className='basic-structure'>

    <div className='homepage-image'/>
   <Row className="justify-content-center">
     <Col xs={12} md={12}>
       <p className="text-center Heading-details">To Continue, Please fill out the form below.</p>
       <hr className='horizontal-line' />
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