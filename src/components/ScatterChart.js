import React, { useState, useEffect } from 'react'
import * as d3 from 'd3';

const ScatterChart = props => {
    const dataset = [
        [34, 78],
        [109, 280],
        [310, 120],
        [79, 411],
        [420, 220],
        [233, 145],
        [333, 96],
        [222, 333],
        [78, 320],
        [21, 123]
    ];

    useEffect(() => {
        drawChart()
    }, [])

    const drawChart = () => {
        const width = 500;
        const height = 500;
        const padding = 60;

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d[0])])
            .range([padding, width - padding])
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, d => d[1])])
            .range([height - padding, padding])

        const svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('margin', 100)

        svg.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .attr('r', 10)

        svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .text(d => `${d[0]}, ${d[1]}`)
            .attr('x', d => xScale(d[0] + 15))
            .attr('y', d => yScale(d[1]))
        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        svg.append('g')
            .attr('transform', `translate(0, ${height - padding})`)
            .call(xAxis)

        svg.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .call(yAxis)
    }

    return (
        <div id="scatterChart"></div>
    )
}

export default ScatterChart;