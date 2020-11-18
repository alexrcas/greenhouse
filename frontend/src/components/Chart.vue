
<div class="row d-flex justify-content-center">
    <h1>Gráfica</h1>
</div>


<script>

    import { Line } from 'vue-chartjs'
    import moment from 'moment'
    moment.locale('es')
    Chart.defaults.global.defaultFontColor = '#2c3e50';

    export default {
        extends: Line,
        name: 'Chart',

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
                fetch('http://192.168.0.104:5000/measure')
                    .then(res => res.json())
                    .then(data => {
                        this.chartdata.labels = data.map(measure => moment(measure.timestamp).format('L LTS'))
                        this.chartdata.datasets.push(this.createDataset(data.map(measure => measure.temperature), 'Temperatura', '#FF5154'))
                        this.chartdata.datasets.push(this.createDataset(data.map(measure => measure.humidity), 'Humedad', '#4472CA'))
                        this.chartdata.datasets.push(this.createDataset(data.map(measure => measure.terrain), 'Humedad del terreno', '#5B5941'))

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
