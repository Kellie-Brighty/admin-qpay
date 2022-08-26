import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  body: {
    color: "#fff",
    marginTop: 96,
    padding: "0px 120px",
    margin: "auto",
    maxWidth: 1200,
    marginBottom: 96,
    [theme.breakpoints.down("xs")]: {
      padding: "0px",
    },
  },
  inner_flex: {
    display: "flex",
    alignItems: "center",
    background: "#090909",
    padding: 32,
    // justifyContent: "space-between",
  },
  exchangers_title: {
    fontSize: 34,
    fontWeight: "600",
    color: theme.palette.secondary.main,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      fontWeight: "500",
    },
  },
  exchangers_title_email: {
    fontSize: 34,
    fontWeight: "600",
    color: theme.palette.secondary.main,
    background: "transparent",
    marginLeft: 115,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      fontWeight: "500",
      marginLeft: 36,
    },
  },
  exchangers_title_image: {
    fontSize: 34,
    fontWeight: "600",
    color: theme.palette.secondary.main,
    background: "transparent",
    marginLeft: 153,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      fontWeight: "500",
      marginLeft: 46,
    },
  },
  exchangers_title_state: {
    fontSize: 34,
    fontWeight: "600",
    color: theme.palette.secondary.main,
    background: "transparent",
    marginLeft: 206,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
      fontWeight: "500",
      marginLeft: 38,
    },
  },
  exchangers_box: {
    marginTop: 28,
  },
  exchanger_flex: {
    display: "flex",
    alignItems: "center",
    background: "#090909",
    padding: 32,
    justifyContent: "space-between",
    // [theme.breakpoints.down("xs")]: {
    //   justifyContent: "space-around",
    // },
  },
  exchanger_id: {
    textAlign: "center",
    marginLeft: 107,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      fontWeight: "500",
      marginLeft: 10,
    },
  },
  exchanger_email: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    // marginLeft: 202,
    textAlign: "center",
    width: 250,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      fontWeight: "500",
      marginLeft: -50,
    },
  },
  exchanger_image: {
    width: 51,
    // marginLeft: 167,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      width: 22,
      marginLeft: -50,
    },
  },
  active_button: {
    padding: "16px 55px",
    background: "#73F49D",
    borderRadius: 8,
    border: "none",
    outline: "none",
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
    width: 170,
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: 46,
      padding: "5px 8px",
      fontSize: 10,
      fontWeight: "500",
    },
  },
  inactive_button: {
    color: theme.palette.primary.white,
    padding: "16px 55px",
    border: "2px solid #1A1A1A",
    cursor: "pointer",
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 600,
    width: 170,
    [theme.breakpoints.down("xs")]: {
      width: 46,
      padding: "5px 8px",
      fontSize: 8,
      fontWeight: "500",
    },
  },
}));

const Exchangers = () => {
  const classes = useStyles();
  const [firstState, setFirstState] = useState("Active");
  const [secondState, setSecondState] = useState("Inactive");
  const [thirdState, setThirdState] = useState("Inactive");
  const [exchangers, setExchangers] = useState();

  // const exchangers = [
  //   {
  //     id: 1,
  //     email: "ayomikunalimi@gmail.com",
  //     image: "img1.png",
  //     state: firstState,
  //     setter: setFirstState,
  //   },
  //   {
  //     id: 2,
  //     email: "mofolawuyi@gmail.com",
  //     image: "img2.png",
  //     state: secondState,
  //     setter: setSecondState,
  //   },
  //   {
  //     id: 3,
  //     email: "Cephastrust@gmail.com",
  //     image: "img3.png",
  //     state: thirdState,
  //     setter: setThirdState,
  //   },
  // ];

  // const toggleState = (id) => {
  //   exchangers.find((obj) => {
  //     if (obj.id === id) {
  //       if (obj.state === "Active") {
  //         obj.setter("Inactive");
  //       } else {
  //         obj.setter("Active");
  //       }
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (firstState === "Active") {
  //     setSecondState("Inactive");
  //     setThirdState("Inactive");
  //   }
  //   if (secondState === "Active") {
  //     setFirstState("Inactive");
  //     setThirdState("Inactive");
  //   }
  //   if (thirdState === "Active") {
  //     setSecondState("Inactive");
  //     setFirstState("Inactive");
  //   }
  // }, [firstState, secondState, thirdState]);

  const fetchExhangers = async () => {
    const token = localStorage.getItem("qpay_session_token");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/exchangers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await res.json();
      console.log(response);
      console.log(res.status);
      setExchangers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExhangers();
  }, []);

  return (
    <div className={classes.body}>
      <div className={classes.inner_flex}>
        <p className={classes.exchangers_title}>Exchangers</p>
        <p className={classes.exchangers_title_email}>Email address</p>
        <p className={classes.exchangers_title_image}>Avatar</p>
        <p className={classes.exchangers_title_state}>State</p>
      </div>

      {exchangers &&
        exchangers.map((person) => (
          <div className={classes.exchangers_box} key={person.id}>
            <div className={classes.exchanger_flex}>
              <p className={classes.exchanger_id}>{person.id}</p>
              <p className={classes.exchanger_email}>{person.email}</p>
              <img src={person.avatar} className={classes.exchanger_image} />
              {person.state === true ? (
                <>
                  <button className={classes.active_button}>Active</button>
                </>
              ) : (
                <>
                  <button className={classes.inactive_button}>Inactive</button>
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Exchangers;
