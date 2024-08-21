import React, { useState, useEffect } from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Cookies from 'js-cookie'


const ItemCard = ({ item, cookieName }) => {

    const [isChecked, setIsChecked] = useState(false);
    // const [state, setState] = updateState;  // Destructure updateState

    const imageUrl = item.image;  // Sample image
    const primaryText = item.name;
    const secondaryText = item.description;
    const tertiaryText = item.passive || "";

    const handleCheck = (event) => {
        console.log("cookieName", cookieName);
        const newCheckedState = event.target.checked;
        setIsChecked(newCheckedState);

        // Get the cookie value or initialize it if it doesn't exist
        let cookieValue = Cookies.get(cookieName);

        // If the cookie does not exist or is empty, initialize as an empty array
        if (!cookieValue) {
            Cookies.set(cookieName, JSON.stringify([]), { expires: 365 * 10 });
            cookieValue = '[]'; // Initialize as an empty array
        }

        // Parse the cookie value to an array
        let cookieValueList;
        try {
            cookieValueList = JSON.parse(cookieValue);
            // Ensure it is an array (to handle edge cases where the cookie might not be a valid array)
            if (!Array.isArray(cookieValueList)) {
                cookieValueList = [];
            }
        } catch (error) {
            // In case parsing fails, initialize as an empty array
            console.error('Error parsing cookie:', error);
            cookieValueList = [];
        }

        if (newCheckedState) {
            // Add the item to the list if checked
            if (!cookieValueList.includes(primaryText)) {
                cookieValueList.push(primaryText);
            }
        } else {
            // Remove the item from the list if unchecked
            cookieValueList = cookieValueList.filter(item => item !== primaryText);
        }

        // Update the cookie with the modified list
        Cookies.set(cookieName, JSON.stringify(cookieValueList), { expires: 365 * 10 });

        console.log(Cookies.get(cookieName));
    };




    // useEffect(() => {
    //     if (isChecked) {
    //         setState([...state, primaryText]);
    //     } else {
    //         setState(state.filter(item => item !== primaryText));
    //     }

    // }, [isChecked]);


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
            <Checkbox edge="start" checked={isChecked} tabIndex={-1} onChange={handleCheck} />

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
