import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import * as d3 from 'd3';
import { graphData } from '../data/profile.js'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    line: {
        fill: 'none',
        stroke: 'steelblue',
        strokeWidth: 2,
    },
    circle: {
        stroke: '#fff',
        strokeWidth: 1.5,
    }
}));

const Network = props => {

    const classes = useStyles();
    const [graph, setGraph] = useState(graphData)

    useEffect(() => {
        drawGraph()
    }, [])

    const drawGraph = () => {

        const svg = d3.select('body')
            .attr('width', 960)
            .attr('height', 500)

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const dragstarted = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        const dragended = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        const simulation = d3.forceSimulation()
            .force('link', d3.forceLink().id(d => d.id))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2))

        const link = svg.append("g")
            .attr("class", classes.links)
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append('g')
            .attr('class', classes.nodes)
            .selectAll('g')
            .data(graph.nodes)
            .enter().append('g')

        const circles = node.append("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group))
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const lables = node.append("text")
            .text(d => d.id)
            .attr('x', 6)
            .attr('y', 3);

        node.append("title")
            .text(d => d.id);

        simulation
            .nodes(graph.nodes)
            .on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
            });

        simulation.force("link")
            .links(graph.links);
    }



    return (
        <Grid>
            <div id="network"></div>
        </Grid>
    )
}

export default Network;