import React from "react";
import { makeStyles } from "@material-ui/core";
import { HiChevronDown } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    background: "transparent",
    padding: "40px 120px",
    margin: "auto",
    maxWidth: 1200,
    borderBottom: "1px solid #85878D",
    [theme.breakpoints.down("xs")]: {
      border: "none",
      padding: "40px 25px",
    },
  },
  inner_flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo_box: {},
  logo: {
    width: 114.14,
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: 83,
    },
  },
  menu_box: {
    display: "flex",
    alignItems: "center",
    // width: 578,
    justifyContent: "space-between",
  },
  menu_item: {
    cursor: "pointer",
    // margin: "0px 30px",
  },
  menu_text: {
    color: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: "500",
  },
  menu_dropdown_icon: {
    color: theme.palette.secondary.main,
    fontSize: 18,
  },
  button: {
    color: theme.palette.primary.white,
    padding: "20px 30px",
    border: "2px solid #1A1A1A",
    cursor: "pointer",
    borderRadius: 8,
    [theme.breakpoints.down("xs")]: {
      padding: "12px 20px",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const route = (route) => {
    navigate(`/${route}`);
  };
  const location = window.location.pathname;

  return (
    <header className={classes.header}>
      <div className={classes.inner_flex}>
        <div className={classes.logo_box}>
          <img src="logo.png" className={classes.logo} />
        </div>

        {location === "/" ? null : (
          <div className={classes.menu_box}>
            <div className={classes.menu_item}>
              <button className={classes.button} onClick={() => {
                localStorage.clear();
                navigate("/");
              }}>
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
