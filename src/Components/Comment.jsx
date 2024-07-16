import { Box, Typography, Avatar, Paper } from '@mui/material';

function Comment({ comment }) {
    return (
        <Paper elevation={1} sx={{ p: 2, mb: 2, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 2 }} />
                <Box>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {comment.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {comment.department} - {comment.passoutYear}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {comment.college}
                    </Typography>
                </Box>
            </Box>
            <Typography
                variant="body2"
                sx={{
                    mt: 1,
                    fontSize: '1.2rem',
                    fontFamily: 'Arial, sans-serif',
                    backgroundColor: '#e0f7fa',
                    p: 1,
                    borderRadius: '4px'
                }}
            >
                {comment.content}
            </Typography>
        </Paper>
    );
}

export default Comment;
