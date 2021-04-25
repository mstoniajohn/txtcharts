import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

// import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
	const { logout, currentUser } = useAuth();
	// const { clearContacts } = contactContext;

	const onLogout = () => {
		logout();
		// clearContacts();
	};
	const authLinks = (
		<>
			<li>Hello {currentUser && currentUser.email}</li>
			<li>
				<a onClick={onLogout} href="#!">
					<i className="fas fa-sign-out-alt">
						{' '}
						<span className="hide-mobile">Logout</span>
					</i>
				</a>
			</li>
			<li>
				<Link to="/links">Charts Link</Link>
			</li>
			<li>
				<Link to="/video">Videos</Link>
			</li>
		</>
	);
	const guestLinks = (
		<>
			<li>
				<Link to="/signup">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</>
	);
	return (
		<>
			<div className="navbar bg-primary">
				<h1>
					<Link to="/">
						<i className={icon} /> {title}
					</Link>
				</h1>

				<ul>{currentUser ? authLinks : guestLinks}</ul>
			</div>
		</>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};
Navbar.defaultProps = {
	title: 'TXT Charts',
	icon: 'fas fa-link',
};
export default Navbar;
