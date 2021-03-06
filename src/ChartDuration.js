import React from "react";
import Line from "recharts/lib/cartesian/Line";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";

import { withStyles } from "@material-ui/core/styles";

import { Typography, Paper } from "@material-ui/core";

import SimpleLineChart from "./SimpleLineChart";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const dateFormat = str => format(new Date(str), "MMM YY", { locale: frLocale });

const dateSort = (a, b) => {
  if (a.month < b.month) return -1;
  if (a.month > b.month) return 1;
  return 0;
};

const getChartData = data => {
  if (data) {
    const rows = Object.keys(data.monthly).reduce(
      (months, month) => [
        ...months,
        {
          name: dateFormat(month),
          month,
          total: parseInt(data.monthly[month].duration * 100) / 100
        }
      ],
      []
    );
    rows.sort(dateSort);
    return rows;
  }
  return [];
};

const ChartDuration = ({ classes, data }) => (
  <Paper className={classes.root} elevation={1}>
    <Typography variant="subtitle1" component="h3">
      Temps de traitement par mois
    </Typography>
    <br />
    <br />
    <SimpleLineChart data={getChartData(data)}>
      <Line
        name="Temps de traitement moyen en jours"
        type="linear"
        dataKey="total"
        stroke="#0053b3"
      />
    </SimpleLineChart>
  </Paper>
);

export default withStyles(styles)(ChartDuration);
