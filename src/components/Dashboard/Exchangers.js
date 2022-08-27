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
  loading_text: {
    color: "#fff",
    // textAlign: "center",
    fontSize: 25,
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12
    }
  },
}));

const Exchangers = () => {
  const classes = useStyles();
  const [exchangers, setExchangers] = useState();
  const [loading, setLoading] = useState(false);

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
      console.log(res.status);
      const sortedArray = response.data.sort((a, b) => a.id - b.id);
      setExchangers(sortedArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExhangers();
  }, []);

  const activateExchanger = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("qpay_session_token");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/exchanger/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await res.json();
      console.log(res.status);
      console.log(response);
      if (res.status === 200) {
        fetchExhangers();
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.inner_flex}>
        <p className={classes.exchangers_title}>Exchangers</p>
        <p className={classes.exchangers_title_email}>Email address</p>
        <p className={classes.exchangers_title_image}>Avatar</p>
        <p className={classes.exchangers_title_state}>State</p>
      </div>

      {loading ? (
        <p className={classes.loading_text}>Please wait...</p>
      ) : (
        <>
          {exchangers &&
            exchangers.map((person) => (
              <div className={classes.exchangers_box} key={person.id}>
                <div className={classes.exchanger_flex}>
                  <p className={classes.exchanger_id}>{person.id}</p>
                  <p className={classes.exchanger_email}>{person.email}</p>
                  <img
                    src={person.avatar}
                    className={classes.exchanger_image}
                  />
                  {person.state === true ? (
                    <>
                      <button className={classes.active_button}>Active</button>
                    </>
                  ) : (
                    <>
                      <button
                        className={classes.inactive_button}
                        onClick={() => activateExchanger(person.id)}
                      >
                        Inactive
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Exchangers;
