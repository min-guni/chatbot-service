import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex; // Flex 컨테이너로 설정
  width: 85%;
  align-items: flex-start; // 아이템들을 상단 정렬
  gap: 50px; // 아이템 간 간격 설정
`;

const UploadArea = styled.div`
  //border: 2px dashed #e8e8e8;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  color: #252a2f;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #dcdcdc;
  }
  min-width: 50%;
  height: 100px;
  box-sizing: border-box;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1); /* 내부 그림자 효과 추가 */
  font-family: 'Pretendard-Medium';
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  display: flex; // Flex 컨테이너로 설정
  flex-direction: column; // 아이템들을 세로로 배치
  align-items: center; // 가운데 정렬
  gap: 10px; // 아이템 간 간격 설정
  width: 50%;
  font-family: 'Pretendard-ExtraBold';
`;

const PreviewImage = styled.img`
  max-width: 300px; // 이미지 최대 너비 조정
  max-height: 200px; // 이미지 최대 높이 조정
  margin-left: 10px;
  //border-radius: 10px; // 이미지 둥근 모서리 추가
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15); /* 그림자 효과 추가 */
  font-family: 'Pretendard-ExtraBold';
`;

const FileName = styled.p`
  font-size: 10px;
  color: #252a2f;
`;

const ImgUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    // 파일 선택 취소를 고려하여 조건 추가
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
      onFileSelect(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // 선택된 파일이 없을 경우 기존 상태 유지 또는 적절한 처리
      console.log('No file selected.');
    }
  };
  

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileChange(event);
  };

  return (
    <Container>
      <UploadArea onClick={handleClick} onDrop={handleDrop} onDragOver={handleDragOver}>
        {selectedFile ? (
          <>
            <div style={{ color: 'green'}}>✅ 이미지가 업로드 되었습니다</div>
            <div style={{ fontSize: '12px', marginTop: '5px', color: '#252a2f' }}>다시 업로드하려면 클릭</div>
          </>
        ) : (
          '클릭 또는 드래그하여 업로드'
        )}
      </UploadArea>
      <HiddenInput
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {previewURL && (
        <PreviewContainer>
          <PreviewImage src={previewURL} alt="Preview" />
          <FileName>{fileName}</FileName>
        </PreviewContainer>
      )}
    </Container>
  );
};

export default ImgUpload;
