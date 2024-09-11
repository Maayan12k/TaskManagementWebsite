import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = (): JSX.Element => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();


    useEffect(() => {
        const render = isSignedIn ? isSignedIn : false;
        if (!render) {
            navigate('/log-in');
        }
    }, [])


    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}