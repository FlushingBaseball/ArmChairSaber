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

    // Make the fetch request to the sign-up route on your server
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
      .then((data) => {setUser(data)
        //should indicate it was successful
        console.log('Sign-up successful:', data);
        navigate('/')
      })
      .catch((error) => {
        // should indicate it was unsuccessful
        console.error('Error during sign-up:', error);
      });
  };

  return (
    <div className='signupDiv'>
      <h2 className='center'>Sign Up</h2>
      <form className='signupForm' onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>

      

    </div>
  );
}

export default SignUp;