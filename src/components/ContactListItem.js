import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function ContactListItem ({ user }) {
    return (
        <ListItem key={user.id} sx={{ mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <ListItemAvatar sx={{ mb: { xs: 1, sm: 0 } }}>
                <Avatar>{user.username.charAt(0)}</Avatar>
            </ListItemAvatar>

            <ListItemText
                primary={`${user.name} - ${user.email}`}
                secondary={`${user.phone} | ${user.company.name}`}
                sx={{ textAlign: { xs: 'center', sm: 'left' } }}
            />
            
            <Button
                variant="contained"
                color="primary"
                href={`mailto:${user.email}`}
                sx={{ ml: { sm: 2 }, mt: { xs: 1, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            >
                Contact
            </Button>
        </ListItem>
    )
}