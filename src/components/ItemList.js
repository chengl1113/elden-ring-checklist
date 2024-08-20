import React from 'react';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';  // Import the TextField for filtering
import ItemCard from './ItemCard';
import ProgressBar from './ProgressBar';

const ItemList = ({ items }) => {
    const [checked, setChecked] = React.useState([0]);
    const [filter, setFilter] = React.useState(""); // State for the filter text

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    // Filter items based on the filter text
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            <TextField
                label="Filter by name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
            />

            <ProgressBar current={checked.length} total={filteredItems.length} />

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {filteredItems.map((item, index) => (
                    <ItemCard
                        key={index}
                        item={item}
                        checked={checked.includes(index)}
                        handleToggle={handleToggle(index)}
                    />
                ))}
            </List>
        </>
    );
}

export default ItemList;
