import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CatalogManager from '../components/catalogManager';
import Dashboard from '../components/dashboard';
import PendingOrders from '../components/pendingOrders';
import UserManagements from '../components/usersManagement';

interface TabPanelProps {
    children?: React.ReactNode;
  }
  
  function TabPanel( { children}: TabPanelProps) {
  
    return (
      <div role="tabpanel" >      
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
const LandingPage = () => {

  const componentArray = [PendingOrders, Dashboard, CatalogManager,UserManagements];
 
    const [index, setIndex] = React.useState(0);

    const changeTubComponent = (event: React.SyntheticEvent, newIndex: number) => {
      setIndex(newIndex);
    };
  
     const SelectedComponent = componentArray[index];
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={index} onChange={changeTubComponent} aria-label="basic tabs example">
            <Tab label="pending Orders" {...a11yProps(0)} />
            <Tab label="dashboard" {...a11yProps(1)} />
            <Tab label="catalog Manager" {...a11yProps(2)} />
            <Tab label="users Managementr" {...a11yProps(3)} />
          </Tabs>
        </Box>

        <TabPanel >
          <SelectedComponent />
        </TabPanel>
      </Box>
    );
};


export default LandingPage;