import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  currency_rate: {
    marginTop: 48,
    padding: "0px 120px",
    margin: "auto",
    maxWidth: 1200,
    [theme.breakpoints.down("xs")]: {
      padding: "0px 25px",
    },
  },
  inner_flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  rate_text: {
    fontWeight: "600",
    fontSize: 34,
    color: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  input_div: {
    display: "flex",
    alignItems: "center",
    background: "#1A1A1A",
    borderRadius: 8,
    padding: "24.22px 50px",
    width: 283,
    [theme.breakpoints.down("xs")]: {
      width: 187,
      padding: "20px",
      marginTop: 6,
    },
  },
  naira: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.palette.secondary.main,
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
  input: {
    background: "transparent",
    outline: "none",
    border: "none",
    fontSize: 34,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 12,
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },
  },
  btn_box: {
    background: "transparent",
    [theme.breakpoints.down("xs")]: {
      marginTop: 12,
    },
  },
  btn: {
    padding: "22px 100px",
    background: "#73F49D",
    borderRadius: 8,
    border: "none",
    outline: "none",
    fontSize: 20,
    fontWeight: 600,
    color: "#000",
    cursor: "pointer",
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
      padding: "20px 88px",
    },
  },
  error_text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
}));

const CurrencyRate = () => {
  const classes = useStyles();
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const currency = "USD";

  const updateRate = async () => {
    setLoading(true);
    setErrors(null);

    if (rate === "") {
      setErrors("Please input a valid rate.");
      setLoading(false);
    } else {
      const rate_data = {
        rate: rate,
        currency: currency,
      };
      try {
        const token = localStorage.getItem("qpay_session_token");
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/auth/rate`,
          {
            method: "POST",
            body: JSON.stringify(rate_data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response = await res.json();
        if (res.status === 200) {
          setLoading(false);
          setErrors(response.message);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

  const getCurrentRate = async () => {
    const token = localStorage.getItem("qpay_session_token");
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/auth/rate?currency=USD`,
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
    setRate(response.data.rate)
    console.log(res.status);
  };

  useEffect(() => {
    getCurrentRate();
  }, []);

  return (
    <div>
      <div className={classes.currency_rate}>
        <div className={classes.inner_flex}>
          <div>
            <p className={classes.rate_text}>Current exchange rate</p>
          </div>
          <div>
            <div className={classes.input_div}>
              <p className={classes.naira}>₦</p>
              <input
                type="number"
                className={classes.input}
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  setErrors(null);
                }}
              />
            </div>
            {errors && <p className={classes.error_text}>{errors}</p>}
          </div>
          <div className={classes.btn_box}>
            <button className={classes.btn} onClick={() => updateRate()}>
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyRate;
