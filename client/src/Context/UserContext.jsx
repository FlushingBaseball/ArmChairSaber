import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext(null)

export function UserProvider({children}){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);


  useEffect(()=>{
    async function fetchUserData(){
      try {
        setLoading(true)
       const r = await fetch(`/api/check_session`, {
          credentials: 'include',
        })
          if (r.ok) {
            const userData = await r.json()
            setUser(userData)
          }
          else if (r.status !==401){
              setError("Failed to fetch user data")
          }
    } catch(err){
        setError("Network error while fetching user data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
      fetchUserData();
  },[]);




  async function signInFunction(username, password){
    setLoading(true)
try {
  const response = await fetch(`/api/login`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password})
  })
 
    if (response.ok){
    const userData = await response.json() 
    setUser(userData)
    console.log("Sign-in successful")
    return {success: true}
    } else {
      const errorData = await response.json()
      return {success: false, error: errorData.error || 'Login failed'}
    } } catch(error) {
      console.error("Caught error during sign-in :", error )
      return {success: false, error: "Network error"};
    } finally {
      setLoading(false)
    }
  }

  //function SignOut(){

  // }




  return (
    <UserContext.Provider value={{
      user,
      setUser,
      loading,
      error,
      signInFunction
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context ===null){
    throw new Error(`You are trying to use useUser outside of it's provider UserProvider`)
  }
  return context
}


  // useEffect(() => {
  //   fetch("/api/check_session").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     } else {
  //       console.log("User is not signed in to an account");
  //     }
  //   });
  // }, []);
