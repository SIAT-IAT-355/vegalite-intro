# Introduction to vegalite

### What is vegalite?

[**Vega-Lite**](https://vega.github.io/vega-lite/) is a [high-level](https://en.wikipedia.org/wiki/High-level_programming_language) grammar for creating data visualizations. It allows users to define charts in a simple, declarative format using [JSON](https://en.wikipedia.org/wiki/JSON) or JavaScript. Instead of manually coding complex visualizations, you describe what you want to show, and Vega-Lite automatically generates the visual output.

### Key Concepts:

1. **Marks**: These are basic visual elements like bars, points, lines, or areas. They represent the type of chart you want (e.g., bar chart, line graph).

   - Example: `mark: "bar"` creates a bar chart.

2. **Encoding**: This maps your data to visual properties such as position (x, y), color, size, or shape.

   - Example: `x: {field: "category", type: "nominal"}` maps the "category" field to the x-axis.

3. **Data**: You provide data in the form of arrays, which can be local or loaded from external sources.

   - Example: `data: [{a: "A", b: 20}, {a: "B", b: 40}]`.

4. **Transformations**: Vega-Lite allows you to manipulate your data through filtering, aggregation, and calculation before visualizing it.

5. **Declarative Syntax**: Instead of writing procedural code, you describe what you want the chart to look like, and Vega-Lite takes care of the details.

Overall, Vega-Lite is perfect for beginners and those who want to quickly create visualizations with minimal code, while still providing flexibility for more advanced customization.

From the vegalite website:

> Vega-Lite specifications describe visualizations as encoding mappings from data to properties of **graphical marks** (e.g., points or bars). The Vega-Lite compiler **automatically produces visualization components** including axes, legends, and scales. It determines default properties of these components based on a set of **carefully designed rules**. This approach allows Vega-Lite specifications to be concise for quick visualization authoring, while giving user control to override defaults and customize various parts of a visualization. As we also designed Vega-Lite to support data analysis, Vega-Lite supports both **data transformations** (e.g., aggregation, binning, filtering, sorting) and visual transformations (e.g., stacking and faceting). Moreover, Vega-Lite specifications can be composed into layered and multi-view displays, and made **interactive with selections**.

### How can I try out vegalite?

You can use Observable to try out visualizations and see the results immediately. You can then easily bring in your code to your own website and show it off!

- create an observable account
- Fork this [Observable Notebook](https://observablehq.com/d/7c00a8dfdfda37c8)

### How can I see the code in my own html page?

In this repository, you can see an index.html file that loads vegalite. All you need to do is to replace your code with the one in vis.js

Note there is an extra step from what you did in Observable :)

After you run `[vegalite code ...].render()`, in observable, the visualization just magically shows up. But here, you need to tell it to put the visualization in a div.

In our `index.html` file we have a `div` with an `id="view"`, in this JS code, we are telling vegalite to place the visualization inside of that div (pay attention to the part after `.redner()`):

```js
vl.markBar({ tooltip: true })
  .data([
    { a: "A", b: 28 },
    { a: "B", b: 55 },
    { a: "C", b: 43 },
    { a: "D", b: 91 },
    { a: "E", b: 81 },
    { a: "F", b: 53 },
    { a: "G", b: 19 },
    { a: "H", b: 87 },
    { a: "I", b: 52 },
  ])
  .encode(
    vl.x().fieldQ("b"),
    vl.y().fieldN("a"),
    vl.tooltip([vl.fieldQ("b"), vl.fieldN("a")])
  )
  .width(400)
  .height(400)
  .render()
  .then((viewElement) => {
    // Render returns a promise to a DOM element containing the chart
    document.getElementById("view").appendChild(viewElement);
  });
```

We are going to learn more about vegalite and D3 as we move on. But this is a good start :).

Have fun.
