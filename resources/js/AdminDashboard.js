// Build the chart
function drawPiePercentCategoryChart(piechartData) {
  Highcharts.chart("pie-percent-category", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Phần trăm loại sản phẩm cửa hàng",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Category",
        colorByPoint: true,
        data: piechartData,
        // data: [
        // 	{
        // 		name: "Item 01",
        // 		y: 61.41,
        // 	},
        // 	{
        // 		name: "Item 02",
        // 		y: 11.84,
        // 	},
        // 	{
        // 		name: "Item 03",
        // 		y: 10.85,
        // 	},
        // 	{
        // 		name: "Item 04",
        // 		y: 4.67,
        // 	},
        // 	{
        // 		name: "Item 05",
        // 		y: 4.18,
        // 	},
        // 	{
        // 		name: "Other",
        // 		y: 7.05,
        // 	},
        // ],
      },
    ],
  });
}

function populatePieChart(items) {
  let pieData = [];

  let currentCate = items[0].category;
  let amount = 0;
  let sum = 0;

  for (let i = 0; i < items.length; i++) {
    sum += items[i].stock + items[i].sales;
  }

  for (let i = 0; i < items.length; i++) {
    if (currentCate === items[i].category) {
      amount += items[i].stock + items[i].sales;

      if (i === items.length - 1) {
        let percentage = (amount / sum) * 100;
        pieData.push({
          name: currentCate,
          y: percentage,
        });
      }
    } else {
      if (amount === 0) {
        items[i].stock + items[i].sales;
      }

      let percentage = (amount / sum) * 100;

      pieData.push({
        name: currentCate,
        y: percentage,
      });

      amount = 0;
      currentCate = items[i].category;
    }
  }

  console.log(`pieData: ${JSON.stringify(pieData, null, 4)}`);
  drawPiePercentCategoryChart(pieData);
}

function drawColumnNumberCategoryChart({ categories, barData }) {
  const chart = Highcharts.chart("column-number-category", {
    title: {
      text: "Số lượng loại sản phẩm cửa hàng",
    },
    xAxis: {
      categories: categories,
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: barData,
        showInLegend: false,
      },
    ],
  });
}

function populateColumnNumberCategoryChart(items) {
  let categories = [];
  let barData = [];

  let currentCate = items[0].category;
  let amount = 0;
  for (let i = 0; i < items.length; i++) {
    if (currentCate === items[i].category) {
      amount += items[i].stock + items[i].sales;

      if (i === items.length - 1) {
        categories.push(currentCate);
        barData.push(amount);
      }
    } else {
      if (amount === 0) {
        amount += items[i].stock + items[i].sales;
      }

      categories.push(currentCate);
      barData.push(amount);

      amount = 0;
      currentCate = items[i].category;
    }
  }

  console.log(`Number of Categories: ${categories.length}`);
  console.log(`Follow dataset: ${barData.length}`);

  drawColumnNumberCategoryChart({ categories, barData });
}

function drawColumnNumberBillChart() {
  const chart = Highcharts.chart("column-number-bill", {
    title: {
      text: "Số lượng đơn hàng theo tháng",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: [
          29.9,
          71.5,
          106.4,
          129.2,
          144.0,
          176.0,
          135.6,
          148.5,
          216.4,
          194.1,
          95.6,
          54.4,
        ],
        showInLegend: false,
      },
    ],
  });
}

function drawColumnNumberStockCategoryChart({ categories, stocks }) {
  const chart = Highcharts.chart("column-number-stock-category", {
    title: {
      text: "Số lượng loại sản phẩm còn tồn kho",
    },
    xAxis: {
      categories: categories,
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: stocks,
        showInLegend: false,
      },
    ],
  });
}

function populateColumnNumberStockCategoryChart(items) {
  let categories = [];
  let stocks = [];

  let currentCate = items[0].category;
  let stock = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].category === currentCate) {
      stock += items[i].stock;

      if (i === items.length - 1) {
        categories.push(currentCate);
        stocks.push(stock);
      }
    } else {
      if (stock === 0) {
        stock += items[i].stock;
      }

      categories.push(currentCate);
      stocks.push(stock);

      stock = 0;
      currentCate = items[i].category;
    }
  }

  drawColumnNumberStockCategoryChart({ categories, stocks });
}

function drawColumnNumberSalesCategoryChart({ categories, sales }) {
  const chart = Highcharts.chart("column-number-sales-category", {
    title: {
      text: "Số lượng loại sản phẩm đã bán",
    },
    xAxis: {
      categories: categories,
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: sales,
        showInLegend: false,
      },
    ],
  });
}

function populateColumnNumberSalesCategoryChart(items) {
  let categories = [];
  let sales = [];

  let currentCate = items[0].category;
  let sale = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].category === currentCate) {
      sale += items[i].sales;

      if (i === items.length - 1) {
        categories.push(currentCate);
        sales.push(sale);
      }
    } else {
      if (sale === 0) {
        sale += items[i].sales;
      }

      categories.push(currentCate);
      sales.push(sale);

      sale = 0;
      currentCate = items[i].category;
    }
  }

  drawColumnNumberSalesCategoryChart({ categories, sales });
}

let body = document.querySelector("body");
body.onload = () => {
  // Get all items
  fetch("/admin/json/items")
    .then(async (res) => {
      let items = await res.json();
      // console.log(
      // 	`Fetch ${items.length} items: ${JSON.stringify(items, null, 4)}`
      // );
      console.log(`Fetch ${items.length} items.`);

      items.sort((a, b) => {
        return a.category.localeCompare(b.category);
      });

      console.log(`Items: ${JSON.stringify(items, null, 4)}`);

      populatePieChart(items);
      populateColumnNumberCategoryChart(items);
      populateColumnNumberStockCategoryChart(items);
      populateColumnNumberSalesCategoryChart(items);
    })
    .catch((rs) => {
      console.log(`Fail fetching. ${rs}`);
    });

  // drawPiePercentCategoryChart();
  // drawColumnNumberCategoryChart();
  drawColumnNumberBillChart();
  // drawColumnNumberSalesCategoryChart();
  // drawColumnNumberStockCategoryChart();
};
