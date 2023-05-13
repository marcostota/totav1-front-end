import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function useUserName() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserName(decodedToken.sub);
        }
    }, []);

    return userName;
}

export default useUserName;