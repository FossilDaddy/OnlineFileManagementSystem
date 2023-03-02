import "./App.css";
import NavbarComponent from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import DashboardPage from "./components/Dashboard";

function App () {
  return (
	<div className="App">
	<Routes>
		<Route path={"/"} element={
			<>
				<NavbarComponent />
				<h1>Welcome to file management system</h1>
			</>
		}>
		</Route>
		<Route exact path="/login" element={<LoginPage />}></Route>
		<Route exact path="/register" element={<RegisterPage />}></Route>
		<Route exact path="/dashboard/*" element={<DashboardPage />}></Route>
		{/* <Route exact path="/test" element={<CreateFolderPanel />}></Route> */}
		
	</Routes>

	</div>
  );
}

export default App;
