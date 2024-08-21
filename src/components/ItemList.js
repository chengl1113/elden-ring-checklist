import React, { useState, useEffect } from 'react';
import { FixedSizeList as VirtualizedList } from 'react-window';
import TextField from '@mui/material/TextField';
import ItemCard from './ItemCard';
import ProgressBar from './ProgressBar';
import Cookies from 'js-cookie';

const ItemList = ({ items, cookieName }) => {
    // Fetch initial cookie value and parse it
    const cookieValue = Cookies.get(cookieName) || '[]';
    const cookieList = JSON.parse(cookieValue);

    const [currentObtained, setCurrentObtained] = useState(cookieList.length);

    // State for the filter text and viewport height
    const [filter, setFilter] = useState("");
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight - 100);

    // Update viewport height on window resize
    useEffect(() => {
        const handleResize = () => setViewportHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Filter items based on the filter text
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

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
            <TextField
                label="Filter by name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
            />

            <ProgressBar current={currentObtained} total={filteredItems.length} />

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
}

export default ItemList;
