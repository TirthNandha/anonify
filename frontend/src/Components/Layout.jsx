import Grid from '@mui/joy/Grid';
import Categories from './Categories';
import YourDetails from './YourDetails';
import Post from './Post';

function Layout() {
    return (
        <Grid container spacing={3} sx={{ flexGrow: 1, paddingLeft: '29px' }}>
                <Grid item xs={2.5} sx={{ height: '230px', backgroundColor: '#f0f0f0', borderRadius: '15px', marginRight: '7px', position: 'sticky', top: "172px"}}>
                    <h2 style={{paddingLeft:"5px", marginBottom: 3}}>Categories</h2>
                    <Categories />
                </Grid>
                <Grid item xs={6.5} sx={{ backgroundColor: '#e0e0e0', borderRadius: '15px', margin: '0 10px', position: 'sticky', top: "172px", zIndex: 0 }}>
                    <Post
                        college="HelloCollege"
                        department="Computer Engineering"
                        passoutYear="2024"
                        title="Sample Post"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        likes={10}
                        comments={5}
                    />
                    <Post
                        college="AnotherCollege"
                        department="Mechanical Engineering"
                        passoutYear="2023"
                        title="Another Sample Post"
                        content="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
                        likes={20}
                        comments={8}
                    />  
                    <Post
                        college="ThirdCollege"
                        department="Computer Science"
                        passoutYear="2022"
                        title="Third Sample Post"
                        content="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
                        likes={30}
                        comments={15}
                    />
                </Grid>
                <Grid item xs={2.5} sx={{ height: '230px', backgroundColor: '#d0d0d0', borderRadius: '15px', marginLeft: '7px', position: 'sticky', top: "172px" }}>
                    <h2 style={{paddingLeft:"5px", marginBottom: 3}}>Your Details</h2>
                    <YourDetails />
                </Grid>
            </Grid>
    )
}

export default Layout