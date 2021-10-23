/** @format */ 

import React from "react";

import { userService } from "services";

class AdminPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: null,
		};
	}

	componentDidMount() {
		userService.getAll().then((users) => {
			const data = users.data;
			//console.log(user)
			this.setState({ users:data})

		});
		console.log(this.state.users);
	}

	render() {
		const { users } = this.state;
		return (
			<div>
				<h1>Admin</h1>
				<p>This page can only be accessed by administrators.</p>
				<div>
					All users from secure (admin only) api end point:
					{users && (
						<ul>
							{users.map((user) => (
								<li key={user.id}>
									{user.username} {user.email}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		);
	}
}

export { AdminPage };
