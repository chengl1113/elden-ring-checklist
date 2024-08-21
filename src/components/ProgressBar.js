import React, { useState } from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';


const ProgressBar = ({ current, total }) => {
    const [progress, setProgress] = useState(current / total * 100);

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: '20px', marginBotton: '20px' }}>
            {/* Progress Bar */}
            <Box sx={{ width: '90%', marginRight: '10px' }}>
                <LinearProgress variant="determinate" value={progress} />
            </Box>

            {/* Progress Number */}
            <Typography variant="body2" color="textSecondary">
                {`${current} / ${total}`}
            </Typography>
        </Box>
    )
}

export default ProgressBar
