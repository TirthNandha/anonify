import { Box, Typography, Avatar, Paper } from '@mui/material';

function Comment({ comment }) {
    return (
        <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {/* <Avatar sx={{ width: 32, height: 32, mr: 1 }}>{comment.username[0]}</Avatar> */}
                <Typography variant="subtitle2" fontWeight="bold">
                    {comment.username}
                </Typography>
                <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    {comment.department}
                </Typography>
                <Typography variant="subtitle2" sx={{ ml: 1 }}>
                    {comment.passoutYear}
                </Typography>
            </Box>
            <Typography variant="body2">{comment.content}</Typography>
        </Paper>
    );
}

export default Comment;