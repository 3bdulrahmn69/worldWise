import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/FakeAuthContext';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoutes;
