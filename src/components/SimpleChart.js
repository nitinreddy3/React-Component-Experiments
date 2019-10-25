import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import chartJson from '../data/simpleChart.json';

const useStyles = makeStyles(theme => ({
    line: {
        fill: 'none',
        stroke: 'steelblue',
        strokeWidth: 2,
    }
}));

const SimpleChart = props => {
    const classes = useStyles();

    useEffect(() => {
        drawChart()
    }, []);

    const [chartData, setChartData] = useState(chartJson);

    const yAccessor = d => d.maxTemp

    const dateParser = d3.timeParse("%d-%b-%y")
    const xAccessor = d => dateParser(d.date)

    const margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 60
    };
    const width = (window.innerWidth * 0.9) - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    const parsedTime = d3.timeParse("%d-%b-%y");

    const x = d3.scaleTime()
        .range([0, width]);
    const y = d3.scaleLinear()
        .range([height, 0]);

    const valueLine = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.maxTemp))

    const svg = d3.select('body')
        .append('svg')
        .attr('width', window.innerWidth * 0.9)
        .attr('height', window.innerHeight)
        .style('margin-left', 200)
        .append('g')
        .attr('transform', `translate(${
            margin.left
            }, ${
            margin.top
            })`)


    const drawChart = () => {
        getData();
    }

    const getData = async () => {
        chartData.forEach(d => {
            d.date = parsedTime(d.date)
        })

        x.domain(d3.extent(chartData, d => d.date))
        y.domain([0, d3.max(chartData, d => d.maxTemp)])

        svg.append('path')
            .data([chartData])
            .attr('class', classes.line)
            .attr('d', valueLine)

        svg.append('g')
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))

        svg.append('g')
            .call(d3.axisLeft(y))
    }

    return (
        <Grid>
            <div id="simpleChart"></div>
        </Grid>
    )
}

export default SimpleChart;