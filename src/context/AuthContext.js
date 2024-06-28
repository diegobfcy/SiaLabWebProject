// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { registerUser, loginUser, sendResetEmail } from '../services/UsuariosService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (email, password) => {
        try {
            const userData = await loginUser(email, password);
            setCurrentUser(userData);
        } catch (error) {
            console.log(error.toString());
            if (error.toString() === "Error: 401") {
                throw new Error("Nombre de usuario o contraseña incorrectos");
            } else {
                throw new Error("Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.");
            }
        }
    };
    

    const logout = () => {
        setCurrentUser(null);
    };

    const register = async (userData) => {
        try {
            const newUser = await registerUser(userData);
            setCurrentUser(newUser);
        } catch (error) {
            console.log(error.message);
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendResetEmail(email);
        } catch (error) {
            console.log(error.message);
        }
    };

    const values = {
        currentUser,
        login,
        logout,
        register,
        resetPassword,
    };

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
