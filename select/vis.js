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
      x: { field: "Global_Sales", type: "quantitative", aggregate: "sum" },
    },
    layer: [
      {
        // Bar layer
        mark: "bar",
        params: [
          {
            name: "selectBar",
            select: { type: "point", on: "click", encodings: ["y"] },
          },
        ],
        encoding: {
          color: {
            condition: {
              param: "selectBar",
              value: "orange",
              empty: false,
            },
            value: "grey", // Default color when no bar is selected
          },
        },
      },
      {
        // Text layer for selected bar
        transform: [{ filter: { param: "selectBar" } }],
        mark: {
          type: "text",
          align: "left",
          baseline: "middle",

          dx: 3, // Offset text slightly above the bar
        },
        encoding: {
          y: { field: "Platform", type: "nominal", sort: "-x" },

          text: {
            field: "Global_Sales",
            type: "quantitative",
            aggregate: "sum",
          },
          opacity: {
            condition: { param: "selectBar", value: 1, empty: false },
            value: 0, // Hide text when no bar is selected
          },
        },
      },
    ],
  };

  // Render the chart using Vega-Embed
  const view = await vegaEmbed("#view", vlSpectWithText).view;
}

render();
