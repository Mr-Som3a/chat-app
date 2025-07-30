import { Box, Typography, List, ListItem, Avatar } from "@mui/material";
import useUserStore from "../store/user.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const { users, fetchUsers, setChatWith } = useUserStore();
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box
      sx={{
        width: "25%",
        bgcolor: "#005079ff",
        color: "white",
        p: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Friends
      </Typography>
      <List>
        {users?.length === 0 ? (
          <span>empty</span>
        ) : (
          users?.map((user) => (
              <Link key={user._id} to={`/message/${user._id}`} onClick={()=>setChatWith(user)}>
            <ListItem >
                <Avatar
                  sx={{ bgcolor: "green", marginRight: "5px" }}
                  variant="rounded"
                >
                  {user.fullName.slice(0, 1)}
                </Avatar>
                <span>{user.fullName}</span>
            </ListItem>
              </Link>
          ))
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
