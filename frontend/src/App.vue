<template>
  <div>
    <div class="container mt-4">
        <Panel/>
    </div>

    <div class="container mt-4">
      <h3>Ambiente</h3>
      <Chart/>
    </div>

    <div class="container mt-4">
      <h3>Riego</h3>
      <WateringChart/>
    </div>

    <div class="mb-4"></div>


<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Regando</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h2>Litros empleados:</h2>
        <h2 id="litros"></h2>
        <h2 id="terminado" style="display: none">Riego terminado</h2>
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script>


import Panel from './components/Panel'
import Chart from './components/Chart'
import WateringChart from './components/WateringChart'

export default {
  name: 'App',
  components: {
    Panel,
    Chart,
    WateringChart
  }
}
</script>

<style>

body {
  background-color: #54c05f;
  color: #2c3e50;
}
</style>
