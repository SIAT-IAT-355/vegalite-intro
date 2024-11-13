// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
  // Load data
  const data = await d3.csv("../datasets/videogames_wide.csv");
  console.log(data);
  // Define the selection with point selection and bind it to a click event
  // Create the bar chart specification

  const vlSpectWithText = {
    data: { values: data },
    width: "container",
    height: 400,
    encoding: {
      y: { field: "Platform", type: "nominal", sort: "-x" },
      x: { field: "Global_Sales", type: "quantitative", aggregate: "mean" },
    },
    layer: [
      {
        // Bar layer
        mark: "bar",
        params: [
          {
            name: "brush",
            select: { type: "interval", encodings: ["y"] },
          },
        ],
        encoding: {
          opacity: {
            condition: {
              param: "brush",
              value: 1,
              empty: false,
            },
            value: 0.5, // Default color when no bar is selected
          },
        },
      },
      {
        transform: [{ filter: { param: "brush" } }],
        mark: "rule",
        encoding: {
          y: { field: "Global_Sales", type: "quantitative", aggregate: "mean" },
          color: {
            condition: {
              param: "brush",
              value: "grey",
            },
            value: "red",
          },
          size: { value: 2 },
        },
      },
    ],
  };

  // Render the chart using Vega-Embed
  const view = await vegaEmbed("#view", vlSpectWithText).view;
}

render();
