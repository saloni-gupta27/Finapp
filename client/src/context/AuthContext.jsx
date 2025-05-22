import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api";

const AuthContext = createContext();

export function AuthProvider ({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const checkAuth = async () => {
            try {
              const res = await fetch(`${API_BASE}/auth/profile`, {
                credentials: "include", // ✅ include cookie
              });
              const data = await res.json();
              if (res.ok) setUser(data.user);
            } catch (err) {
              console.error("Auth check failed:", err.message);
            } finally {
              setLoading(false);
            }
          };
      
          checkAuth();
    },[])

    const login = async (form) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ cookie
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");
        setUser(data.user);
      };
    

      const logout = async () => {
        await fetch(`${API_BASE}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        setUser(null);
        navigate("/");
      };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>       
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}