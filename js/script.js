window.onload = function () {
    //generate the graph
// set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 80, left: 60},
        width = 560 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // var xtick_labels = [2000, 3000, 4000, 5000];
    // var ytick_labels = [10, " ", 20, " ", 30, " ", 40];


//load the data
    d3.csv("../cars-sample-improved.csv")
        .then(function (d) {
                let data = d.sort((a, b) => d3.ascending(a.Weight, b.Weight));
                let names_list = ['manufacturer_bmw', 'manufacturer_ford', 'manufacturer_honda', 'manufacturer_mercedes', 'manufacturer_toyota'];
                let colors_json = {
                    'manufacturer_bmw': '#FF0C00',
                    'manufacturer_ford': '#ACAF23',
                    'manufacturer_honda': '#0F9D58',
                    'manufacturer_mercedes': '#00A7FF',
                    'manufacturer_toyota': '#EB00FF'
                };
                console.log(data);

// append the svg object to the body of the page
                var svg = d3.select("#chart")
                    .append("svg")
                    .attr("class", "plt_background")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

                // Add X axis
                var x = d3.scaleLinear()
                    .domain([1500, 5100])
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", "translate(" + 0 + "," + 0 + ")")
                    .call(d3.axisBottom(x))
                    .attr("class", "axis")
                    .transition()
                    .delay(400)
                    .duration(500)
                    .attr("transform", "translate(0," + height + ")")


                // Add Y axis
                var y = d3.scaleLinear()
                    .domain([8, 47])
                    .range([height, 0]);
                svg.append("g")
                    .attr("transform", "translate(0," + -height + ")")
                    .call(d3.axisLeft(y))
                    .attr("class", "axis")
                    .transition()
                    .duration(500)
                    .attr("transform", "translate(0," + 0 + ")")


                //Add gridlines
                // add the X gridlines
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x)
                        .ticks(3)
                        .tickSize(-height)
                        .tickFormat("")
                    ).attr("class", "grid")
                    .style("stroke", '#949595')
                    .style("font-family", "Microsoft Tai Le, serif")
                    .style("stroke-opacity", 0)
                    .transition()
                    .delay(700)
                    .duration(1000)
                    .style("stroke-opacity", 0.3)

                // add the Y gridlines
                svg.append("g")
                    .call(d3.axisLeft(y)
                        .ticks(5)
                        .tickSize(-width)
                        .tickFormat("")
                    ).attr("class", "grid")
                    .style("stroke", '#949595')
                    .style("font-family", "Microsoft Tai Le, serif")
                    .style("stroke-opacity", 0.3);

                // text label for the x axis
                svg.append("text")
                    .attr("transform",
                        "translate(" + (width / 2) + " ," +
                        (height + margin.top + 30) + ")")
                    .style("text-anchor", "middle")
                    .style("font-family", "Microsoft Tai Le, serif")
                    .text("Weight");

                // text label for the y axis
                svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .style("font-family", "Microsoft Tai Le, serif")
                    .text("MPG");

                var tooltip = d3.select("#chart").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                // tooltip mouseover event handler
                function tipMouseover(clientX, clientY, d) {
                    var html = "<span > Manufacturer: " + manu(d) + "</span><br/>" +
                        "<b>" + d.Weight + "</b> KG, <b/>" + d.MPG + "</b> MPG";

                    tooltip.html(html)
                        .style('font-family','serif')
                        .style("left", (clientX + 15) + "px")
                        .style("top", (clientY - 28) + "px")
                        .transition()
                        .duration(200) // ms
                        .style("opacity", .9)

                };

                // tooltip mouseout event handler
                function tipMouseout(d) {
                    tooltip.transition()
                        .duration(300) // ms
                        .style("opacity", 0); // don't care about position!
                };

                // Add dots
                svg.append('g')
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) {
                        return x(d.Weight)
                    })
                    .attr("cy", function (d) {
                        return y(d.MPG)
                    })
                    .attr("r", function (d) {
                        return d.Weight / 650
                    })
                    .style("fill", '#000')
                    .style("fill-opacity", 0.5)
                    .transition()
                    .delay(600)
                    .duration((d, i) => 250 + 50 * i)
                    .style("fill", function (d) {
                        for (let key of Object.keys(d)) {
                            if (d[key] === "1" || d[key] === 1) {
                                console.log(colors_json[key])
                                return colors_json[key]
                            }
                        }
                    })

                d3.selectAll('circle')
                    .on("mouseover", (d) => tipMouseover(d.clientX, d.clientY, d))
                    .on("mouseout", tipMouseout(data));

            }
        );

    function manu(d) {
        for (let key of Object.keys(d)) {
            if (d[key] === "1" || d[key] === 1) {
                return key.replace('manufacturer_', "")
            }
        }
    };
};


// let bmw = data.filter(function (row) {return row['Manufacturer'] == 'bmw';})
// let toyota = data.filter(function (row) {return row['Manufacturer'] == 'toyota';})
// let mercedes = data.filter(function (row) {return row['Manufacturer'] == 'mercedes';})
// let ford = data.filter(function (row) {return row['Manufacturer'] == 'ford';})
// let honda = data.filter(function (row) {return row['Manufacturer'] == 'honda';})
//
//
// let arr_bmw = [];
// let arr_toyota = [];
// let arr_mercedes = [];
// let arr_ford = [];
// let arr_honda = [];
// let labels = [];
//
// for (let i = 0; i < data.length; i++) {
//     labels.push(data[i].Weight)
// }
// for (let i = 0; i < bmw.length; i++) {
//     arr_bmw.push(bmw[i].MPG)
// }
// for (let i = 0; i < toyota.length; i++) {
//     arr_toyota.push(toyota[i].MPG)
// }
// for (let i = 0; i < mercedes.length; i++) {
//     arr_mercedes.push(mercedes[i].MPG)
// }
// for (let i = 0; i < ford.length; i++) {
//     arr_ford.push(ford[i].MPG)
// }
//  for (let i = 0; i < honda.length; i++) {
//     arr_honda.push(honda[i].MPG)
// }
// console.log(arr_bmw);
// console.log(labels);


// const data = {
//     labels: [2000,2500,3000,2500,4000,4500
//     ],
//     datasets: [
//         {
//             name: "BMW", chartType: "line",
//             values: arr_bmw
//         },
//         {
//             name: "Another Set", chartType: "line",
//             values: [25, 50, -10, 15, 18, 32, 27, 14]
//         }
//     ]
// }





