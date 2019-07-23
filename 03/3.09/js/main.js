/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    3.9 - Margins and groups
 */

var margin = { left:100, right:10, top:10, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left
            + ", " + margin.top + ")")

d3.json("data/buildings.json").then(function(data){
    // console.log(data);

    data.forEach(function(d) {
        d.height = +d.height;
    });

    var x = d3.scaleBand()
        .domain(data.map(function(d){
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.height;
        })])
        .range([0, height]);

    var rects = g.selectAll("rect")
        .data(data)

    rects.enter()
        .append("rect")
            .attr("y", 0)
            .attr("x", function(d){ return x(d.name); })
            .attr("width", x.bandwidth)
            .attr("height", function(d){ return y(d.height); })
            .attr("fill", "grey");

})

// var margin = { top: 10, right: 10, bottom: 100, left: 100 };
// var width = 600 - margin.left - margin.right;
// var height = 400 - margin.top - margin.bottom;

// var svg = d3
//   .select("#chart-area")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)

// var g = svg
//     .append('g')
//     .attr('transform', "translate(" + margin.left + ", " + margin.top + ")")

// d3.json("data/buildings.json").then(data => {
//   data.forEach(d => {
//     d.height = parseFloat(d.height);
//   });

//   var x = d3
//     .scaleBand()
//     .domain(
//       data.map(d => {
//         return d.name;
//       })
//     )
//     .range([0, 400])
//     .paddingInner(0.3)
//     .paddingOuter(0.3);

//   var y = d3
//     .scaleLinear()
//     .domain([
//       0,
//       d3.max(data, d => {
//         return d.height;
//       })
//     ])
//     .range([0, 400]);

//   var rects = g
//     .selectAll("rect")
//     .data(data)
//     .enter()
//     .append("rect")
//     .attr("y", 20)
//     .attr("x", d => {
//       return x(d.name);
//     })
//     .attr("width", x.bandwidth)
//     .attr("height", d => {
//       return y(d.height);
//     })
//     .attr("fill", d => {
//       return "grey";
//     });
// });
