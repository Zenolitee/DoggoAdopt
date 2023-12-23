// Admin.js

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import '../css/Admin.css';

const Admin = () => {
    const [formSubmissions, setFormSubmissions] = useState([]);
  
    useEffect(() => {
      // Fetch form submissions from the server
      fetch('/api/forms', { credentials: 'include' })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch form submissions');
          }
        })
        .then((data) => {
          console.log('Form submissions:', data);
  
          // Assuming Status is included in the response, otherwise default to 'Pending'
          const submissionsWithStatus = data.map((submission) => ({
            ...submission,
            Status: submission.Status || 'Pending',
          }));
  
          setFormSubmissions(submissionsWithStatus);
        })
        .catch((error) => {
          console.error('Error fetching form submissions:', error);
        });
    }, []);
  
    const handleStatusChange = async (formID, username, newStatus) => {
      try {
        const response = await fetch(`/api/forms/${formID}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus, // 'Approved' or 'Rejected'
            username: username,
          }),
          });
    
          if (response.ok) {
            
            setFormSubmissions((prevSubmissions) => {
              return prevSubmissions.map((submission) =>
                submission.FormID === formID
                  ? { ...submission, Status: 'Approved' } 
                  : submission
              );
            });
          } else {
            console.error('Failed to update status:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };
  
      const handleDelete = async (formID, username) => {
        try {
          const response = await fetch(`/api/forms/${formID}/status`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'None', // Set the status to 'None' instead of deleting
              username: username, // Assuming username is available in the submission
            }),
          });
      
          if (response.ok) {
            setFormSubmissions((prevSubmissions) =>
              prevSubmissions.map((submission) =>
                submission.FormID === formID
                  ? { ...submission, Status: 'None' }
                  : submission
              )
            );
          } else {
            console.error('Failed to change status:', response.statusText);
          }
        } catch (error) {
          console.error('Error changing status:', error);
        }
      };

  return (
    <div className="container flex max-w-none">
      <Navbar />

      <div className="background-image flex items-center justify-center ml-12">
        <div className="admin-content bg-white bg-opacity-30 p-4 rounded">
          <h2 className="text-white text-center text-2xl">Form Submissions</h2>

          {formSubmissions.length > 0 ? (
  <table className="text-white border-collapse w-full">
    <thead>
      <tr className="border-b-2">
        <th className="border p-2">FormID</th>
        <th className="border p-2">PetID</th>
        <th className="border p-2">FullName</th>
        <th className="border p-2">ContactNumber</th>
        <th className="border p-2">ReasonForAdopting</th>
        <th className="border p-2">ValidID</th>
        <th className="border p-2">Status</th>
        <th className="border p-2">Actions</th> {/* New column for buttons */}
      </tr>
    </thead>
    <tbody>
      {formSubmissions.map((submission, index) => (
        <tr key={index} className="border-b">
          <td className="border p-2">{submission.FormID}</td>
          <td className="border p-2">{submission.PetID}</td>
          <td className="border p-2">{submission.FullName}</td>
          <td className="border p-2">{submission.ContactNumber}</td>
          <td className="border p-2">{submission.ReasonForAdopting}</td>
          <td className="border p-2">{submission.ValidID}</td>
          <td className="border p-2">{submission.Status}</td>
          <td className="border p-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleStatusChange(submission.FormID, submission.Username, 'Approved')}
            >
              Approve
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => handleDelete(submission.FormID, submission.FullName)}

            >
              Reject
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-white">No form submissions</p>
)}
        </div>
      </div>
    </div>
  );
};

export default Admin;
