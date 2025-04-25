import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './Context/UserContext';


function SignUp() {

  const navigate = useNavigate();
  const {setUser} = useUser();
  const [isInvalid, setIsInvalid] = useState(false)
  const [showCharacters, setShowCharacters] = useState(false)
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

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          setIsInvalid(true)
          setTimeout(() => setIsInvalid(false), 2000);
          return response.json().then(errorData => {
            throw new Error(errorData.Error || 'Network response was not ok');
          })
        }
        return response.json();
      })
      .then((data) => {
        setUser(data)
        console.log('Sign-up successful:');
        navigate('/')
      })
      .catch((error) => {
        setIsInvalid(true);
        setTimeout(() => setIsInvalid(false), 2000);
        console.error('Error during sign-up:', error);
      });
  };

  return (
    <div className={`signupDiv ${isInvalid ? "invalidEntry" : null}`}>
      <h2 className='signInUPText'>Sign Up</h2>
      <form className='signupForm' onSubmit={handleSubmit}>
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
            {/* <span className="requirements-span">Username must be </span> */}
      <div className='form-group'>
        <label className='signInUpLabel'>
          Email:
          </label>
          <input
            className='signInUpFormInput'
            type="email"
            name="email"
            value={formData.email}
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
            type={showCharacters ? "text": "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            
          />
          <i onClick={()=> setShowCharacters(!showCharacters)} className={showCharacters ? "fa-regular fa-eye-slash" :"fa-regular fa-eye"} id='eyeIcon'></i>
        <br />
      </div>
            <span className="requirements-span">Password must include
             <b className='sign-up-bold'> nine characters</b>, <br></br>
             <b className="sign-up-bold"> one number</b>,
             <b className="sign-up-bold"> a capital letter</b>, and a
             <b className="sign-up-bold"> symbol</b> </span>
        <button className='signInUpbtn' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;