import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from './api/http';

export default function Auth(SpecificComponent, loginRequired) {
  function AuthenticationCheck(props) {
    let navigate = useNavigate();

    useEffect(() => {
      get('user/me')
        .then((response) => {})
        .catch((err) => {
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
