export const getToken=()=>{
    const token=localStorage.getItem('TOKEN')
    if(token)
    {
        return token 
    }
    return ""
}

export const setToken=(token)=>{
    localStorage.setItem('TOKEN',token)
}
export const removeToken=()=>{
    localStorage.removeItem('TOKEN')
}