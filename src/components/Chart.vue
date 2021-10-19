<template>
    <b-container>
        <h1 class="mb-3 text-center">
            {{ coinName }}
        </h1>
        <div
            class="hello"
            ref="chartdiv"
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
        methods: {
            updateData() {
                let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

                axios.get(`https://api.coincap.io/v2/assets/` + this.coin + `/history?interval=d1`)
                    .then(response => {

                        console.log(response.data.data)

                        let data = [];
                        data = response.data.data

                        chart.paddingRight = 20;

                        data.forEach((item) => {
                            item.date = new Date(item.date)
                            item.value = item.priceUsd
                        })

                        console.log(data)

                        chart.data = data;

                        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                        dateAxis.renderer.grid.template.location = 0;

                        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                        valueAxis.tooltip.disabled = true;

                        let series = chart.series.push(new am4charts.LineSeries());
                        series.dataFields.dateX = "date";
                        series.dataFields.valueY = "value";

                        series.tooltipText = "{valueY.value}";
                        chart.cursor = new am4charts.XYCursor();

                        this.chart = chart;
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            }
        },
        mounted() {
            this.updateData()
        },
        watch: {
            coin() {
                this.updateData()
            }
        },
        beforeDestroy() {
            if (this.chart) {
                this.chart.dispose();
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
