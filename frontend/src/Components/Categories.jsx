import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListItemContent from '@mui/joy/ListItemContent';
import RedeemIcon from '@mui/icons-material/Redeem';
import SchoolIcon from '@mui/icons-material/School';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Home from "@mui/icons-material/Home"


function Categories() {
    return(
        <List>
            <ListItem>
                <ListItemButton
                    color="neutral"
                    disabled={false}
                    selected={false}
                    variant="soft"
                >
                <ListItemDecorator><Home /></ListItemDecorator>
                    <ListItemContent>Home</ListItemContent>
                    <KeyboardArrowRightIcon />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                    color="neutral"
                    disabled={false}
                    selected={false}
                    variant="soft"
                >
                <ListItemDecorator><SchoolIcon /></ListItemDecorator>
                    <ListItemContent>Admission</ListItemContent>
                    <KeyboardArrowRightIcon />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                    color="neutral"
                    disabled={false}
                    selected={false}
                    variant="soft"
                >
                <ListItemDecorator><RedeemIcon /></ListItemDecorator>
                    <ListItemContent>Placements</ListItemContent>
                    <KeyboardArrowRightIcon />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton
                    color="neutral"
                    disabled={false}
                    selected={false}
                    variant="soft"
                >
                <ListItemDecorator><LiveHelpIcon /></ListItemDecorator>
                    <ListItemContent>General queries</ListItemContent>
                    <KeyboardArrowRightIcon />
                </ListItemButton>
            </ListItem>
        </List>
    )
}

export default Categories;