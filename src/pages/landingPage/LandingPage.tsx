import React from "react";
import CatalogManager from "./tubComponents/CatalogManager";
import Dashboard from "./tubComponents/deshboard/Dashboard";
import PendingOrders from "./tubComponents/PendingOrders";
import UserManagements from "./tubComponents/UsersManagement";
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getFromLocalStorage } from "../../storageUtils";
import { getRoleFromToken } from "../../axios/userAxios";
import { useAppDispatch } from "../../redux/store";
import { setRole } from "../../redux/slices/sliceUser";

interface TabPanelProps {
  children?: React.ReactNode;
}

function TabPanel({ children }: TabPanelProps) {
  return (
    <div role="tabpanel">
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LandingPage = () => {
  const componentArray = [
    PendingOrders,
    Dashboard,
    CatalogManager,
    UserManagements,
  ];

  const [index, setIndex] = React.useState(0);

  const changeTubComponent = (
    event: React.SyntheticEvent,
    newIndex: number
  ) => {
    setIndex(newIndex);
  };

  const SelectedComponent = componentArray[index];

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [isToken, setIsToken] = React.useState(getFromLocalStorage("userToken") !== null)

  useEffect(() => {
    if (!isToken)
      navigate("/login")
    else
      getRoleFromToken()
        .then(res => {
          dispatch(setRole(res.data));
        })
  }, [])

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={index}
          onChange={changeTubComponent}
          variant="fullWidth"
          aria-label="basic tabs example"
        >
          <Tab label="pending Orders" {...a11yProps(0)} />
          <Tab label="dashboard" {...a11yProps(1)} />
          <Tab label="catalog Manager" {...a11yProps(2)} />
          <Tab label="users Management" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel>
        {isToken && <SelectedComponent />}
      </TabPanel>
    </Box>
  );
};

export default LandingPage;
