import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn( {setUser}) {

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

    fetch('/login', {
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
        console.log('Sign-in successful:', data);
        console.log(data)
        navigate("/")
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };
  

  return (
    <div id='signInForm'> 
      <h2 className='signInText' >Sign In</h2>
      <form className='signForm' onSubmit={handleSubmit}>
        <label className='signInLabel'>
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
        <label className='signInLabel'>
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
        <button className='signInUpbtn' type="submit">Sign In</button>
      </form>
      <div>


      </div>

    </div>
  );
}

export default SignIn;