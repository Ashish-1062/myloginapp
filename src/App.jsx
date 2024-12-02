import React, { useState } from "react";
import { signInWithGoogle, logout } from "./firebaseConfig";
import "./App.css";

function App() {
	const [user, setUser] = useState(null); // User state for authentication
	const [darkMode, setDarkMode] = useState(false); // State to toggle dark mode
	const [loading, setLoading] = useState(false); // State to handle loading during sign-in

	// Handle Google sign-in
	const handleLogin = async () => {
		setLoading(true);
		const loggedInUser = await signInWithGoogle();
		setLoading(false);
		if (loggedInUser) {
			setUser({
				name: loggedInUser.displayName,
				email: loggedInUser.email,
				photo: loggedInUser.photoURL,
			});
		}
	};

	// Handle user logout
	const handleLogout = async () => {
		await logout();
		setUser(null);
	};

	// Toggle dark mode
	const toggleDarkMode = () => {
		setDarkMode((prevMode) => !prevMode);
	};

	return (
		<div className={darkMode ? "dark-mode" : "light-mode"}>
			{/* Navbar */}
			<div className="navbar">
				<h1>My App</h1>
				{!user ? (
					<div className="auth-btn" onClick={handleLogin} disabled={loading}>
						<img
							className="icon"
							src="https://img.icons8.com/color/48/google-logo.png"
							alt="Google"
						/>
						{loading ? "Signing In..." : " Sign in "}
					</div>
				) : (
					<button className="auth-btn" onClick={handleLogout}>
						Logout
					</button>
				)}
				{/* Dark Mode Toggle */}
				<div
					className={`theme-toggle ${darkMode ? "active" : ""}`}
					onClick={toggleDarkMode}
				></div>
			</div>

			{/* Main Body */}
			<div className="main-container">
				{/* Display content based on user authentication */}
				{!user ? (
					<div className="card">
						<h2 style={{ color: "#357ae8" }}>Sign In </h2>
						<input
							type="email"
							placeholder="Email"
							className="input-field"
							disabled
						/>
						<input
							type="password"
							placeholder="Password"
							className="input-field"
							disabled
						/>
						<button onClick={handleLogin} className="button1">
							<img
								className="icon"
								src="https://img.icons8.com/color/48/google-logo.png"
								alt="Google"
							/>
							{loading ? "Signing In..." : "Sign in with Google"}
						</button>
					</div>
				) : (
					<div className="card">
						<h2 style={{ color: "#357ae8" }}>Welcome, {user.name}!</h2>
						<p style={{ color: "#357ae8" }}>Email: {user.email}</p>
						<img src={user.photo} alt="Profile" className="profile-image" />
						<button onClick={handleLogout} className="button2">
							Logout
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
