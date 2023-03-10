import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {registerUserEvent} from "../../redux/actionCreators/authActionCreator";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(username && password && password === passwordConfirm){
        const data={
            "userName":username,
            password
        };
        dispatch(registerUserEvent(data, ()=>{navigate("/login")}));
    }
    else{
        alert("please confirm your password");
    }
  }


  return (
  <div className='container-fluid'>
    <h1 className='display-1 my-5 text-center'>Register here</h1>
      <div className='row'>
        <div className='col-md-5 mx-auto mt-5'>
          <form onSubmit={handleSubmit}>
            <div className='form-group my-2'>
            <input type="text" name="username" className="form-control" placeholder='username' value={username}
            onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='form-group my-2'>
            <input type="password" name="password" className="form-control" placeholder='password' value={password
            }
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className='form-group my-2'>
                      <input type="password" name="passwordConfirm" className="form-control" placeholder='re-type password' value={passwordConfirm
                      }
                          onChange={(e) => setPasswordConfirm(e.target.value)}
                      />
                  </div>
                  <button type="submit"  className="btn btn-primary my-2 form-control">Register
                  </button>
          </form>
              <Link to="/login">
                  Already a member? Login Now
              </Link>
          </div>
      </div>

  </div>

  );
};

export default RegisterPage;
