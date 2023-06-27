import React from 'react';
import Landing from '../components/landing';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// import { fetchAllOrders } from "../redux/action/orderAction";

import CatalogManager from '../components/catalogManager';
import Dashboard from '../components/dashboard';
import PendingOrders from '../components/pendingOrders';
import UserManagements from '../components/usersManagement';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

  const componentArray = [CatalogManager, Dashboard, PendingOrders,UserManagements];  

const LandingPage = () => {
 
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    const SelectedComponent = componentArray[value];
  
    return (
        <>
            <p>landingPage component here</p>
            <Landing></Landing>
        </>
    )
}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="pending Orders" {...a11yProps(0)} />
            <Tab label="dashboard" {...a11yProps(1)} />
            <Tab label="catalog Manager" {...a11yProps(2)} />
            <Tab label="users Managementr" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <SelectedComponent />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SelectedComponent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SelectedComponent />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SelectedComponent />
        </TabPanel>
      </Box>
    );
};


export default LandingPage;