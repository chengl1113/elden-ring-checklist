import React, { useState, useEffect } from 'react';
import { FixedSizeList as VirtualizedList } from 'react-window';
import { TextField, Checkbox, FormControlLabel, Grid } from '@mui/material';
import ItemCard from './ItemCard';
import ProgressBar from './ProgressBar';
import Cookies from 'js-cookie';

const ItemList = ({ items, cookieName }) => {
    // Fetch initial cookie value and parse it
    const cookieValue = Cookies.get(cookieName) || '[]';
    const cookieList = JSON.parse(cookieValue);

    const [currentObtained, setCurrentObtained] = useState(cookieList.length);
    const [filter, setFilter] = useState(""); // State for the filter text
    const [showChecked, setShowChecked] = useState(true); // Checkbox state for showing checked items
    const [showUnchecked, setShowUnchecked] = useState(true); // Checkbox state for showing unchecked items
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight - 100); // State for the viewport height

    // Update viewport height on window resize
    useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight - 100);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filter items based on the filter text and checked/unchecked status
    const filteredItems = items.filter((item) => {
        const isChecked = cookieList.includes(item.name);
        const matchesFilter = item.name.toLowerCase().includes(filter.toLowerCase());

        // Apply filters based on the checkboxes
        if (!matchesFilter) return false;
        if (showChecked && showUnchecked) return true;
        if (showChecked) return isChecked;
        if (showUnchecked) return !isChecked;
        return false;
    });

    // Row component for react-window
    const Row = ({ index, style }) => (
        <div style={style}>
            <ItemCard
                item={filteredItems[index]}
                cookieName={cookieName}
                updateCurrent={setCurrentObtained}
            />
        </div>
    );

    // Calculate the height for the VirtualizedList to fit within the viewport
    const itemHeight = 120; // Height of each item (in pixels)
    const listHeight = Math.min(viewportHeight - 160, filteredItems.length * itemHeight); // Adjust 160 to account for other UI elements

    return (
        <>
            {/* TextField for filtering by name */}
            <TextField
                label="Filter by name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
            />

            {/* Checkboxes for filtering checked/unchecked items */}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showChecked}
                                onChange={(e) => setShowChecked(e.target.checked)} // Update checked filter
                            />
                        }
                        label="Show Checked Items"
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showUnchecked}
                                onChange={(e) => setShowUnchecked(e.target.checked)} // Update unchecked filter
                            />
                        }
                        label="Show Unchecked Items"
                    />
                </Grid>
            </Grid>

            {/* Progress bar */}
            <ProgressBar current={currentObtained} total={items.length} />

            {/* VirtualizedList Component */}
            <VirtualizedList
                height={listHeight} // Height of the list to fit within viewport
                itemCount={filteredItems.length} // Number of items
                itemSize={itemHeight} // Height of each row (in pixels)
                width="105%" // Adjusted to fit within the container
            >
                {Row}
            </VirtualizedList>
        </>
    );
};

export default ItemList;
