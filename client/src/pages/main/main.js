import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { get, post } from '../../service/api/http';

const Main = () => {
  const [data, setData] = useState();
  useEffect(() => {
    get('getTest')
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const postData = () => {
    // POST 요청
    post('postTest', { key: 'value' })
      .then((res) => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch((err) => {
        console.error('Error submitting data:', err);
      });
  };

  return (
    <div>
      <Typography variant="h2">Hello 이공즈ss</Typography>
      <div>{data}</div>
      <TextField id="standard-basic" label="이공즈" variant="standard" />
      <Button variant="contained" onClick={postData}>
        Post Test
      </Button>
    </div>
  );
};

export default Main;
