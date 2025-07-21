// components/LogoutButton.js
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from the admin panel.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      dispatch(logout());
      localStorage.removeItem("token");

      MySwal.fire('Logged out', 'You have been logged out.', 'success');
      navigate('/login');
    }
  };

  return (
  <i className="bx bx-log-out" onClick={handleLogout} id="log_out"></i>
  );
};

export default LogoutButton;