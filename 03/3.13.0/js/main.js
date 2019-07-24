/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { top: 10, right: 10, bottom: 100, left: 100 };

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top +')')
    
d3.json('data/revenues.json').then((data) => {
    data.forEach((d) => {
        d.revenue = parseFloat(d.revenue)
        d.profit = parseFloat(d.profit)
    })
    console.log(data)

    // X band scale
    var x = d3.scaleBand()
        .domain(data.map((d) => { return d.month }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.2);

    // Y linear scale
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => { return d.revenue })])
        .range([height, 0])

    // X axis
    var xAxisCall = d3.axisBottom(x);
    g.append('g')
        .attr('class', 'bottom axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxisCall);

    // Y axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat((d) => {
            return '$' + d
        });
    g.append('g')
        .attr('class', 'left axis')
        .call(yAxisCall);

    // X axis label
    g.append('text')
        .attr('class', 'x axis-label')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .text('Month');

    // Y axis label
    g.append('text')
        .attr('class', 'y axis-label')
        .attr('x', - (height / 2))
        .attr('y', - 70)
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text('Revenue');

    var rects = g.selectAll('rect').data(data)
        .enter()
        .append('rect')
        .attr('x', (d) => { return x(d.month) })
        .attr('y', (d) => { return y(d.revenue) })
        .attr('width', x.bandwidth)
        .attr('height', (d) => { return height - y(d.revenue) })
        .attr('fill', 'grey')
})