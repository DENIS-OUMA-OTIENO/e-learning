import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
import Person3Icon from "@mui/icons-material/Person3";
import PeopleIcon from '@mui/icons-material/People';
import SubjectIcon from '@mui/icons-material/Subject';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ClassIcon from '@mui/icons-material/Class';

const authNavigation = [
  { name: "Profile" },
  {
    name: "Students",
    subMenu: [{ subName: "New" }],
  },
  {
    name: "Subjects",
    subMenu: [{ subName: "New" }],
  },
  {
    name: "Lessons",
    subMenu: [{ subName: "New" }],
  },
  {
    name: "Classrooms",
    subMenu: [{ subName: "New" }],
  },
  {
    name: "Teachers",
    subMenu: [{ subName: "New" }],
  },
];

const initialState = Object.fromEntries(
  authNavigation.map((item) => [item.name, false])
);

const ListItems = () => {
  const [open, setOpen] = React.useState(initialState);
  const handleClick = (itemName) => {
    setOpen((o) => ({ ...initialState, [itemName]: !o[itemName] }));
  };

const getItemIcon = (name) => {
  if(name === 'Students') return <PeopleIcon />
  if(name === 'Subjects') return <SubjectIcon />
  if(name === 'Lessons') return <CastForEducationIcon />
  if(name === 'Classrooms') return <ClassIcon />
  if(name === 'Teachers') return <PeopleIcon /> 
}

  

  return (
    <React.Fragment>
      {authNavigation.map((item) => {
        const menuItem = item.name;
        const itemIcon = getItemIcon(item.name)
        if (item.subMenu) {
          return (
            <List
              key={item.name}
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <Link
                style={{ textDecoration: "none" }}
                to={`/dash/${item.name.toLowerCase()}`}
              >
                <ListItemButton
                  onClick={() => handleClick(item.name)}
                  sx={{
                    color: "#30302f",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemIcon>
                    {itemIcon}
                  </ListItemIcon>

                  <ListItemText primary={item.name} />

                  {open[item.name] ? <ExpandMore /> : <ExpandLess />}
                </ListItemButton>
              </Link>
              <Collapse in={open[item.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu.map((item) => (
                    <span key={item.subName}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/dash/${menuItem.toLowerCase()}/${item.subName.toLowerCase()}`}
                      >
                        <ListItemButton sx={{ pl: 4, color: "#30302f" }}>
                          <ListItemIcon>
                            <AddIcon />
                          </ListItemIcon>
                          <ListItemText
                            sx={{
                              justifyContent: "flex-end",
                            }}
                            primary={item.subName}
                          />
                        </ListItemButton>
                      </Link>
                    </span>
                  ))}
                </List>
              </Collapse>
            </List>
          );
        } else {
          return (
            <Link
              style={{ textDecoration: "none" }}
              to={`/dash/${menuItem.toLowerCase()}`}
            >
              <List key={item.name}>
                <span>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        color: "#30302f",
                      }}
                    >
                      <ListItemIcon>
                        <Person3Icon />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                </span>
              </List>
            </Link>
          );
        }
      })}
    </React.Fragment>
  );
};

export default ListItems;
