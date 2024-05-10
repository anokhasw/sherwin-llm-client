import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PsychologyIcon from '@mui/icons-material/Psychology';
import InfoIcon from '@mui/icons-material/Info';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Box
        component="nav"
        sx={{ flexGrow: 0, width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
      <Typography variant="h5" gutterBottom sx={{ marginY: 2, marginX: 1 }}>
        <strong>
          Sherwin GPT
        </strong>
      </Typography>
      <Divider />
      <List>
        <Link className="ai-links" to='/'>
          <ListItem key="Prompt Chat" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TipsAndUpdatesIcon />
              </ListItemIcon>
              <ListItemText primary="Prompt Chat" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="ai-links" to='/sherwin-ai'>
          <ListItem key="Sherwin AI" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PsychologyIcon />
              </ListItemIcon>
              <ListItemText primary="Sherwin AI" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link className="ai-links" to='/about'>
          <ListItem key="About" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
