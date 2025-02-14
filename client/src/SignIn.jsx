import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn( {setUser}) {

  const [isInvalid, setIsInvalid] = useState(false)
  const navigate = useNavigate();

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

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          setIsInvalid(true);
          setTimeout(() => setIsInvalid(false), 2000);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data)
        console.log('Sign-in successful:');
        // console.log(data)
        navigate("/")
      })
      .catch((error) => {
        setIsInvalid(true);
        setTimeout(() => setIsInvalid(false), 2000);
        console.error('Error during sign-in:', error);
      });
  };
  

  return (
    <div id='signInForm'> 
      <h2 className='signInUPText' >Sign In</h2>
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
      <div>


      </div>

    </div>
  );
}

export default SignIn;