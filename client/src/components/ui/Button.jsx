import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    padding: 7px 7px;
    font-size: 16px;
    border-width: 0px;
    border-radius: 5px;
    display: flex;
    width: 140px;
    height: 32px;
    cursor: pointer;
    align-items: center;
    //background: linear-gradient(to right, #9dbdeb, #7f85d8);
    color: white;
    justify-content: center;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Pretendard-Extrabold';
`;





function Button({ title, onClick, className }) {
    return <StyledButton className={className} onClick={onClick}>{title || "button"}</StyledButton>;
}

export default Button;