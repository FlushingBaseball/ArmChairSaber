import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp( {setUser}) {

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

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data)
        console.log('Sign-up successful:', data);
        navigate('/')
      })
      .catch((error) => {
        console.error('Error during sign-up:', error);
      });
  };

  return (
    <div className='signupDiv'>
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
      <div className='form-group'>
        <label className='signInUpLabel'>
          Email:
          </label>
          <input
            className='signInUpFormInput'
            type="text"
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
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        <br />
      </div>

        <button className='signInUpbtn' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;