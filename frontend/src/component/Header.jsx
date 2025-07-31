import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="bg-dark py-3">
			<div className="container d-flex justify-content-between align-items-center">
				<h3 className="text-white">Student Management System</h3>
				<nav>
					<Link to="/" className="btn btn-outline-light me-2">
						Register
					</Link>
			
					<Link to="/student" className="btn btn-outline-light me-2">
						Student List
					</Link>
					<Link to="/search" className="btn btn-outline-light">
						Search
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
