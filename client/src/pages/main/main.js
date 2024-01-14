import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import axios from "axios";

const Main = () => {
    const [data, setData] = useState();
    useEffect(() => {
        axios.get('http://localhost:5000/api/getTest')
            .then(res =>{
                setData(res.data.message);
            })
            .catch(err => {
                console.error(err);
            })
    },[])

    const postData = () => {
        // POST 요청
        axios.post('http://localhost:5000/api/postTest', { key: 'value' })
            .then(res => {
                console.log(res.data.message);
                setData(res.data.message);
            })
            .catch(err => {
                console.error('Error submitting data:', err);
            });
    };

    return (
        <div>
            <div>Hello 이공즈ss</div>
            <div>{data}</div>
            <TextField id="standard-basic" label="이공즈" variant="standard" />
            <Button variant="contained" onClick = {postData}>Post Test</Button>
        </div>
    );
};

export default Main;