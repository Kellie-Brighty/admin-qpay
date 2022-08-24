import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  login_body: {
    marginTop: 74,
    display: "flex",
    justifyContent: "center",
    marginBottom: 65,
    [theme.breakpoints.down("xs")]: {
      marginTop: 65,
    },
  },
  inner_flex: {
    display: "flex",
    justifyContent: "center",
  },
  login_box: {
    padding: "63px 35px",
    background: "#090909",
    border: "2px solid #1A1A1A",
    [theme.breakpoints.down("xs")]: {
      padding: "34px 25px",
      border: "none",
    },
  },
  title: {
    fontFamily: "Work Sans",
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      fontWeight: "600",
      textAlign: "center",
    },
  },
  email_box: {
    marginTop: 64,
    width: 520,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      width: 272,
    },
  },
  password_box: {
    marginTop: 24,
    width: 520,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      width: 272,
      marginTop: 12,
    },
  },
  input_label: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.palette.secondary.main,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
      fontWeight: "400",
    },
  },
  input: {
    background: "#1A1A1A",
    borderRadius: 25,
    outline: "none",
    border: "none",
    height: 94,
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    padding: "0px 30px",
    marginTop: 12,
    margin: "auto",
    width: "88%",
    [theme.breakpoints.down("xs")]: {
      height: 55,
      borderRadius: 15,
      fontSize: 13,
      fontWeight: "400",
      width: "78%",
    },
  },
  password_input: {
    width: "88%",
    background: "#1A1A1A",
    borderRadius: 25,
    outline: "none",
    border: "none",
    height: 94,
    padding: "0px 30px",
    marginTop: 12,
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      height: 55,
      borderRadius: 15,
      width: "78%",
    },
  },
  input_password: {
    height: "100%",
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: 13,
      fontWeight: "400",
    },
  },
  password_icon: {
    color: theme.palette.primary.white,
    fontSize: 30,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: 18,
      fontWeight: "400",
      background: "transparent",
    },
  },
  login_button: {
    marginTop: 48,
    background: "transparent",
    height: 94,
    // width: "88%",
    [theme.breakpoints.down("xs")]: {
      height: 55,
      marginTop: 24,
      //   width: 272,
    },
  },
  btn: {
    background: "#73F49D",
    borderRadius: 25,
    width: "100%",
    height: "100%",
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    outline: "none",
    border: "none",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      width: 272,
      borderRadius: 15,
    },
  },
  error: {
    color: "#fff",
    textAlign: 'center',
    marginTop: 20
  }
}));

const Login = () => {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const route = (route) => {
    navigate(`/${route}`);
  };

  const login = async () => {
    setLoading(true);

    if (email === "" || password === "") {
      setErrors("Please don't lean any field empty.");
      setLoading(false)
    } else {
      try {
        const login_data = {
          email,
          password,
        };
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(login_data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response = await res.json();
        console.log(response);
        setLoading(false)
      } catch (err) {
        console.log(err);
        if(err) {
          setErrors("There was an issue authenticating user. Please try again later.")
        }
        setLoading(false)
      }
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL);
  }, []);

  return (
    <div>
      <Header />
      <div className={classes.login_body}>
        <div className={classes.inner_flex}>
          <div className={classes.login_box}>
            <p className={classes.title}>Admin Account</p>
            <div className={classes.email_box}>
              <p className={classes.input_label}>Email address</p>
              <input
                type="email"
                className={classes.input}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(null)
                }}
              />
            </div>
            <div className={classes.password_box}>
              <p className={classes.input_label}>Password</p>
              <div className={classes.password_input}>
                <input
                  type={visible ? "text" : "password"}
                  className={classes.input_password}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(null)
                  }}
                />
                {visible ? (
                  <MdVisibility
                    className={classes.password_icon}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <MdVisibilityOff
                    className={classes.password_icon}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            {errors && (
              <p className={classes.error}>{errors}</p>
            )}

            <div className={classes.login_button}>
              <button
                className={classes.btn}
                onClick={() => login()}
              >
                {loading ? "Login in..." : "Log in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
