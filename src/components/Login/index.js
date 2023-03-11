import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserNameAndPassWordEvent } from "../../redux/actionCreators/authActionCreator"

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();
    setIsLoading(true);
    if(username && password){
        const data={
            username: username,
            password: password
        };
        dispatch(getUserNameAndPassWordEvent(data, () => {
            setIsLoading(false);
            navigate("/dashboard")
        }));
    }
    else{
        alert("username or password cannot be blank");
    }    
  }
  return (
        <div className='container-fluid'>
        <h1 className='display-1 my-5 text-center'>Login here</h1>
            <div className='row'>
                <div className='col-md-5 mx-auto mt-5'>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn btn-primary my-2 form-control" disabled={isLoading}>Login
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
