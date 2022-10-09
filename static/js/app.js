// Data URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Read in JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log(data);
// });

// Initial page
function init() {
    d3.json(url).then(function(data) {
        x = []
        y = []
        ht = []
        for (let i = 0; i < 10; i++) {
            x.push(data.samples[0].sample_values[i]);
            y.push(`OTU ${data.samples[0].otu_ids[i]}`);
            ht.push(data.samples[0].otu_labels[i]);
        };
        let traceData = [{
            x: x.reverse(),
            y: y.reverse(),
            hovertext: ht.reverse(),
            type: "bar",
            orientation: "h"
        }];
                // let layout = {
        //     }
        // };
        Plotly.newPlot("bar", traceData);
    });
};

d3.json(url).then(function(data) {
    for (let i = 0; i < data.names.length; i++) {
        d3.select("#selDataset").append("option").text(data.names[i])
    };
});

function optionChanged(id) {
    console.log("id: ",id);
    console.log("value: ",d3.select("#selDataset").property("value"));
};






init();


// // Update plotly
// function updatePlotly() {
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   let dataset = dropdownMenu.property("value");

//   Plotly.restyle("plot", "x", [x]);
//   Plotly.restyle("bar", "y", [y]);
// }


// console.log(data.names[0]);
// console.log(data.metadata[0].id)
// console.log(data.samples[0].otu_ids[0]);
// console.log(data.samples[0].otu_ids[1]);
// console.log(data.samples[0].otu_ids[2]);
