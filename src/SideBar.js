import React, { useContext } from "react";

import { Link } from "react-router-dom";

import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  InvertColors as InvertColorsIcon,
  Assignment as AssignmentIcon,
} from "@material-ui/icons";

// import GradientIcon from "@material-ui/icons/Gradient";
// import CreateIcon from "@material-ui/icons/Create";
// import PrintIcon from "@material-ui/icons/Print";

import { AuthContext } from "./context/AuthContext";

const SideBar = ({ open }) => {
  const auth = useContext(AuthContext);
  function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }

  return (
    <div>
      <div>
        <ListItemLink to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemLink>
      </div>
      <Divider />
      <div>
        <ListItemLink to="/toners">
          <ListItemIcon>
            <InvertColorsIcon />
          </ListItemIcon>
          <ListItemText primary="Toners" />
        </ListItemLink>
      </div>
      <Divider />
      <div>
        <ListItemLink to="/tools/patterns">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Patterns" />
        </ListItemLink>
      </div>
      {auth.authState.userInfo.role === "admin" ? (
        <div>
          <Divider />

          <ListItemLink to="/admin/users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemLink>

          <ListItemLink to="/admin/toners">
            <ListItemIcon>
              <InvertColorsIcon />
            </ListItemIcon>
            <ListItemText primary="Toners" />
          </ListItemLink>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SideBar;
