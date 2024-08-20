import ItemList from "./components/ItemList";
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function App() {
  const [ammoData, setAmmoData] = useState([]);
  const [armorData, setArmorData] = useState([]);
  const [ashesOfWarData, setAshesOfWarData] = useState([]);
  const [incantationsData, setIncantationsData] = useState([]);
  const [itemsData, setItemsData] = useState([]);
  const [shieldData, setShieldData] = useState([]);
  const [sorceriesData, setSorceriesData] = useState([]);
  const [spiritsData, setSpiritsData] = useState([]);
  const [talismansData, setTalismansData] = useState([]);
  const [weaponsData, setWeaponsData] = useState([]);
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch('https://eldenring.fanapis.com/api/ammos?limit=10000')
      .then(response => response.json())
      .then(json => setAmmoData(json.data))
      .catch(error => console.error(error));

    // API only allows for fetching 100 at a time, need to fetch 6 times to get all armor pieces


    async function fetchArmorData() {
      let armorDataTemp = [];
      const response = await fetch(`https://eldenring.fanapis.com/api/armors?limit=100`)
      const cur = await response.json()
      const data = cur.data
      armorDataTemp = [...armorDataTemp, ...data]

      // Fetch the data in multiple pages
      for (let i = 1; i <= 6; i++) {
        const response = await fetch(`https://eldenring.fanapis.com/api/armors?limit=100&page=${i}`)
        const cur = await response.json()
        const data = cur.data
        armorDataTemp = [...armorDataTemp, ...data]
        // Once all data is fetched, set the state
        if (i === 6) {
          setArmorData(armorDataTemp); // Update the state after the loop completes
        }
      }

    }

    async function fetchItemData() {
      let itemDataTemp = [];
      const response = await fetch('https://eldenring.fanapis.com/api/items?limit=10000')
      const cur = await response.json()
      const data = cur.data
      itemDataTemp = [...itemDataTemp, ...data]

      // Fetch the data in multiple pages
      for (let i = 1; i <= 5; i++) {
        const response = await fetch(`https://eldenring.fanapis.com/api/items?limit=100&page=${i}`)
        const cur = await response.json()
        const data = cur.data
        itemDataTemp = [...itemDataTemp, ...data]
        // Once all data is fetched, set the state
        if (i === 5) {
          setItemsData(itemDataTemp); // Update the state after the loop completes
        }
      }

    }

    async function fetchWeaponData() {
      let weaponDataTemp = [];
      const response = await fetch('https://eldenring.fanapis.com/api/weapons?limit=10000')
      const cur = await response.json()
      const data = cur.data
      weaponDataTemp = [...weaponDataTemp, ...data]

      // Fetch the data in multiple pages
      for (let i = 1; i <= 4; i++) {
        const response = await fetch(`https://eldenring.fanapis.com/api/weapons?limit=100&page=${i}`)
        const cur = await response.json()
        const data = cur.data
        weaponDataTemp = [...weaponDataTemp, ...data]
        // Once all data is fetched, set the state
        if (i === 4) {
          setWeaponsData(weaponDataTemp); // Update the state after the loop completes
        }
      }

    }



    fetch('https://eldenring.fanapis.com/api/ashes?limit=10000')
      .then(response => response.json())
      .then(json => setAshesOfWarData(json.data))
      .catch(error => console.error(error));

    fetch('https://eldenring.fanapis.com/api/incantations?limit=10000')
      .then(response => response.json())
      .then(json => setIncantationsData(json.data))
      .catch(error => console.error(error));

    // fetch('https://eldenring.fanapis.com/api/items?limit=10000')
    //   .then(response => response.json())
    //   .then(json => setItemsData(json.data))
    //   .catch(error => console.error(error));

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

    // fetch('https://eldenring.fanapis.com/api/weapons?limit=10000')
    //   .then(response => response.json())
    //   .then(json => setWeaponsData(json.data))
    //   .catch(error => console.error(error));

    fetchArmorData();
    fetchItemData();
    fetchWeaponData();
  }, []);

  useEffect(() => {
    console.log(armorData)

  }, [armorData])


  return (
    <Box sx={{
      width: '80%',
      typography: 'body1',
      marginLeft: "10%",
      marginRight: "10%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <TabContext value={value}>
        {/* TabList with sticky position */}
        <Box sx={{
          position: 'sticky', // Make it sticky
          top: 0, // Stick it to the top of the page
          zIndex: 1, // Ensure it stays above other elements
          bgcolor: 'background.paper', // Add background to avoid transparency
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
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

        <TabPanel value="1">
          <ItemList items={ammoData} />
        </TabPanel>
        <TabPanel value="2">
          <ItemList items={armorData} />
        </TabPanel>
        <TabPanel value="3">
          <ItemList items={ashesOfWarData} />
        </TabPanel>
        <TabPanel value="4">
          <ItemList items={incantationsData} />
        </TabPanel>
        <TabPanel value="5">
          <ItemList items={itemsData} />
        </TabPanel>
        <TabPanel value="6">
          <ItemList items={shieldData} />
        </TabPanel>
        <TabPanel value="7">
          <ItemList items={sorceriesData} />
        </TabPanel>
        <TabPanel value="8">
          <ItemList items={spiritsData} />
        </TabPanel>
        <TabPanel value="9">
          <ItemList items={talismansData} />
        </TabPanel>
        <TabPanel value="10">
          <ItemList items={weaponsData} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default App;
