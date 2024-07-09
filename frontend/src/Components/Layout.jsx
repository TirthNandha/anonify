import Grid from '@mui/joy/Grid';
import Categories from './Categories';
import YourDetails from './YourDetails';
import RenderPost from './RenderPost';

function Layout() {
    return (
        <Grid container spacing={3} sx={{ flexGrow: 1, paddingLeft: '29px' }}>
            <Grid item xs={2.5} sx={{ height: '240px', backgroundColor: '#f0f0f0', borderRadius: '15px', marginRight: '7px', position: 'sticky', top: "172px" }}>
                <h2 style={{ paddingLeft: "5px", marginBottom: 3 }}>Categories</h2>
                <Categories />
            </Grid>
            <Grid item xs={6.5} sx={{ backgroundColor: '#e0e0e0', borderRadius: '15px', margin: '0 10px', position: 'sticky', top: "172px", zIndex: 0 }}>
                <RenderPost />
            </Grid>
            <Grid item xs={2.5} sx={{ height: '300px', backgroundColor: '#d0d0d0', borderRadius: '15px', marginLeft: '7px', position: 'sticky', top: "172px" }}>
                <h2 style={{ paddingLeft: "5px", marginBottom: 3 }}>Your Details</h2>
                <YourDetails />
            </Grid>
        </Grid>
    )
}

export default Layout