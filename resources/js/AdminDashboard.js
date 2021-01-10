// Build the chart
function drawPiePercentCategoryChart() {
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
        data: [
          {
            name: "Item 01",
            y: 61.41,
          },
          {
            name: "Item 02",
            y: 11.84,
          },
          {
            name: "Item 03",
            y: 10.85,
          },
          {
            name: "Item 04",
            y: 4.67,
          },
          {
            name: "Item 05",
            y: 4.18,
          },
          {
            name: "Other",
            y: 7.05,
          },
        ],
      },
    ],
  });
}

function drawColumnNumberCategoryChart() {
  const chart = Highcharts.chart("column-number-category", {
    title: {
      text: "Số lượng loại sản phẩm cửa hàng",
    },
    xAxis: {
      categories: [
        "Item 01",
        "Item 02",
        "Item 03",
        "Item 04",
        "Item 05",
        "Other",
      ],
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
        showInLegend: false,
      },
    ],
  });
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

function drawColumnNumberStockCategoryChart() {
  const chart = Highcharts.chart("column-number-stock-category", {
    title: {
      text: "Số lượng loại sản phẩm còn tồn kho",
    },
    xAxis: {
      categories: [
        "Item 01",
        "Item 02",
        "Item 03",
        "Item 04",
        "Item 05",
        "Other",
      ],
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
        showInLegend: false,
      },
    ],
  });
}

function drawColumnNumberSalesCategoryChart() {
  const chart = Highcharts.chart("column-number-sales-category", {
    title: {
      text: "Số lượng loại sản phẩm đã bán",
    },
    xAxis: {
      categories: [
        "Item 01",
        "Item 02",
        "Item 03",
        "Item 04",
        "Item 05",
        "Other",
      ],
    },
    series: [
      {
        type: "column",
        colorByPoint: true,
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
        showInLegend: false,
      },
    ],
  });
}

let body = document.querySelector("body");
body.onload = () => {
  drawPiePercentCategoryChart();
  drawColumnNumberCategoryChart();
  drawColumnNumberBillChart();
  drawColumnNumberSalesCategoryChart();
  drawColumnNumberStockCategoryChart();
};
