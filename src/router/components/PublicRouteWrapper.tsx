import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import PageLoader from '../../components/PageLoader';
import { useLogoutMutation } from '../../redux/features/authApi';
import { apiFetch } from '../../server/api';
import { APP_ROUTES } from '../../constant/APP_ROUTES';
import {API_METHOD, API_ROUTES} from "../../constant/API_ROUTES.ts";

const PublicRouteWrapper = () => {
    const { userData, updateToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [logout] = useLogoutMutation();

    const fetchUserData = async () => {
        try {
            const data = await apiFetch(API_ROUTES.USER.BY_TOKEN, { method: API_METHOD.GET });
            if (data?.result) {
                updateToken({ isLoggedIn: true, userData: data.result });
            } else {
                updateToken({ isLoggedIn: false });
            }
        } catch (error) {
            console.error('Error while fetching user data:', error);
            updateToken({ isLoggedIn: false });
            await logout({}).unwrap().catch(logoutError => {
                console.error('Error during logout:', logoutError);
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;

        const initialize = async () => {
            setIsLoading(true);
            await fetchUserData();
            if (isMounted) setIsLoading(false);
        };

        initialize();

        return () => {
            isMounted = false;
        };
    }, []);

    if (isLoading) {
        return <PageLoader />;
    }

    if (userData?.isLoggedIn) {
        return <Outlet />;
    } else {
        return <Navigate to={APP_ROUTES.APP.HOME}/>;
    }
};

export default PublicRouteWrapper;
