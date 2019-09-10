export const setToken = (token) => {
    localStorage.setItem('sometokenname', token)
}

export const getToken = () => {
    return localStorage.getItem('sometokenname')
}

export const isLoggedIn = () => {
    if (getToken()) {
        return true
    } else {
        return false
    }
}

export const logout = () => {
    localStorage.removeItem('sometokenname')
}

//Exercise - Add funtionality to check if token has expired or not