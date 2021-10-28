/** @format */

import { Link } from "react-router-dom";
import "style.css";
export default function Navbar(props) {

	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark"
			style={{ background: "black" }}
		>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarTogglerDemo03"
				aria-controls="navbarTogglerDemo03"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<Link className="navbar-brand" to="/">
				<img
					src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep/t_high_res_template,q_auto:low,f_auto/categories/category_v2/category_425cd8c0.png"
					alt="UrbanClap"
					style={{ width: "200px" }}
				/>
			</Link>
			<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link className="nav-link" to="/">
							Home <span className="sr-only">(current)</span>
						</Link>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#experience">
							Experience
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#appliances">
							Appliances
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#reviews">
							Reviews
						</a>
					</li>
				</ul>

				<ul className="navbar-nav ms-auto me-3">
					{props.user && (
						<>
							{props.isAdmin && (
								<>
									<Link to="/admin" className="nav-item nav-link">
										Admin
									</Link>
									<Link to="/myServices" className="nav-item nav-link">
										myServices
									</Link>
									<Link to="/myOrders" className="nav-item nav-link">
										myOrders
									</Link>
								</>
							)}
							<Link to="/services" className="nav-item nav-link">
								Services
							</Link>

							<Link to="/orders" className="nav-item nav-link">
								Orders
							</Link>
							<Link
								to={`/users/${props.user.username}`}
								className="nav-item nav-link"
							>
								Profile
							</Link>
							<a
								href="/login"
								onClick={props.logout}
								className="nav-item nav-link"
							>
								Logout
							</a>
						</>
					)}
					{!props.user && (
						<>
							<li className="nav-item">
								<Link className="btn btn-outline-light" to="/auth">
									Login
								</Link>
							</li>
							<li className="nav-item"></li>
							<li className="nav-item">
								<Link className="btn btn-outline-light" to="/auth">
									Register
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}
