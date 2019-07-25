# udemy-d3
A collection of files for "Mastering data visualization in D3.js"

## Notes
### Basics
Select HTML element by id 
`d3.select(#id)`

Append element to something (i.e. selected ID, existing element stored in variable)
`.append('svg')`

Add CSS attribute to a D3 object
`.attr('width', 500)`

Load data from external file
```javascript
d3.json('path/data.json').then((data) => {
    console.log(data)
    //Code here
})
```

Adding SVG objects to canvas
```javascript
var circles = svg.selectAll('circle').data(data)

circles.enter()
    .append('circle')
        .attr(...)
```

### Scales
Linear Scales
```javascript
var y = d3.scaleLinear()
    .domain([0, 828])
    .range([0, 400]);

console.log(y(100)) // 48.3
console.log(y.invert(48.3)) // 100
```

Log Scales
```javascript
var x = d3.scaleLog()
    .domain([300, 15000])
    .range([0, 400])
    .base(10);

console.log(x(5000)) // 181.1
console.log(x.invert(181.1)) // 5000
```

Time Scales
```javascript
var x = d3.scaleTime()
    .domain([
        new Date(2000, 0, 1),
        new Date(2001, 0, 1)
    ])
    .range([0, 400]);

console.log(x( new Date(2000, 7, 1) ))  // 199
console.log(x(360))  // Sun Nov 25 2000
```

Ordinal Scales
```javascript
var color = d3.scaleOrdinal()
    .domain(["AFRICA", "EUROPE", "N.AMERICA"])
    .range(d3.schemeCategory10);

console.log("AFRICA")  // #1f77b4
```

Band Scales
```javascript
var x = d3.scaleBand()
    .domain(["AFRICA", "EUROPE", "N.AMERICA"])
    .range([0, 400])
    .paddingInner(0.3)
    .paddingOuter(0.2);

console.log(x("AFRICA"))  // 209

console.log(x.bandwidth())  // 45.9
```

D3 min, max, and extent
```javascript
var data = [
    { grade: 'A', value: 4 },
    { grade: 'B', value: 3 },
    { grade: 'C', value: 2 }
];

var min = d3.min(data, (d) => {
    return d.value
});
console.log(min)  // 2

var max = d3.max(data, (d) => {
    return d.value
});
console.log(max)  // 4

var val_extent = d3.extent(data, () => {
    return d.value
});
console.log(val_extent)

var grade_map = data.map((d) => {
    return d.grade
})
console.log(grade_map)  // ['A', 'B', 'C']
```

### Groups
Margins and groups
```javascript

var margin = { top: 10, right: 10, bottom: 100, left: 150 };

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
    .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top +')')

```

### Axis
Axis generators
```javascript
// LEFT AXIS
var leftAxis = d3.axisLeft(y);
g.append('g')
    .attr('class', 'left axis')
    .call(leftAxis);

// TOP AXIS
var topAxis = d3.axisTop(y);
g.append('g')
    .attr('class', 'top axis')
    .call(topAxis);

// BOTTOM AXIS
var bottomAxis = d3.axisBottom(x);
g.append('g')
    .attr('class', 'bottom axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(bottomAxis);

// RIGHT AXIS
var rightAxis = d3.axisRight(y);
g.append('g')
    .attr('class', 'right axis')
    .attr('transform', 'translate(' + width + ', 0)')
    .call(rightAxis);
```

Tick sizing & spacing
```javascript
// All ticks
d3.axisBottom(x)
    .tickSize('value');

// Outer ticks
d3.axisBottom(x)
    .tickSizeOuter('value');

// Inner Ticks
d3.axisBottom(x)
    .tickSizeInner('value')
    .tickSize('value');
```

