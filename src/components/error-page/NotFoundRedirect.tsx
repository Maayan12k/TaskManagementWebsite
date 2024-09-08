import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null; 
};

export default NotFoundRedirect;