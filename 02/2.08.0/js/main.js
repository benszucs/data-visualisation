/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.8 - Activity: Your first visualization!
 */

d3.json("data/buildings.json").then(data => {
    data.forEach((d) => {
        d.height = parseFloat(d.height)
    })
    
    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var rects = svg.selectAll('rect')
        .data(data)

    rects.enter().append('rect')
        .attr('x', (d, i) => {
            return (i * 50) + 10
        })
        .attr('y', 0)
        .attr('width', 30)
        .attr('height', (d) => {
            return d.height
        })
        .attr('fill', 'red')
});
