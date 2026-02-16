import { createContext, useContext, useState } from "react";

interface AuthState {
    token: string | null;
    role: 'ADMIN' | 'STUDENT' | 'TEACHER' | null
}

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState<AuthState>({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role') as any
    })

    const login = (token: string, role: string) => {
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        setAuth({ token, role: role as any })
    }

    const logout = () => {
        localStorage.clear()
        setAuth({ token: null, role: null })
    }
    return (
        <AuthContext.Provider value={{ login, logout, auth }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext)