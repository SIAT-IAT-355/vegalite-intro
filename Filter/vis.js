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
    // filter data NA sales smaller than 10 and JP sales smaller than 10
    transform: [
      { filter: { field: "EU_Sales", lt: 2 } },
      { filter: { field: "JP_Sales", lt: 2 } },
    ],
    encoding: {
      // smaller circles for smaller sales
      size: { value: 10 },

      // limit range of x and y axis to make the visualization more readable
      // logarithmic scale
      y: {
        field: "EU_Sales",
        type: "quantitative",
        scale: { domain: [0, 2] },
      },
      x: {
        field: "JP_Sales",
        type: "quantitative",
        scale: { domain: [0, 2] },
      },
      color: { field: "Genre", type: "nominal" },
      opacity: {
        condition: { param: "genreFilter", value: 1 },
        value: 0.1,
      },
    },
    layer: [
      {
        // Bar layer
        mark: "circle",
        params: [
          {
            // filter by genre on legend

            name: "genreFilter",
            select: { type: "point", on: "click", fields: ["Genre"] },
            bind: "legend",
          },
        ],
      },
    ],
  };

  // Render the chart using Vega-Embed
  const view = await vegaEmbed("#view", vlSpectWithText).view;
}

render();
