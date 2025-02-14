import { useNavigate } from 'react-router-dom';

function SignOut( {  setUser}) {

  const navigate = useNavigate();


    function handleLogout() {
        fetch('/api/logout', {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setUser(null);
              console.log("success")
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