import { useNavigate } from 'react-router-dom';
import { useUser } from './Context/UserContext';

function SignOut() {

  const navigate = useNavigate();
  const {setUser} = useUser();


    function handleLogout() {
        fetch('/api/logout', {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setUser(null);
              console.log("Success user has been signed out")
              navigate('/')
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