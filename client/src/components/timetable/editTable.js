import React, { useEffect, useState } from 'react';
import {
  loadAllLecture,
  loadUserLecture,
  saveLecture,
  searchLectures,
} from '../../service/timeTable/timeTableService';
import TimeTable from './timeTable';
import {
  Backdrop,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';

import { debounce } from 'lodash';
import SearchIcon from '@mui/icons-material/Search';
import LectureList from './lectureList';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';

import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
// 공통 UI 컴포넌트 및 애니메이션 효과 임포트
import HeaderComponent from '../ui/HeaderComponent';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import { animationMixin } from '../effect/Animation';

// 글로벌 스타일 설정
const AllGlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-ExtraBold';
    src: url('/font/Pretendard-ExtraBold.ttf') format('truetype');
  }
  body {
    font-family: 'Pretendard-ExtraBold';
  }
  @font-face {
    font-family: 'Pretendard-Medium';
    src: url('/font/Pretendard-Medium.ttf') format('truetype');
  }
`;

const HighlightText = styled.span`
  color: #252a2f;
  background: linear-gradient(to right, #f2f7d3, #f9dcdc);
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
`;

// 텍스트 및 버튼 스타일
const MainTitleText = styled.p`
  font-size: 46px;
  font-weight: bold;
  text-align: center;
  padding-top: 10px;
  font-family: 'Pretendard-ExtraBold';
  color: #252a2f;
  ${animationMixin};
`;

// 페이지 상단의 헤더 박스 스타일
const HeaderBox = styled.div`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px; /* 높이 조정 */
  width: 100px;
  margin-left: 5px;
  margin-right: 5px;
`;

// 클릭 가능한 헤더 박스 스타일
const ClickableBox = styled(HeaderBox)`
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #dcdcdc;
  }
`;

// 헤더 박스 내 텍스트 스타일
const HeaderBoxTextNone = styled.p`
  font-size: 16px;
  text-align: center;
  color: #8c8c8c;
  font-family: 'Pretendard-ExtraBold';
`;

// 메인 레이아웃 스타일링
const Wrapper = styled.div`
  padding-left: 150px; // padding 일관성 있게 조정
  display: flex;
  align-items: center;
  width: 100%;
  ${animationMixin};
`;

// 입력 필드와 버튼을 포함하는 래퍼
const SecondWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 60px
  justify-content: space-between;
  height: 30%;
`;

// 채팅 메시지 입력과 전송 버튼 컨테이너
const ThirdWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 700px;
  height: 100%;
`;

// 커스텀 텍스트 입력 필드 스타일
const CustomTextInput = styled(TextInput)`
  flex: 1;
  box-sizing: border-box;
