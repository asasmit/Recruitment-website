import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as ROUTES from '../../../../constants/routes';

const Profile = ({ firstName, lastName, phone }) => {
  const [resume, setResume] = useState(null); // To hold the resume file
  const navigate = useNavigate();

  // Handle file input change (when a user selects a resume)
  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  // Handle form submission for uploading resume
  const handleUpload = async () => {
    if (!resume) {
      alert('Please select a resume to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);  // Append the file to the FormData object

    try {
      const response = await axios.post('http://localhost:8080/api/uploadRes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // This tells the server to expect a file
          'Auth-Token': `${localStorage.getItem('token')}`, // Send the token for authorization
        },
      });

      if (response.status === 200) {
        alert('Resume uploaded successfully');
        console.log('Uploaded file URL:', response.data.filePath); // Cloudinary URL
      } else {
        alert(response.data.message || 'Failed to upload resume');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Something went wrong while uploading the resume');
    }
  };

  return (
    <Container className="col-md-4">
      <Card className="shadow-sm">
        <Card.Header as="h2" className="text-center">
          Profile
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="firstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                readOnly
                type="text"
                name="firstName"
                value={firstName}
              />
            </Form.Group>
            <Form.Group controlId="lastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                readOnly
                type="text"
                name="lastName"
                value={lastName}
              />
            </Form.Group>
            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control readOnly type="text" name="phone" value={phone} />
            </Form.Group>

            {/* Upload Resume Input */}
            <Form.Group controlId="resume" className="mb-3">
              <Form.Label>Upload Resume</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />
            </Form.Group>

            {/* Upload Resume Button */}
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={!resume} // Disable if no file is selected
            >
              Upload Resume
            </Button>

            <Button
              variant="success"
              className="ms-2"
              onClick={() => navigate(ROUTES.PROFILE_EDIT)}
            >
              Edit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default Profile;