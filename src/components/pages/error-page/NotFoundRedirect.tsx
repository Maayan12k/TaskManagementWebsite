import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
};