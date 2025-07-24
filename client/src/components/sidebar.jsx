import { Box, Typography, List, ListItem, Avatar} from "@mui/material";
import useUserStore from "../store/user";
const Sidebar = () => {
  const {users}=useUserStore(state=>state.users)
  console.log(users)
  return (
    <Box
      sx={{
        width: "25%",
        bgcolor: "#005079ff",
        color: "white",
        p: 2,
        // height: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Chats
      </Typography>
      <List>
        {users?.map(user=>(
          <ListItem key={user._id} button>
          <Avatar sx={{ bgcolor: "green" }} variant="rounded">
            {user.fullName||"M"}
          </Avatar>
        </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
