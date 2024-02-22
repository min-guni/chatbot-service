import React, { useState } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    padding: 30px;
    font-size: 16px;
    line-height: 20px;
    border-radius: 15px;
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    resize: none;
    font-family: 'Pretendard-Medium';
    box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1); /* 내부 그림자 효과 추가 */
`;


function TextInput({ value, onChange, placeholder, className }) {
    // `placeholder` 대신 `value`와 `onChange`를 사용하여 텍스트 입력을 관리합니다.
    return (
        <StyledTextarea
            className={className}
            value={value} // Controlled by parent component
            onChange={onChange} // Handled by parent component
            placeholder={placeholder}
        />
    );
}

export default TextInput;
