import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ChatBot from '../../components/chatbot/chatbot';
import Dashboard from '../../components/dashboard/dashboard';
import EditTable from '../../components/timetable/editTable';
const Main = () => {
  const [menu, setMenu] = useState('ChatBot');

  return (
    <div>
      {menu === 'ChatBot' && <ChatBot />}
      {menu === 'Dashboard' && <Dashboard />}
      {menu === 'Timetable' && <EditTable />}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={menu}
          onChange={(event, newValue) => {
            setMenu(newValue);
          }}
        >
          <BottomNavigationAction label="ChatBot" value="ChatBot" icon={<SmartToyIcon />} />
          <BottomNavigationAction label="Dashboard" value="Dashboard" icon={<DashboardIcon />} />
          <BottomNavigationAction
            label="Timetable"
            value="Timetable"
            icon={<EventAvailableIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default Main;
