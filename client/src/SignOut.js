import { useNavigate } from 'react-router-dom';

function SignOut( { setUser }) {

  const navigate = useNavigate();


    function handleLogout() {
        fetch('/logout', {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              // Logout successful, reset user state or perform any necessary actions
              setUser(null);
              console.log("success")
              navigate('/signin')
            } else {
              console.error('Logout failed');
            }
          })
          .catch((error) => {
            console.error('Network error:', error);
          });
      }

    return (
        <div>
            <button className="signoutButton" onClick={handleLogout}>Sign Out</button>
        </div>
    )

}



export default SignOut;