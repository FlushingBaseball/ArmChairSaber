import { Navigate } from "react-router";

function SignOut( { setUser }) {

    function handleLogout() {
        fetch('/logout', {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              // Logout successful, reset user state or perform any necessary actions
              setUser(null);
              console.log("success")
              // Navigate('/signin')
            } else {
              // Handle error response if needed
              console.error('Logout failed');
            }
          })
          .catch((error) => {
            // Handle network errors
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