import ItemList from "./components/ItemList";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


function App() {
  const [ammoData, setAmmoData] = useState([])
  const [armorData, setArmorData] = useState([])
  const [ashesOfWarData, setAshesOfWarData] = useState([])
  const [incantationsData, setIncantationsData] = useState([])
  const [itemsData, setItemsData] = useState([])
  const [shieldData, setShieldData] = useState([])
  const [sorceriesData, setSorceriesData] = useState([])
  const [spiritsData, setSpiritsData] = useState([])
  const [talismansData, setTalismansData] = useState([])
  const [weaponsData, setWeaponsData] = useState([])

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch('https://eldenring.fanapis.com/api/ammos?limit=10000')
      .then(response => response.json())
      .then(json => setAmmoData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/armors?limit=10000')
      .then(response => response.json())
      .then(json => setArmorData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/ashes?limit=10000')
      .then(response => response.json())
      .then(json => setAshesOfWarData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/ashes?limit=10000')
      .then(response => response.json())
      .then(json => setAshesOfWarData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/incantations?limit=10000')
      .then(response => response.json())
      .then(json => setIncantationsData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/items?limit=10000')
      .then(response => response.json())
      .then(json => setItemsData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/shields?limit=10000')
      .then(response => response.json())
      .then(json => setShieldData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/sorceries?limit=10000')
      .then(response => response.json())
      .then(json => setSorceriesData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/spirits?limit=10000')
      .then(response => response.json())
      .then(json => setSpiritsData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/talismans?limit=10000')
      .then(response => response.json())
      .then(json => setTalismansData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/weapons?limit=10000')
      .then(response => response.json())
      .then(json => setWeaponsData(json.data))
      .catch(error => console.error(error));


  }, []);

  return (
    <>

      <Box sx={{ width: '80%', typography: 'body1', marginLeft: "10%", marginRight: "10%", display: "flex", flexDirection: "column", justifyContent: "centered" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered variant="scrollable"
              scrollButtons="auto">
              <Tab label="Ammos" value="1" />
              <Tab label="Armors" value="2" />
              <Tab label="Ashes of War" value="3" />
              <Tab label="Incantations" value="4" />
              <Tab label="Items" value="5" />
              <Tab label="Shields" value="6" />
              <Tab label="Sorceries" value="7" />
              <Tab label="Spirits" value="8" />
              <Tab label="Talismans" value="9" />
              <Tab label="Weapons" value="10" />
            </TabList>
          </Box>
          <TabPanel value="1"><ItemList items={ammoData} /></TabPanel>
          <TabPanel value="2"><ItemList items={armorData} /></TabPanel>
          <TabPanel value="3"><ItemList items={ashesOfWarData} /></TabPanel>
          <TabPanel value="4"><ItemList items={incantationsData} /></TabPanel>
          <TabPanel value="5"><ItemList items={itemsData} /></TabPanel>
          <TabPanel value="6"><ItemList items={shieldData} /></TabPanel>
          <TabPanel value="7"><ItemList items={sorceriesData} /></TabPanel>
          <TabPanel value="8"><ItemList items={spiritsData} /></TabPanel>
          <TabPanel value="9"><ItemList items={talismansData} /></TabPanel>
          <TabPanel value="10"><ItemList items={weaponsData} /></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default App;
