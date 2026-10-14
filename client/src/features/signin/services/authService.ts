import { apiFetch } from "@/services/api";

type Credentials = {email : string, password : string};

export async function auth(credentials: Credentials) {
    return apiFetch("/api/auth", {
        method : "POST", 
        body : JSON.stringify(credentials)
    })
    
}