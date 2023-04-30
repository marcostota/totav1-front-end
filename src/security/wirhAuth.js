import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    const ComponentWithAuth = (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
            }
        }, []);

        return <WrappedComponent {...props} />;

    }
    return ComponentWithAuth;
};

export default withAuth;
