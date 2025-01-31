import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [nickname, setNickname] = useState('');
    const [level, setLevel] = useState(1);
    const [points, setPoints] = useState(0);

    return (
        <UserContext.Provider value={{ nickname, setNickname, level, setLevel, points, setPoints }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);