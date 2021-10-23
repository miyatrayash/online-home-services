import HomePage from "HomePage/home";
import "style.css";

export default function Foot()
{
    return (
        <>
			<footer className="site-footer mt-auto">
				<div className="container" style={{ overflowX: "hidden" }}>
					<div className="row">
						<div className="col-12 col-md-12">
							<img
								src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep/t_high_res_template,q_auto:low,f_auto/categories/category_v2/category_425cd8c0.png"
								className="img-fluid"
								alt="UrbanClap"
								style={{ width: "250px" }}
							/>
							<p className="text-justify mt-3">
								Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean
								sollicitudin, lorem quis bibendum nisi elit consequat ipsum, nec
								sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate
								cursus a sit amet mauris orbi accumsan.Lorem Ipsum. Proin
								gravida nibh vel velit auctor aliquet. Aenean sollicitudin,
								lorem quis bibendum nisi elit consequat ipsum, nec sagittis sem
								nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit
								amet mauris orbi accumsan.
							</p>
						</div>
						<div className="col-12 col-md-3">
							<h6>Candidates</h6>
							<ul className="footer-links">
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
							</ul>
						</div>
						<div className="col-12 col-md-3">
							<h6>Employees</h6>
							<ul className="footer-links">
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
								<li>
									<a href={{ HomePage }}>Lorem Ipsum</a>
								</li>
							</ul>
						</div>
						<div className="col-12 col-md-3">
							<h6>Quick Links</h6>
							<ul className="footer-links">
								<li>
									<a href="index.html">Lorem Ipsum</a>
								</li>
								<li>
									<a href="about.html">Lorem Ipsum</a>
								</li>
								<li>
									<a href="features.html">Lorem Ipsum</a>
								</li>
								<li>
									<a href="jobs.html">Lorem Ipsum</a>
								</li>
								<li>
									<a href="contact.html">Lorem Ipsum</a>
								</li>
							</ul>
						</div>
						<div className="col-12 col-md-3">
							<h6>Workspace</h6>
							<ul className="footer-links">
								<li>
									Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
									Kolkatta-560038.
								</li>
								<li>
									<b>Phone: </b>
									<a href="tel:9876543210">9876543210</a>
								</li>
								<li>
									<b>Email: </b>
									<a href="mailto:support@urbanclap.com">
										support@urbanclap.com
									</a>
								</li>
							</ul>
						</div>
					</div>
					<hr />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-8 col-sm-6 col-xs-12">
							<p className="copyright-text">
								© Copyright 2020 | UrbanClap | All right reserved.
							</p>
						</div>

						<div className="col-md-4 col-sm-6 col-xs-12">
							<ul className="social-icons">
								<li>
									<a className="facebook" href={{ HomePage }}>
										<i className="fa fa-facebook"></i>
									</a>
								</li>
								<li>
									<a className="twitter" href={{ HomePage }}>
										<i className="fa fa-twitter"></i>
									</a>
								</li>
								<li>
									<a className="linkedin" href={{ HomePage }}>
										<i className="fa fa-linkedin"></i>
									</a>
								</li>
								<li>
									<a className="youtube" href={{ HomePage }}>
										<i className="fa fa-youtube"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
            </>
		);
}