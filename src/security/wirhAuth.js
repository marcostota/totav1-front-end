import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const withAuth = (WrappedComponent) => {
    const ComponentWithAuth = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            } else {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp < currentTime) {
                        navigate('/login');
                    }
                } catch (error) {
                    navigate('/login');
                }
            }
        }, []);

        return <WrappedComponent {...props} />;

    }
    return ComponentWithAuth;
};

export default withAuth;
