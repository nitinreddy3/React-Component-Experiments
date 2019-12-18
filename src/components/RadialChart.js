import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import * as d3 from 'd3';
import data from '../data/radialChart.json';
import "./mapStyle.css";

const RadialChart = props => {
    const collapse = d => {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(this.collapse);
            d.children = null;
        }
    };
    useEffect(() => {
        let zoom = d3.zoom().on("zoom", () => {
            g.attr("transform", d3.event.transform);
        });

        let svg = d3.select("#map").call(zoom);
        let width = +svg.attr("width");
        let height = +svg.attr("height");

        let transform = d3.zoomIdentity.translate(width / 2, height / 2 + 20);

        let g = svg.append("g").attr("transform", transform);

        let cluster = d3.cluster().size([360, width / 2 - 120]);

        let self = this;

        let root = d3.hierarchy(data);

        cluster(root);

        // let link = ...
        g
            .selectAll(".link")
            .data(root.descendants().slice(1))
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d => {
                return (
                    "M" +
                    project(d.x, d.y) +
                    "C" +
                    project(d.x, (d.y + d.parent.y) / 2) +
                    " " +
                    project(d.parent.x, (d.y + d.parent.y) / 2) +
                    " " +
                    project(d.parent.x, d.parent.y)
                );
            });

        let node = g
            .selectAll(".node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("class", d => {
                return "node" + (d.children ? " node--internal" : " node--leaf");
            })
            .attr("transform", d => {
                return "translate(" + project(d.x, d.y) + ")";
            });

        node.append("circle").attr("r", 2.5);

        node
            .append("text")
            .attr("dy", "0.31em")
            .attr("x", d => {
                return d.x < 180 === !d.children ? 6 : -6;
            })
            .style("text-anchor", d => {
                return d.x < 180 === !d.children ? "start" : "end";
            })
            .attr("transform", d => {
                return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
            })
            .text(d => d.data.name);
        svg.call(zoom.transform, transform);


        function project(x, y) {
            let angle = (x - 90) / 180 * Math.PI,
                radius = y;
            return [radius * Math.cos(angle), radius * Math.sin(angle)];
        }
    });


    return (
        <div className="Map">
            <svg width="1120" height="1120" id="map" />
        </div>
    )
}

export default RadialChart;