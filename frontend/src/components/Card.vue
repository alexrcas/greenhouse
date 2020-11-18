<template>
<div class="card text-center mt-2" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">{{measureName}}</h5>
    <i :class="icon" aria-hidden="true"></i>
    <h3 class="mt-2">{{measureValue}}</h3>
  </div>
</div>
</template>


<script>

    export default {
        name: 'Card',
        props: {
            measureName: String,
            measureValue: Number,
            icon: String
        }
    }
    
</script>