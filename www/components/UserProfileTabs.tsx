import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/core";

const UserProfileTabs: React.FC = () => {
  return (
    <Tabs variant="soft-rounded">
      <TabList>
        <Tab>Activity</Tab>
        <Tab>Supplements</Tab>
        <Tab>AMA</Tab>
      </TabList>
    </Tabs>
  );
};

export default UserProfileTabs;
