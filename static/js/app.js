// Data URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Read in JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Initial page function
function init() {
    info(0);
    barGraph(0);
    bubbleChart(0);
    // Populate dropdown options from data
    d3.json(url).then(function(data) {
        for (let i = 0; i < data.names.length; i++) {
            d3.select("#selDataset").append("option").text(data.names[i])
        };
    });
};

// Generate new graphs on change of dropdown option
function optionChanged(id) {
    d3.json(url).then(function(data) {
        let index = data.names.indexOf(id)
        info(index)
        barGraph(index)
        bubbleChart(index)
    });
};

// Demographic info function
function info(index) {
    d3.json(url).then(function(data) {
        d3.select("#id").text(`id : ${data.metadata[index].id}`);
        d3.select("#ethnicity").text(`ethnicity : ${data.metadata[index].ethnicity}`);
        d3.select("#gender").text(`gender : ${data.metadata[index].gender}`);
        d3.select("#age").text(`age : ${data.metadata[index].age}`);
        d3.select("#location").text(`location : ${data.metadata[index].location}`);
        d3.select("#bbtype").text(`bbtype : ${data.metadata[index].bbtype}`);
        d3.select("#wfreq").text(`wfreq : ${data.metadata[index].wfreq}`);
    });
};

// Bar Graph function
function barGraph(index) {
    d3.json(url).then(function(data) {
        x = []
        y = []
        ht = []
        for (let i = 0; i < 10; i++) {
            x.push(data.samples[index].sample_values[i]);
            y.push(`OTU ${data.samples[index].otu_ids[i]}`);
            ht.push(data.samples[index].otu_labels[i]);
        };
        let traceData = [{
            x: x.reverse(),
            y: y.reverse(),
            hovertext: ht.reverse(),
            type: "bar",
            orientation: "h"
        }];
        let layout = {
            margin: {
                l:100,
                r: 100
            }                
        };
        Plotly.newPlot("bar", traceData, layout);
    });
};

// Bubble Chart function
function bubbleChart(index) {
    d3.json(url).then(function(data) {
        x = []
        y = []
        ht = []
        for (let i = 0; i < data.names.length; i++) {
            x.push(data.samples[index].otu_ids[i]);
            y.push(data.samples[index].sample_values[i]);
            ht.push(data.samples[index].otu_labels[i]);
        };
        let traceData = [{
            x: x,
            y: y,
            hovertext: ht,
            mode: "markers",
            marker: {
                size: y,
                color: x,
                sizeref: 1.5
            }
        }];
        let layout = {
            height: 500,
            xaxis: {
                title: "OTU ID"
            }    
        }
        Plotly.newPlot("bubble", traceData, layout);
    });
};

init();
