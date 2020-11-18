<template>
    <div>
        <div class="row d-flex justify-content-around">
            Última medida tomada {{moment(lastMeasure.timestamp)}}
        </div>
        <div class="row d-flex justify-content-around">
        <Card measureName="Temperatura ºC" icon="fa fa-3x fa-thermometer-three-quarters" :measureValue="lastMeasure.temperature" />
        <Card measureName="% Humedad" icon="fa fa-3x fa-cloud" :measureValue="lastMeasure.humidity" />
        <Card measureName="% Humedad del terreno" icon="fa fa-3x fa-shower" :measureValue="lastMeasure.terrain" />
        </div>
    </div>
</template>


<script>

import Card from './Card'
import moment from 'moment'

moment.locale('es')

    export default {
        name: 'Panel',
        components: {
            Card
        },

        data() {
            return {
                lastMeasure: {}
            }
        },

        methods: {
            getLastMeasure() {
                fetch('http://192.168.0.104:5000/lastMeasure')
                    .then(response => response.json())
                    .then(data => this.lastMeasure = data)
            },

            moment(timestamp) {
                return moment(timestamp).calendar()
            }
        },

        beforeMount() {
            this.getLastMeasure()
        }
    }
</script>