import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box'
import YourDetails from './YourDetails';
import DisplayPost from './DisplayPost';

function PostLayout() {
    return (
        <Grid container spacing={2} sx={{ flexGrow: 1, px: 2, mt: 2 }}>
    <Grid item xs={12} md={8} lg={9} sx={{ mb: 2 }}>
        <Box sx={{ backgroundColor: '#e0e0e0', borderRadius: '15px', p: 2, position: 'sticky', top: "172px", zIndex: 0 }}>
            <DisplayPost/>
        </Box>
    </Grid>
    <Grid item xs={12} md={4} lg={3}>
        <Box sx={{ backgroundColor: '#d0d0d0', borderRadius: '15px', p: 2, position: 'sticky', top: "172px" }}>
            <h2 style={{ marginBottom: 3 }}>Your Details</h2>
            <YourDetails />
        </Box>
    </Grid>
</Grid>
    )
}

export default PostLayout;