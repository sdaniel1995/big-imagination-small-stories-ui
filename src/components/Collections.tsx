import axios from 'axios';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
import { useState, useEffect } from 'react';

const Collections = () => {
    const [showCollections, setShowCollections] = useState<boolean>(false);
    const [files, setFiles] = useState<Object>();

    useEffect(() => {
        const fetchData = async () => {
            const files = await axios('http://18.220.242.141:8081/api/files');
            setFiles(files.data);
          };
          fetchData();
    }, [showCollections]);

    return (
        <div className='homeSelections'>
            {console.log(files)}
            <h1 onClick={() => setShowCollections(!showCollections)}>Collections</h1>
            {showCollections &&
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <MusicNote />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            }
        </div>
    );
};

export default Collections;
