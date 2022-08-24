import React from "react";
import { makeStyles } from "@material-ui/styles";
import Header from "../components/Header";
import CurrencyRate from "../components/Dashboard/CurrencyRate";
import Exchangers from "../components/Dashboard/Exchangers";

const useStyles = makeStyles((theme) => ({
 
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <CurrencyRate />
      <Exchangers />
    </div>
  );
};

export default Dashboard;
