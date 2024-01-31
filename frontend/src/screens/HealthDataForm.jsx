import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import { useAddHealthDataMutation, useFetchHealthDataByUserQuery } from '../slices/healthDataApiSlice';
import { useSelector } from 'react-redux';
import {toast, ToastContainer} from 'react-toastify'


const HealthDataForm = () => {
  const [addHealthData, { isLoading }] = useAddHealthDataMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    chronicDiseases: '',
    allergies: '',
    medications: '',
    dietType: '',
    mentalHealthStatus: '',
  });

  // Enable all disabled items initially
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert multiline text inputs to arrays
      const chronicDiseasesArray = formData.chronicDiseases.split('\n').filter(item => item.trim() !== '');
      const allergiesArray = formData.allergies.split('\n').filter(item => item.trim() !== '');
      const medicationsArray = formData.medications.split('\n').filter(item => item.trim() !== '');
      const mentalHealthStatusArray = formData.mentalHealthStatus.split('\n').filter(item => item.trim() !== '');

      // Create the data object for Prisma
      const prismaData = {
        user: {
          connect: {
            userId: userInfo?.userId,
          },
        },
        chronicDiseases: chronicDiseasesArray,
        allergies: allergiesArray,
        medications: medicationsArray,
        dietType: formData.dietType || null,
        mentalHealthStatus: mentalHealthStatusArray,
      };

      // Call the Prisma mutation
      await addHealthData(prismaData);

      toast.success('Health data submitted successfully');
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
    <Row className="justify-content-center">
      <Col xs={12} md={8}>
        <h2 className="text-center">Health Data Form</h2>
        <p className="text-center">Please fill out the form below to submit your health data.</p>
        {isLoading && <p>Loading...</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="chronicDiseases">
            <Form.Label>Chronic Diseases (One item per line)</Form.Label>
            <Form.Control as="textarea" name="chronicDiseases" value={formData.chronicDiseases} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="allergies">
            <Form.Label>Allergies (One item per line)</Form.Label>
            <Form.Control as="textarea" name="allergies" value={formData.allergies} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="medications">
            <Form.Label>Medications (One item per line)</Form.Label>
            <Form.Control as="textarea" name="medications" value={formData.medications} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="dietType">
            <Form.Label>Diet Type</Form.Label>
            <Form.Control type="text" name="dietType" value={formData.dietType} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="mentalHealthStatus">
            <Form.Label>Mental Health Status (One item per line)</Form.Label>
            <Form.Control as="textarea" name="mentalHealthStatus" value={formData.mentalHealthStatus} onChange={handleChange} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </Col>
      <ToastContainer/>
    </Row>
  );
};


export default HealthDataForm;