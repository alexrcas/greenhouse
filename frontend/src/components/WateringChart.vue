
<div class="row d-flex justify-content-center">
    <h1>Gráfica</h1>
</div>


<script>

    import { Bar } from 'vue-chartjs'
    import moment from 'moment'
    moment.locale('es')
    Chart.defaults.global.defaultFontColor = '#2c3e50';

    export default {
        extends: Bar,
        name: 'WateringChart',

        data() {
            return {
                chartdata: {
                    labels: [],
                    datasets: []
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        },

        methods: {
            getMeasures() {
                fetch('http://192.168.0.104:5000/watering')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        this.chartdata.labels = data.map(watering => moment(watering.timestamp).format('L LTS'))
                        this.chartdata.datasets.push(this.createDataset(data.map(watering => watering.volume), 'Litros', '#4472CA'))

                        this.$data._chart.update();
                    })
            },

            createDataset(dataArray, label, color) {
                return {
                    label: label,
                    data: dataArray,
                    backgroundColor: color
                }
            }
        },

        beforeMount() {
            this.getMeasures();
        },

        mounted() {
            this.renderChart(this.chartdata, this.options)
        }
    }
</script>
