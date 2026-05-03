/**
 * api layer
 */

//auth api created for login and signup
import api from "./api";
// register function
export async function register(username,email,password){
    try {
        const response = await api.post('/auth/register',{username,email,password});
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

//login function
export async function login(email,password){
    try {
        const response = await api.post('/auth/login',{email,password});
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}


//logout function
export async function logout(){
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}


    //get-me function
    export async function getMe(){
        try {
            const response = await api.get('/auth/get-me');
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    }