Formatting the axis
```javascript
// X axis
var bottomAxis = d3.axisBottom(x);
g.append('g')
    .attr('class', 'bottom axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(bottomAxis)
    // Format axis text below
    .selectAll('text')
        .attr('y', '10')
        .attr('x', '-5')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-40)');

// Y axis
var leftAxis = d3.axisLeft(y)
    .ticks(3)
    .tickFormat((d) => {
        return d + 'm'
    });

g.append('g')
    .attr('class', 'left axis')
    .call(leftAxis);
```

Axis labels
```javascript
// X axis label
g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', width / 2)
    .attr('y', height + 140)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .text('Axis label text');

// Y axis label
g.append('text')
    .attr('class', 'y axis-label')
    // as we are rotating the y axis label
    // need to revers the x and y positions of the label
    .attr('x', - (height / 2))
    .attr('y', -60)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text('Axis label text');
```

### Making data dynamic
Using intervals for continous loop
```javascript
d3.interval(() => {
    // Code goes here
}, 500); // Runs every 500ms

// Create a new Loop
var myInterval = setInterval(() => {
    // Code goes here
}, 500);

// Stop the loop
clearInterval(myInterval);
```

Break out the parts that need updating into a seperate update() function.
What needs updating on a dynamic graph?
- Labels
- Axis
- Data elements (rects, circles, etc.)
(see 5.03 for full example)
```javascript
// Leave static elements outside the updated call 
// i.e. margin, width, height, svg, groups, scale, label format

// Move all dynamic elements to the update function 
// i.e. scale domain, axis call, data elements

d3.json("data/revenues.json").then(function(data){
    d3.interval(function(){
        update(data)
    }, 1000);

    // Run the vis for the first time so update is called on initial load
    update(data);
});

function update(data) {
    x.domain(data.map(function(d){ return d.month }))
    y.domain([0, d3.max(data, function(d) { return d.revenue })])

    // X Axis
    var xAxisCall = d3.axisBottom(x);
    xAxisGroup.call(xAxisCall);


    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return "$" + d; });
    yAxisGroup.call(yAxisCall);

    // Data elements here.....
}
```

The D3 update pattern
```javascript
// JOIN new data with old elements.
// Join new data with old elements, if any.
var rects = g.selectAll("rect")
    .data(data)

// EXIT old elements not present in new data.
// Remove old elements as needed.
rects.exit().remove()

// UPDATE ild elements present in new data.
// Update oldelements as needed.
rects
    .attr("y", function(d){ return y(d.revenue); })
    .attr("x", function(d){ return x(d.month) })
    .attr("height", function(d){ return height - y(d.revenue); })
    .attr("width", x.bandwidth)

// ENTER new elements present in new data.
// Create new elements as needed.        
rects.enter()
    .append("rect")
        .attr("y", function(d){ return y(d.revenue); })
        .attr("x", function(d){ return x(d.month) })
        .attr("height", function(d){ return height - y(d.revenue); })
        .attr("width", x.bandwidth)
        .attr("fill", "grey");
```

Merge Pattern
```javascript
// ...
// ENTER new elements present in new data...
rects.enter()
    .append("rect")
        .attr("fill", "grey")
        .attr("y", y(0))
        .attr("height", 0)
        .attr("x", function(d){ return x(d.month) })
        .attr("width", x.bandwidth)
        // AND UPDATE old elements present in new data.
        .merge(rects)
        .transition(t)
            .attr("x", function(d){ return x(d.month) })
            .attr("width", x.bandwidth)
            .attr("y", function(d){ return y(d[value]); })
            .attr("height", function(d){ return height - y(d[value]); });
```

D3 Transitions
```javascript
var t = d3.transition().duration(500);

rects.enter().append('rect')
    .attr('height', (d) => { return height - y(d.revenue) })
    .attr('x', (d) => { return x(d.month) })
    .attr('width', x.bandwidth)
    .attr('fill', 'grey')
    .attr('y', y(0))
    .attr('fill-opacity', 0)
    // anything after transition will be transitioned as per the above declaration
    .transition(t)
        .attr('y', (d) => { return y(d[value]) })
        .attr('fill-opacity', 1);
```

