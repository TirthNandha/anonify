import * as React from 'react';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import '@fontsource/inter';
import Categories from './Categories';
import YourDetails from './YourDetails';


const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

function Content() {
    return (
        <div>
            <Grid container spacing={3} sx={{ flexGrow: 1, paddingLeft: '29px' }}>
                <Grid item xs={2.5} sx={{ height: '230px', backgroundColor: '#f0f0f0', borderRadius: '15px', marginRight: '7px', position: 'sticky', top: "172px"}}>
                    <h2 style={{paddingLeft:"5px", marginBottom: 3}}>Categories</h2>
                    <Categories />
                </Grid>
                <Grid item xs={6.5} sx={{ backgroundColor: '#e0e0e0', borderRadius: '15px', margin: '0 10px', position: 'sticky', top: "172px", zIndex: 0 }}>
                    <Item>Item 1</Item>
                </Grid>
                <Grid item xs={2.5} sx={{ height: '230px', backgroundColor: '#d0d0d0', borderRadius: '15px', marginLeft: '7px', position: 'sticky', top: "172px" }}>
                    <h2 style={{paddingLeft:"5px", marginBottom: 3}}>Your Details</h2>
                    <YourDetails />
                </Grid>
            </Grid>

        </div>
    )
}

export default Content;