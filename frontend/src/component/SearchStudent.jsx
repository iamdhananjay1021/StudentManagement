import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SearchStudent = () => {
	const [query, setQuery] = useState("");
	const [students, setStudents] = useState([]);

	const handleSearch = async () => {
		if (!query) return;
		const response = await fetch(`http://localhost:4000/api/v1/search?name=${query}`);
		const data = await response.json();
		// console.log(data)
		setStudents(data.data);
		if (data.data.length === 0) {
			toast.error("no student found")
		}
	};

	return (
		<>
			<div>
				<div className="d-flex input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter student name to search"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
				</div>
				<ul>
					{students?.map((student) => (
						<li key={student._id}>
							<Link to={`/student/${student._id}`}>{student.name}</Link>
						</li>
					))}
				</ul>
			</div >
			
		</>
	);
};

export default SearchStudent;