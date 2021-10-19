<template>
    <b-container>
        <h1 class="mb-3 text-center">
            {{ coinName }}
        </h1>
        <div
            ref="chartdiv"
            class="hello"
        />
    </b-container>
</template>

<script>
    import axios from 'axios'

    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";

    am4core.useTheme(am4themes_animated);

    export default {
        name: "Chart",
        props: {
            coin: {
                type: String,
                default: 'bitcoin'
            }
        },
        computed: {
            list() {
                return this.$coinList
            },
            coinName() {
                return this.list.find(c => c.query === this.coin).name
            }
        },
        watch: {
            coin() {
                this.updateData()
            }
        },
        mounted() {
            this.updateData()
        },
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
            }
        },
        methods: {
            updateData() {
                let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

                axios.get(`https://api.coincap.io/v2/assets/` + this.coin + `/history?interval=d1`)
                    .then(response => {
                        let data = response.data.data

                        data.forEach((item) => {
                            item.date = new Date(item.date)
                        })

                        chart.data = data;

                        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                        dateAxis.tooltipDateFormat = "dd-MMM-yyyy";

                        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                        valueAxis.tooltip.disabled = true;

                        let series = chart.series.push(new am4charts.LineSeries());
                        series.dataFields.dateX = "date";
                        series.dataFields.valueY = "priceUsd";

                        series.tooltip.pointerOrientation = "vertical";
                        series.tooltipText = "{valueY}";
                        chart.cursor = new am4charts.XYCursor();

                        this.chart = chart;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        }
    }
</script>

<style scoped>
    .hello {
        width: 100%;
        height: 500px;
    }
</style>
