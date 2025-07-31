import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";

const StudentRegistration = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const response = await fetch("http://localhost:4000/api/v1/registration", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (result.success) {
				toast.success(result.message);
				reset();
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error("Something went wrong!");
			console.error(error.message);
		}
	};

	return (
		<div className="container mt-5">
			<div className="bg-light p-5 rounded shadow-sm w-75 mx-auto">
				<h2 className='text-center mb-4'>Student Registration</h2>
				<form onSubmit={handleSubmit(onSubmit)}>

					<div className="mb-3">
						<label className="form-label">Name</label>
						<input
							type="text"
							className={`form-control ${errors.name ? 'is-invalid' : ''}`}
							{...register("name", {
								required: "Name is required",
								validate: (value) =>
									value.trim().length > 3 || "Name must be more than 3 characters"
							})}
						/>
						{errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
					</div>

					<div className="mb-3">
						<label className="form-label">Email</label>
						<input
							type="email"
							className={`form-control ${errors.email ? 'is-invalid' : ''}`}
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^\S+@\S+$/i,
									message: "Invalid email format"
								}
							})}
						/>
						{errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
					</div>

					<div className="mb-3">
						<label className="form-label">Age</label>
						<input
							type="number"
							className={`form-control ${errors.age ? 'is-invalid' : ''}`}
							{...register("age", {
								required: "Age is required",
								min: {
									value: 1,
									message: "Age must be at least 1"
								}
							})}
						/>
						{errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
					</div>

					<div className="mb-3">
						<label className="form-label">Course</label>
						<input
							type="text"
							className={`form-control ${errors.course ? 'is-invalid' : ''}`}
							{...register("course", {
								required: "Course is required",
								minLength: {
									value: 2,
									message: "Course must be at least 2 characters"
								}
							})}
						/>
						{errors.course && <div className="invalid-feedback">{errors.course.message}</div>}
					</div>

					<button
						type="submit"
						className="btn"
						style={{
							backgroundColor: '#198754', 
							color: 'white',
							fontWeight: 'bold',
							width: '100%'
						}}
						disabled={isSubmitting}
					>
						{isSubmitting ? "Registering..." : "Register"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default StudentRegistration;
