<template>
<div>
<div class="error">
    <div>
      
      <h1>Ronazon School<br>Management System</h1>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
   layout: 'auth',
  data(){
    return{
     
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  margin-top: 40px;
  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #46bd87;
    text-transform: uppercase;
    font-style: italic;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
  }
}
</style>