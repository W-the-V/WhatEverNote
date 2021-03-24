import * as deepcopy from "deepcopy"

const GET_USER = 'session/GETUSER';
const REMOVE_USER = 'session/REMOVEUSER'

const setUser = (user) => {
    return {
        type: GET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    };
};

// not sure if should be handled by store or services...
// export const authenticate = async () => {
//     const response = await fetch("/api/auth/", {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return await response.json();
//   };
  
//   possibly converted 
  export const login = (email, password) => async (dispatch) => {

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json()
    if (response.ok){
      dispatch(setUser(data))
      
    }
    
    return data.errors;
  };
  
  export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    dispatch(removeUser())
    return response;
  };
  
  export const signUp = (username, firstName, lastName, email, password) => async (dispatch) => {

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json()
    if(response.ok && !data.errors){
      dispatch(setUser(data))
    }
    return data.errors;
  };

  export const restoreUser = () => async dispatch => {
    const response = await fetch("/api/auth/")
    const data = await response.json()
    if(response.ok && !data.errors){
      dispatch(setUser(data))
    }
    return response
  }


  let newState; 
export const sessionReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
            newState = deepcopy(state)
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = deepcopy(state)
            newState.user = null
            return newState;
        default:
            return state;
    };
};

export default sessionReducer;




// export const loadUserData = (user) => async (dispatch) => {


// }