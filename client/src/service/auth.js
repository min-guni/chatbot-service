import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate, get } from './api/http';

export default function Auth(SpecificComponent, loginRequired) {
  function AuthenticationCheck(props) {
    let navigate = useNavigate();
    let token = localStorage.getItem('access_token');

    useEffect(() => {
      if (!loginRequired) {
        return;
      }
      if (token === null && loginRequired) {
        navigate('/signin');
        return;
      }
      authenticate(token).catch(() => {
        if (loginRequired) {
          navigate('/signin');
        }
      });
    }, []);

    return <SpecificComponent {...props} />;
  }

  // Auth 함수가 직접 컴포넌트를 반환하도록 수정
  return <AuthenticationCheck />;
}
