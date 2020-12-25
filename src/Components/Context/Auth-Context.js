import React, {useState} from "react";

export const AuthContext = React.createContext({
    userId : null,
    accessToken : null,
    refreshToken : null,
    login : () => {},
})

export const AuthContextProvider = (props) => {
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const loginHandler = (aToken, rToken, userId) => {
        setAccessToken(aToken);
        setRefreshToken(rToken);
        setUserId(userId);
        // localStorage.setItem('access_token',aToken);
        // localStorage.setItem('refresh_token',rToken);
        // localStorage.set('userId',userId);
    }
    return(
        <AuthContext.Provider value={{userId: userId, accessToken: accessToken, refreshToken: refreshToken, login:loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    )

}