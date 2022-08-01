import decode from 'jwt-decode'
const JWT = 'store_token_id';
const setToken = token =>{
    localStorage.setItem(JWT, token);
};

const getToken = () =>{
    return localStorage.getItem(JWT)
}
//判断是否已经登陆
const isLogin = () =>{
    const jwToken = getToken();
    return !!jwToken && !isTokenExpired(jwToken);
};

const isTokenExpired = token =>{
    try{
        const _info = decode(token);
        return _info.exp < (Date.now() / 1000);
    }catch (e){
        return false;
    }
};

const getUser = () =>{
    const jwToken = getToken();
    if(isLogin()){
        const user =decode(jwToken);
        return user;
    }else{
        return null;
    }
}
const logout = () => {
    localStorage.removeItem(JWT);
};

global.auth={
    setToken,
    getToken,
    getUser,
    isLogin,
    logout
};