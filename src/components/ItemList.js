import React from 'react'
import List from '@mui/material/List';
import ItemCard from './ItemCard';

const ItemList = ({ items }) => {
    const [checked, setChecked] = React.useState([0]);

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

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {items.map((item, index) => (
                <ItemCard
                    key={index}
                    item={item}
                    checked={false}
                    handleToggle={handleToggle(index)}
                />
            ))}
        </List>
    );

}

export default ItemList
