import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Context/UserContext';

function SignIn() {

  const [isInvalid, setIsInvalid] = useState(false)
  const navigate = useNavigate();
  const {signInFunction, loading} = useUser();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const signInResult = await signInFunction(formData.username, formData.password);
    if (signInResult.success){
      navigate(`/`)
    } else {
      setIsInvalid(true);
      setTimeout(() => setIsInvalid(false), 2000);
      console.error('Error during sign-in', signInResult.error)
    }


  };
  

  return (
    <div id='signInForm'> 
      <h2 className='signInUPText' >Sign In</h2>
      {
       
               <form className={`signForm ${isInvalid ? "invalidEntry" : null}`} onSubmit={handleSubmit}>

      <div className='form-group'>
        <label className='signInUpLabel'>
          Username:
        </label>
          <input
            className='signInUpFormInput'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        <br />
      </div>

      <div className='form-group'>
        <label className='signInUpLabel'>
          Password:
          </label>
          <input
            className='signInUpFormInput'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        <br />
      </div>

        <button className='signInUpbtn' type="submit">Sign In</button>
      </form>


        
      }
 

    </div>
  );
}

export default SignIn;