// https://observablehq.com/@d3/multi-line-chart@263
//This functions returns the main object, which is a runtime.module

export default function define(runtime, observer) {
  const main = runtime.module();

  //Defining the Headline of the chart
  main.variable(observer()).define(["md"], function(md){return(
md`# Multi-Line Chart

Data: [Bureau of Labor Statistics](https://www.bls.gov/)`
)});
  //defining object "chart" which returns an svg node.
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height","xAxis","yAxis","data","line","hover"], function(d3,DOM,width,height,xAxis,yAxis,data,line,hover)
{
  const svg = d3.select(DOM.svg(width, height));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
    .selectAll("path")
    .data(data.series)
    .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values));

  svg.call(hover, path);

  return svg.node();
}
);
  //defines the function that acts when we hover over points in the chart
  main.variable(observer("hover")).define("hover", ["d3","y","x","data"], function(d3,y,x,data){return(
function hover(svg, path) {
  svg
      .style("position", "relative");
  
  if ("ontouchstart" in document) svg
      .style("-webkit-tap-highlight-color", "transparent")
      .on("touchmove", moved)
      .on("touchstart", entered)
      .on("touchend", left)
  else svg
      .on("mousemove", moved)
      .on("mouseenter", entered)
      .on("mouseleave", left);

  const dot = svg.append("g")
      .attr("display", "none");

  dot.append("circle")
      .attr("r", 2.5);

  dot.append("text")
      .style("font", "10px sans-serif")
      .attr("text-anchor", "middle")
      .attr("y", -8);

  function moved() {
    d3.event.preventDefault();
    const ym = y.invert(d3.event.layerY);
    const xm = x.invert(d3.event.layerX);
    const i1 = d3.bisectLeft(data.dates, xm, 1);
    const i0 = i1 - 1;
    const i = xm - data.dates[i0] > data.dates[i1] - xm ? i1 : i0;
    const s = data.series.reduce((a, b) => Math.abs(a.values[i] - ym) < Math.abs(b.values[i] - ym) ? a : b);
    path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
    dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
    dot.select("text").text(s.name);
  }

  function entered() {
    path.style("mix-blend-mode", null).attr("stroke", "#ddd");
    dot.attr("display", null);
  }

  function left() {
    path.style("mix-blend-mode", "multiply").attr("stroke", null);
    dot.attr("display", "none");
  }
}
)});

 //defines the height variable for the entire svg chart 
  main.variable(observer("height")).define("height", function(){return(
500
)});
  //defines the margins for the entire svg chart
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 20, bottom: 30, left: 30}
)});

  //defines the x axis, i.e. what is shown of the x axis, what is the domain of the data etc...
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleTime()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])
)});
  //defines the y axis, i.e. what is shown on the y axis, what is the domain of the data, what is the range/dimension of the axis in terms of px
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])
)});

  //definition xAxis
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width"], function(height,margin,d3,x,width){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
)});

  //definition of yAxis
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))
)});
  //definition of the lines data in the plot
  main.variable(observer("line")).define("line", ["d3","x","data","y"], function(d3,x,data,y){return(
d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))
)});
//definition on how to read in the data
  main.variable(observer("data")).define("data", ["d3"], async function(d3)
{
  const data = await d3.tsv("./multilineplot/unemployment.tsv", (d, i, columns) => {
    return {
      name: d.name.replace(/, ([\w-]+).*/, " $1"),
      values: columns.slice(1).map(k => +d[k])
    };
  });
  return {
    y: "% Unemployment rate", //y-axis label
    series: data,
    dates: data.columns.slice(1).map(d3.timeParse("%Y-%m"))
  };
}
);
  //Defining of the D3 object
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});

  return main;
}