`;

// 커스텀 버튼 스타일
const CustomButton = styled(Button)`
  padding: 7px 7px;
  font-size: 30px;
  border-radius: 15px;
  cursor: pointer;
  background: linear-gradient(to right, #f2f7d3, #f9dcdc);
  color: white;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-ExtraBold';
  height: 100px;
`;

const AppBarWrapper = styled.div`
  max-width: 100px; // Adjust this value as needed
  display: flex;
  align-items: center;
  width: 20%;
`;

/*
// 메인 레이아웃 스타일링
const Wrapper = styled.div`
  padding-left: 150px; // padding 일관성 있게 조정
  display: flex;
  align-items: center;
  width: 100%;
  ${animationMixin};
`;
*/
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; // Take the full width to center content
  padding: 20px 0; // Add some padding for spacing
  ${animationMixin};
`;

const CustomSearchField = styled(TextField)`
  width: 50%; // Adjust this value as needed for the size of the search field
  .MuiInput-underline:before {
    border-bottom: 2px solid #ccc; // Custom underline color
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid #1976d2; // Custom underline color on hover
  }
`;

const GradientChipWrapper = styled.div`
  background: linear-gradient(45deg, #f2f7d3, #f9dcdc);
  border-radius: 16px; // Match Chip's border-radius
  padding: 1px; // Small padding to create a border effect around the Chip
`;

const CustomChip = styled(Chip)`
  width: 100%;
  height: 100%;
  &.MuiChip-root {
    background-color: transparent !important; // Override default background
    color: #000; // Change text color if needed
  }
`;

const EditTable = () => {
  const navigate = useNavigate();
  const [userLectureList, setUserLectureList] = useState([]);
  const [lectureList, setLectureList] = useState([]);
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState(null);
  const [detailCourse, setDetailCourse] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [lectureType, setLectureType] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);

  const major_type = [
    '교양기초(2019학번~)',
    '대학교양(2019학번~)',
    '자율선택(2019학번~)',
    'RC교육(2019학번~)',
    '문과대학',
    '상경대학',
    '경영대학',
    '이과대학',
    '공과대학',
    '생명시스템대학',
    '인공지능융합대학',
    '신과대학',
    '사회과학대학',
    '음악대학',
    '교육과학대학',
    '생활과학대학',
    '언더우드국제대학',
    '약학대학',
    '글로벌인재대학',
    '의·치·간(1학년)',
    '연계전공',
    '교직과정',
    '평생교육사과정정',
    'Study Abroad Course',
    '공통',
    'ROTC',
  ];
  const major_type_detail = [
    ['채플', '기독교의이해', '글쓰기'],
    [
      '문학과예술',
      '인간과역사',
      '언어와표현',
      '가치와윤리',
      '국가와사회',
      '지역과세계',
      '논리와수리',
      '자연과우주',
      '생명과환경',
      '정보와기술',
      '체육과건강',
    ],
    ['자율선택'],
    ['사회참여(SE)', 'YONSEI RC101', 'RC자기주도활동', 'RC심화'],
    [
      '문과대학 공통',
      '국어국문학전공',
      '중어중문학전공',
      '영어영문학전공',
      '독어독문학전공',
      '불어불문학전공',
      '노어노문학전공',
      '사학전공',
      '철학전공',
      '문헌정보학전공',
      '심리학전공',
    ],
    ['경제학전공', '응용통계학전공'],
    ['경영학전공'],
    [
      '이과대학 공통',
      '수학전공',
      '물리학전공',
      '화학전공',
      '지구시스템과학전공',
      '천문우주학전공',
      '대기과학전공',
    ],
    [
      '공과대학공통',
      '기계공학전공',
      '전기전자공학전공',
      '신소재공학전공',
      '건설환경공학전공',
      '도시공학전공',
      '건축공학전공',
      '건축학(설계)',
      '화공생명공학전공',
      '산업공학전공',
      '시스템반도체공학과',
      '디스플레이융합공학과',
    ],
    ['시스템생물학전공', '생화학전공', '생명공학전공', '생명시스템공통'],
    ['컴퓨터과학과', '인공지능학과', 'IT융합공학과', '인공지능융합대학공통'],
    ['신학과'],
    [
      '사회학전공',
      '사회과학대학공통',
      '정치외교학전공',
      '행정학전공',
      '언론홍보영상학부',
      '사회복지학전공',
      '문화인류학전공',
    ],
    ['음악대학공통', '교회음악전공', '성악전공', '피아노전공', '관현악전공', '작곡전공'],
    ['교육학전공', '체육교육학전공', '스포츠응용산업전공'],
    ['의류환경학전공', '식품영양학전공', '실내건축학전공', '아동·가족전공', '통합디자인전공'],
    [
      '공통교과과정(신촌)',
      '언더우드학부(인문사회)-비교문학과문화',
      '언더우드학부(인문사회)-국제학',
      '언더우드학부(공학)-생명과학공학',
      '언더우드학부(인문사회)-정치외교학',
      '융합사회과학부-사회정의리더십',
      '융합사회과학부-계량위험관리',
      '융합사회과학부-과학기술정책',
      '융합사회과학부-지속개발협력',
      '융합과학공학부-나노과학공학',
      '융합과학공학부-에너지환경융합',
      '융합과학공학부-바이오융합',
      '공통교과과정(국제)',
      '테크노아트학부-정보·인터랙션디자인',
      '아시아학부-아시아학',
      '테크노아트학부-창의기술경영',
      '테크노아트학부-문화디자인경영',
    ],
    ['약학전공'],
    [
      'GLC공통교과과정',
      '글로벌인재학부-국제통상전공',
      '글로벌인재학부-한국문화전공',
      '글로벌인재학부-한국언어문화교육전공',
      '글로벌인재학부-문화미디어전공',
      '글로벌인재학부-바이오생활공학전공',
      '글로벌인재학부-응용정보공학전공',
      'GLD공통교과과정',
    ],
    ['의예과(1학년)', '치의예과(1학년)', '간호(1학년)'],
    [
      '유럽지역학',
      '미국학',
      '한국및동아시아학(중국학)',
      '한국및동아시아학(한국학)',
      '한국및동아시아학(일본학)',
      '외교통상학',
      '인지과학',
      '벤처학',
      '리더십',
      '디지털예술학',
      '한국및동아시아학(동아시아학)',
      '비교문학',
      '문화비평학',
      '공공리더십',
    ],
    ['교직과정'],
    ['평생교육사과정'],
    ['Graduate', 'Undergraduate', 'Korean Language'],
    ['창업,현장실습'],
    ['군사학'],
  ];

  // 페이지 이동 함수
  const navigateTo = (path) => {
    console.log(`${path} clicked!`);
    navigate(path);
  };

  useEffect(() => {
    loadUserLecture()
      .then((res) => {
        setUserLectureList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const textChange = (query) => {
    search(query);
  };

  useEffect(() => {
    if (query !== '') {
      search(query);
    }
  }, [query, lectureType, detailCourse, searchType]);

  const search = debounce((query) => {
    if (query.trim() === '') {
      setLectureList([]);
      return;
    }
    const param = { query: query };
    if (searchType !== null) {
      param.search_type = 'professor';
    }
    if (lectureType !== null) {
      if (lectureType === '영어강의') {
        param.result_type = 'english';
      } else if (lectureType === '한국어강의') {
        param.result_type = 'korean';
      } else if (lectureType === '블렌딩강의') {
        param.result_type = 'video_blended';
      }
    }
    if (course !== null && detailCourse !== null) {
      param.major = major_type[course] + ' ' + major_type_detail[course][detailCourse];
    }
    searchLectures(param) //param을 넣어야됨 event대신
      .then((res) => {
        setLectureList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, 10);

  const save = (lecture) => {
    saveLecture(lecture).catch((err) => {
      console.log(err);
      navigate('/signin');
    });
  };

  // 시간표에서 강의 삭제
  const deleteLecture = (lecture) => {
    const newLectureList = userLectureList.filter((l) => l.id !== lecture.id);
    setUserLectureList(newLectureList);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <AllGlobalStyle />
      <HeaderComponent>
        {/* HeaderComponent의 RightContainer에 들어갈 내용을 children으로 전달 */}
        <ClickableBox onClick={() => navigateTo('/chatbot')}>
          <HeaderBoxTextNone>챗봇</HeaderBoxTextNone>
        </ClickableBox>
        <ClickableBox onClick={() => navigateTo('/timetable')}>
          <HeaderBoxTextNone>시간표</HeaderBoxTextNone>
        </ClickableBox>
      </HeaderComponent>
      <MainTitleText>
        <div style={{ paddingTop: '15px' }}>⏰
          <HighlightText>시간표 검색</HighlightText>을 도와드릴게요
        </div>
      </MainTitleText>
      <SearchWrapper>
        <CustomSearchField
          variant="standard"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setQuery(e.target.value)}
          onClick={() => setOpen(true)}
        />
      </SearchWrapper>

      <TimeTable lectureList={userLectureList} setLectureList={setUserLectureList} />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        fullWidth="md"
        maxWidth="md"
      >
        <DialogTitle fontWeight="bold"> 강의 검색</DialogTitle>
        <DialogContent dividers>
          <TextField
            hiddenLabel
            fullWidth
            variant="standard"
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
            <Chip
              style={{ background: '#f9f7f7' }}
              icon={<SearchIcon />}
              label={searchType === null ? '검색 종류 : 강의명' : '검색 종류 : 교수명'}
              onClick={(event) => {
                setOpenMenu('search_type');
                setAnchorEl(event.currentTarget);
              }}
            />
            <Chip
              style={{ background: '#f9f7f7' }}
              icon={<CastForEducationIcon />}
              label={lectureType === null ? '수업 방식' : '수업 방식 : ' + lectureType}
              onClick={(event) => {
                setOpenMenu('lecture_type');
                setAnchorEl(event.currentTarget);
              }}
            />
            <Chip
              style={{ background: '#f9f7f7' }}
              icon={<SchoolIcon />}
              label={course === null ? '전공 선택' : '전공 선택 : ' + major_type[course]}
              onClick={(event) => {
                setOpenMenu('major');
                setAnchorEl(event.currentTarget);
              }}
            />
            <Chip
              style={{ background: '#f9f7f7' }}
              icon={<MenuBookIcon />}
              label={
                course === null || detailCourse === null
                  ? '세부 전공 선택'
                  : '세부 전공 선택 : ' + major_type_detail[course][detailCourse]
              }
              onClick={(event) => {
                if (course !== null) {
                  setAnchorEl(event.currentTarget);
                  setOpenMenu('detail_major');
                }
              }}
            />
          </Stack>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'search_type'}
            onClose={() => {
              setOpenMenu(null);
              setAnchorEl(null);
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setSearchType(null);
                setOpenMenu(null);
                setAnchorEl(null);
              }}
            >
              강의명
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSearchType('교수명');
                setOpenMenu(null);
                setAnchorEl(null);
              }}
            >
              교수명
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'lecture_type'}
            onClose={() => {
              setOpenMenu(null);
              setAnchorEl(null);
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setLectureType(null);
                setOpenMenu(null);
                setAnchorEl(null);
              }}
            >
              전체
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLectureType('한국어강의');
                setOpenMenu(null);
                setAnchorEl(null);
              }}
            >
              한국어 강의
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLectureType('영어강의');
                setOpenMenu(null);
                setAnchorEl(null);
              }}
            >
              영어 강의
            </MenuItem>
            <MenuItem
              onClick={() => {
                setLectureType('블렌딩강의');
                setOpenMenu(null);
                setAnchorEl(null);
              }}
            >
              블렌딩 강의
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'major'}
            onClose={() => {
              setOpenMenu(null);
              setAnchorEl(null);
              setDetailCourse(null);
            }}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                setCourse(null);
                setOpenMenu(null);
                setAnchorEl(null);
                setDetailCourse(null);
              }}
            >
              전체
            </MenuItem>
            {major_type.map((major, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  setCourse(index);
                  setOpenMenu(null);
                  setAnchorEl(null);
                  setDetailCourse(null);
                }}
              >
                {major}
              </MenuItem>
            ))}
          </Menu>
          <Menu
            anchorEl={anchorEl}
            open={openMenu === 'detail_major'}
            onClose={() => {
              setOpenMenu(null);
              setAnchorEl(null);
              setDetailCourse(null);
            }}
          >
            {course !== null
              ? major_type_detail[course].map((major_detail, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      setDetailCourse(index);
                      setOpenMenu(null);
                      setAnchorEl(null);
                    }}
                  >
                    {major_detail}
                  </MenuItem>
                ))
              : ''}
          </Menu>
          <LectureList
            lectureList={lectureList}
            setUserLectureList={setUserLectureList}
            userLectureList={userLectureList}
            saveLecture={save}
          ></LectureList>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTable;
