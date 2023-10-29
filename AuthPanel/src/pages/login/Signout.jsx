import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate(); 
    const handleLogout = () => {
       
        localStorage.removeItem('authId');
        
        navigate('/');
      };
      useEffect(() => {
        
        handleLogout();
      });
 
  return (
    <div>
      
    </div>
  );
};

export default Logout;
