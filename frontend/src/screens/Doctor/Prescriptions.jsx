import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useCreatreMedicalMutation } from '../../slices/medicalApiSlice'; 
import { toast , ToastContainer} from 'react-toastify';

const Prescriptions = () => {
  const { userInfo } = useSelector(state => state.auth);
  const userId = userInfo.userId;
  const firstName = userInfo.firstName;
  const { appointId } = useParams();
  console.log(appointId);

  const [prescription, setPrescription] = useState([]);
  const [testResult, setTestResult] = useState('');

  const handlePrescriptionChange = (e) => {
    setPrescription(e.target.value);
  };
  const handleTestResultChange = (e) => {
    setTestResult(e.target.value);
  };

  const [createMedical, { isLoading }] = useCreatreMedicalMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prescriptionsArray = prescription.split('\n').filter(item => item.trim() !== '');

    const prescriptionData = {
      appointId,
      test_results: testResult,
      prescriptions: prescriptionsArray, // Pass the array directly
    };

    try {
      const response = await createMedical(prescriptionData).unwrap();
      if (response.error) {
        toast.error(`Error: ${response.error?.data?.errMessage}`);
      } else {
        toast.success('Medication prescribed successfully');
        //clear the form 
        setPrescription('');
        setTestResult('');

      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`);
    }
  };


  return (
    <div style={{ backgroundColor: '#87CEEB', minHeight: '100vh' }}>
      <Row style={{ marginLeft: '20px', marginRight: '20px' }}>
        <Col md={6}>
          <p>Doctor {firstName}, Prescriptions</p>
        </Col>
        <Col md={6}>
          <h1 className="text-center">Prescribe medication</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Prescription</Form.Label>
              <Form.Control as='textarea' rows={5} value={prescription} onChange={handlePrescriptionChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Test Result</Form.Label>
              <Form.Control as='textarea' rows={5} value={testResult} onChange={handleTestResultChange} />
            </Form.Group>
            {/* Submit form */}
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
        }}disabled={isLoading} >Submit</Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default Prescriptions;
