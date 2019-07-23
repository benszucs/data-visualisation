/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.4 - Adding SVGs with D3
*/

// manually add circle svg
var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

var circle = svg.append("circle")
	.attr("cx", 100)
	.attr("cy", 250)
	.attr("r", 70)
	.attr("fill", "grey");

// manually add rectagle
var svg = d3.select('#chart-area').append('svg')
	.attr('width', 1000)
	.attr('height', 1000);

var rect = svg.append('rect')
	.attr('x', 5)
	.attr('y', 5)
	.attr('width', 500)
	.attr('height', 500)
	.attr('fill', 'red')
	.attr('stroke', 'black');