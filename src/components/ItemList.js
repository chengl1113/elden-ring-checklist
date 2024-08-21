import React from 'react';
import { FixedSizeList as VirtualizedList } from 'react-window';
import TextField from '@mui/material/TextField';
import ItemCard from './ItemCard';
import ProgressBar from './ProgressBar';
import Cookies from 'js-cookie'


const ItemList = ({ items, cookieName }) => {
    // inital fetch of cookie
    const cookieValue = Cookies.get(cookieName) || '[]';
    const cookieList = JSON.parse(cookieValue);
    const cookieListLength = cookieList.length;


    const [filter, setFilter] = React.useState(""); // State for the filter text

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
            />
        </div>
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

            <ProgressBar current={cookieListLength} total={filteredItems.length} />

            {/* VirtualizedList Component */}
            <VirtualizedList
                height={1000} // Height of the list (in pixels)
                itemCount={filteredItems.length} // Number of items
                itemSize={120} // Height of each row (in pixels)
                width={"105%"} // Width of the list
            >
                {Row}
            </VirtualizedList>
        </>
    );
}

export default ItemList;
