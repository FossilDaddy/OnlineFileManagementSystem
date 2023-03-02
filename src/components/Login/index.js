import React, { useState } from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
        <div className='container-fluid'>
        <h1 className='display-1 my-5 text-center'>Login here</h1>
            <div className='row'>
                <div className='col-md-5 mx-auto mt-5'>
                    <form>
                        <div className='form-group my-2'>
                            <input type="text" name="username" className="form-control" placeholder='username' value={username
                            }
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className='form-group my-2'>
                            <input type="password" name="password" className="form-control" placeholder='password' value={password
                            }
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                        <button type="submit" className="btn btn-primary my-2 form-control">Login
                        </button>
                    </form>
                    <Link to="/register">
                        Not a member? Register Now
                    </Link>
                </div>
            </div>

        </div>

  );
};

export default LoginPage;
