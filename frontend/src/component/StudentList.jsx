import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setStudents, removeStudent } from "../redux/slices/StudentSlice.js";

const StudentList = () => {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.students);

	// Fetch all students
	const fetchStudents = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/v1/student");
			const data = await response.json();

			if (data.success) {
				dispatch(setStudents(data.data));
			} else {
				toast.warning("No student found.");
			}
		} catch (error) {
			console.error("Error fetching students:", error.message);
			toast.error("Failed to fetch student list.");
		}
	};

	// Delete a student
	const handleRemove = async (id) => {
		try {
			const response = await fetch("http://localhost:4000/api/v1/student/remove", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id })
			});
			const data = await response.json();

			if (data.success) {
				dispatch(removeStudent(data.data._id));
				toast.success("Student removed successfully.");
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error("Error removing student:", error.message);
			toast.error("Failed to remove student.");
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	return (
		<div className="container mt-5">
			<h2 className="text-center mb-4">Student List</h2>

			{students && students.length > 0 ? (
				<table className="table table-hover table-bordered text-center align-middle">
					<thead className="table-dark">
						<tr>
							<th>Name</th>
							<th>Age</th>
							<th>Email</th>
							<th>Course</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{students.map((student) => (
							<tr key={student._id}>
								<td>{student.name}</td>
								<td>{student.age}</td>
								<td>{student.email}</td>
								<td>{student.course}</td>
								<td>
									<button
										className="btn btn-outline-danger btn-sm"
										onClick={() => handleRemove(student._id)}
									>
										Remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<h5 className="text-center text-muted">No student record found.</h5>
			)}
		</div>
	);
};

export default StudentList;
