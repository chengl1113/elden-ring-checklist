import React, { useState } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const ItemCard = ({ item, updateState }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [state, setState] = updateState;  // Destructure updateState

    const imageUrl = item.image;  // Sample image
    const primaryText = item.name;
    const secondaryText = item.description;
    const tertiaryText = item.passive || "";

    const handleCheck = (event) => {
        const newCheckedState = event.target.checked;
        console.log("isChecked", isChecked);
        console.log("newCheckedState", newCheckedState);
        setIsChecked(newCheckedState);

        if (newCheckedState) {
            // Add item to the state array if checked
            setState([...state, primaryText]);
        } else {
            // Remove item from the state array if unchecked
            setState(state.filter(item => item !== primaryText));
        }
    }

    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                border: '1px solid #ccc', // Add a border here
                borderRadius: '8px',      // Optional: to round the corners
                padding: '16px',          // Add padding inside the card
                marginBottom: '8px',      // Add spacing between list items
                width: '80vw',
                boxSizing: 'border-box'
            }}>
            {/* Checkbox */}
            <Checkbox edge="start" checked={isChecked} tabIndex={-1} disableRipple onChange={handleCheck} />

            {/* Image */}
            <ListItemAvatar>
                <Avatar alt={primaryText} src={imageUrl} sx={{ width: 56, height: 56 }} />
            </ListItemAvatar>

            {/* Text Fields */}
            <Grid container spacing={2} sx={{ marginLeft: 2 }}>
                <Grid item xs={12} sm={4}>
                    {/* Primary Text */}
                    <ListItemText primary={primaryText} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    {/* Secondary Text */}
                    <ListItemText secondary={secondaryText} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    {/* Tertiary Text */}
                    <ListItemText secondary={tertiaryText} />
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default ItemCard;
