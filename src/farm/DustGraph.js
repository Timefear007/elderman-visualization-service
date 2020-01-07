import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress } from "@material-ui/core";
import Plot from "react-plotly.js";

import extractData from "./data";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: 50
    }
}));

const DustGraph = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const getData = () => {
        setIsLoading(true);
        fetch("https://tgr2020-quiz2.firebaseio.com/quiz/sensor/team32.json")
            .then(res => res.json())
            .then(res => {
                extractData(res, function(xData, yData, avgPerDay) {
                    let temp = { x: xData, y: yData };
                    setData(temp);
                    setIsLoading(false);
                    console.log(avgPerDay);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            {data ? (
                <Plot
                    data={[
                        {
                            x: data.x,
                            y: data.y,
                            type: "scatter",
                            mode: "lines+markers",
                            marker: { color: "red" }
                        }
                    ]}
                    layout={{
                        width: 1000,
                        height: 500,
                        title: "PM2.5 data analyzing",
                        xaxis: {
                            title: "Date",
                            showgrid: false,
                            tickangle:90
                        },  
                        yaxis: {
                            title: "PM 2.5 concentration",
                            showline: true
                        }
                    }}
                />
            ) : (
                <div className={classes.root}>
                    <LinearProgress />
                    <LinearProgress />
                    <LinearProgress />
                    <LinearProgress />
                </div>
            )}
        </Container>
    );
};

export default DustGraph;
