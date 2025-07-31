import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/student/${id}`);
        const data = await response.json();
        setStudent(data.data); 
      } catch (error) {
        console.error("Failed to fetch student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!student) return <p>No student found.</p>;

  return (
    <div className="card p-4 shadow-sm">
      <h3>Student Details</h3>
      <hr />
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Age:</strong> {student.age}</p>
      <p><strong>Course:</strong> {student.course}</p>

      <Link to="/student" className="btn btn-secondary mt-3">Back to Student List</Link>
    </div>
  );
};

export default StudentDetails;
