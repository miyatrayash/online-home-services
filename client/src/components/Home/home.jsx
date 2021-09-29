import Slider from "components/Slider/Slider";
import "style.css";

import Experience1 from "Images/experience/experience1.jpeg";
import Experience2 from "Images/experience/experience2.jpeg";
import _1Png from "Images/1.png";
import _2Png from "Images/2.png";
import Phones from "Images/phones.png";
import "clone.css";
export default function HomePage() {
    

    return (
			<>
				<Slider />
				<section id="experience">
					<div className="container p-5">
						<div className="row justify-content-center">
							<h3 className="text-center font-weight-bolder">
								Experiences in the Spotlight
							</h3>
						</div>
						<div className="row justify-content-center">
							<h6 className="text-center light-text font-weight-normal">
								Hygienic & single-use products | low-contact services
							</h6>
						</div>
						<div className="row justify-content-center mt-4">
							<div className="col-12 col-md-6">
								<img src={Experience1} alt="Salon" className="img-fluid" />
								<h5 className="text-center mt-3 font-weight-bold">
									Salon at Home
								</h5>
								<p className="text-center lighter-text">
									Single-use tools & products
								</p>
							</div>
							<div className="col-12 col-md-6">
								<img src={Experience2} alt="Salon" className="img-fluid" />
								<h5 className="text-center mt-3 font-weight-bold">
									Salon at Home
								</h5>
								<p className="text-center lighter-text">
									Single-use cape & towels
								</p>
							</div>
						</div>
					</div>
				</section>
				<section style={{ background: "#F1F4F6", height: "20px" }}></section>

				<section style={{ background: "#F1F4F6", height: "20px" }}></section>

				<section id="appliances">
					<div class="container p-5">
						<div class="row justify-content-center">
							<h3 class="text-center font-weight-bolder">
								Appliances: Service &amp; Repair
							</h3>
						</div>
						<div class="row justify-content-center">
							<h6 class="text-center light-text font-weight-normal">
								Expert technicians at your doorstep in 2 hours
							</h6>
						</div>
						<div class="row justify-content-center mt-4">
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_ef2b79d0.png"
									alt="Ac Repair"
									class="img-fluid"
								/>
								<p class="text-center mt-3">AC Service and Repair</p>
								<p class="text-center lighter-text">
									30% off on Second AC onwards
								</p>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_c0667020.png"
									alt="Geyser Repair"
									class="img-fluid"
								/>
								<p class="text-center mt-3">Geyser Service and Repair</p>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_bbb8c690.png"
									alt="Ro Repair"
									class="img-fluid"
								/>
								<p class="text-center mt-3">RO or Water Purifier Repair</p>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_b78221c0.png"
									alt="Washing Maching"
									class="img-fluid"
								/>
								<p class="text-center mt-3">Washing Machine Service & Repair</p>
							</div>
						</div>
					</div>
				</section>

				<section style={{ background: "#F1F4F6", height: "20px" }}></section>

				<section id="reviews">
					<div class="container p-5">
						<div class="row justify-content-center">
							<h3 class="text-center font-weight-bolder">
								Customer safety is our priority
							</h3>
						</div>
						<div class="row justify-content-center">
							<h6 class="text-center light-text font-weight-normal">
								What customers are saying about our safety standards
							</h6>
						</div>
						<div class="row justify-content-center mt-4">
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_568/t_high_res_template/categories/category_v2/category_3782c0d0.png"
									alt="Review"
									class="img-fluid"
								/>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_568/t_high_res_template/categories/category_v2/category_38337330.png"
									alt="Review"
									class="img-fluid"
								/>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_568/t_high_res_template/categories/category_v2/category_387cb130.png"
									alt="Review"
									class="img-fluid"
								/>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_568/t_high_res_template/categories/category_v2/category_3bbf0af0.png"
									alt="Review"
									class="img-fluid"
								/>
							</div>
						</div>
					</div>
				</section>

				<section style={{ background: "#F1F4F6", height: "20px" }}></section>

				<section id="cleaning">
					<div class="container p-5">
						<div class="row justify-content-center">
							<h3 class="text-center font-weight-bolder">
								Cleaning & Pest Control{" "}
							</h3>
						</div>
						<div class="row justify-content-center">
							<h6 class="text-center light-text font-weight-normal">
								{" "}
								Removes hard stains & more
							</h6>
						</div>
						<div class="row justify-content-center mt-4">
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_165bfd50.png"
									alt="bathroom cleaning"
									class="img-fluid"
									style={{ height: "150px" }}
								/>
								<p class="text-center mt-3">Professional Bathroom Cleaning</p>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_e06f0000.jpeg"
									alt="car cleaning"
									class="img-fluid"
									style={{ height: "150px" }}
								/>
								<p class="text-center mt-3">Car Cleaning</p>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_2effaaf0.png"
									alt="Sofa cleaning"
									class="img-fluid"
									style={{ height: "150px" }}
								/>
								<p class="text-center mt-3">Professional Sofa Cleaning</p>
							</div>
							<div class="col-12 col-md-3">
								<img
									src="https://res.cloudinary.com/urbanclap/image/upload/q_auto,f_auto,fl_progressive:steep,w_532/t_high_res_category/categories/category_v2/category_5cadb240.jpeg"
									alt="pest control"
									class="img-fluid"
									style={{ height: "150px" }}
								/>
								<p class="text-center mt-3">Pest Control</p>
							</div>
						</div>
					</div>
				</section>
				<section style={{ background: "#F1F4F6", height: "20px" }}></section>

				<section id="insurance">
					<div class="container-fluid p-2">
						<div class="row justify-content-center">
							<img
								src={_1Png}
								alt="Insurence Protection"
								class="img-fluid"
								style={{ width: "100%" }}
							/>
						</div>
					</div>
				</section>
				<section style={{ background: "#F1F4F6", height: "20px" }}></section>

				<section id="government">
					<div class="container-fluid p-2">
						<div class="row justify-content-center">
							<img
								src={_2Png}
								alt="Partners"
								class="img-fluid"
								style={{ width: "100%" }}
							/>
						</div>
					</div>
				</section>
				<section style={{ background: "#F1F4F6", height: "20px" }}></section>

				<section id="refer">
					<div class="container p-5">
						<div class="row justify-content-center">
							<div class="col-12 col-md-6">
								<div class="row justify-content-start mt-md-2">
									<h2 class="text-left font-weight-bolder mt-md-5">
										Refer and get free services{" "}
									</h2>
								</div>
								<div class="row justify-content-start">
									<h6 class="text-left light-text font-weight-normal">
										Invite your friends to Urban Company services. They get Rs.
										100 off. You win upto Rs. 5000
									</h6>
								</div>
								<div class="row justify-content-start">
									<div class="buttonIn">
										<input
											type="number"
											id="referralForm"
											class="form-control"
											placeholder="9876543210"
										/>
										<button id="submitRefer" class="btn btn-black">
											Send
										</button>
									</div>
								</div>
								<div class="row justify-content-start mt-5">
									<div class="col-12 col-md-4">
										<a href="https://app.appsflyer.com/com.urbanclap.urbanclap?pid=MobileWeb&c=home_app_buttons">
											<img
												src={
													"https://images.urbanclap.com/image/upload/categories/category_v2/category_7f907eb0.png"
												}
												alt="Google Play"
												class="img-fluid"
												style={{ height: "50px" }}
											/>
										</a>
									</div>
									<div class="col-12 col-md-4">
										<a href="https://app.appsflyer.com/id1032480595?pid=MobileWeb&c=home_app_buttons">
											<img
												src="https://images.urbanclap.com/image/upload/categories/category_v2/category_7f741d10.png"
												alt="App Store"
												class="img-fluid"
												style={{ height: "50px" }}
											/>
										</a>
									</div>
								</div>
							</div>
							<div class="col-12 col-md-6">
								<img src={Phones} alt="App Version" class="img-fluid" />
							</div>
						</div>
					</div>
				</section>
			</>
		);
}

