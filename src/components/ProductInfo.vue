<template>
<div class="app">
  <div class="leftContainer col-md-4">
    <slider :imgs="dataInfo.img"></slider>
  </div>

  <div class="rightContainer col-md-3">
    <div>
      <select class="form-control" v-model="size">
        <option value="">Sizes</option>
        <option v-for="size in sizes" 
        :value="size">{{size}}</option>
      </select>
    </div>
    <span class='errorMsg'>{{errorMsg}}</span>
    <button v-if="buttonMsg==='Add to bag'"v-on:click="addToBag">{{buttonMsg}}</button>
    <router-link v-else to='/bag'>
      <button >{{buttonMsg}}</button>
    </router-link>
    <router-link  to='/bag'>
      <div class="cartIcon">
        <img src="../замочек.png" alt="">
        <span>{{countItemInCart}}</span>
      </div>
    </router-link>  
  </div>
</div>
</template>

<script>

import slider from '@/components/slider'
import myBackend from '../js/backEnd'

export default {
  name: 'app',
  data () {
    return {
      errorMsg: '',
      size: '',
      color: '',
      sort: '',
      produtKey: '',
      dataInfo: '',
      countItemInCart: 0,
      sizes: '',
      buttonMsg: 'Add to bag',
      options: {
        sizes: [

        ]
      }
    }
  },
  components: {
    slider
  },
  methods: {
    addToBag: function () {
      if (this.size === '') {
        this.errorMsg = 'Select size'
      } else {
        if (localStorage['bag'] === undefined) {
          var bag = {}
        } else {
          bag = JSON.parse(localStorage['bag'])
        }
        this.dataInfo['size'] = this.size
        bag[this.produtKey] = this.dataInfo
        bag[this.produtKey].count = 1
        localStorage['bag'] = JSON.stringify(bag)
        this.buttonMsg = 'Processed to checkout'
        this.errorMsg = ''
      }
    }
  },
  beforeMount () {
    this.produtKey = this.$route.params.id
    this.dataInfo = myBackend.dataJson[this.$route.params.id - 1]
    this.sizes = myBackend.dataJson[this.$route.params.id].size
  },
  created () {
    if (localStorage['bag'] !== undefined) {
      var bag = JSON.parse(localStorage['bag'])
      var count = Object.keys(bag).length
    } else {
      count = 0
    }
    this.countItemInCart = count
  }
}
</script>


<style scoped>

.rightContainer button {
  width: 100%;
    background-color: black;
    border: 0;
    margin-top: 10px;
    color: white;
    height: 30px;
}

.errorMsg{
  color: red;
}

.cartIcon img{
  width: 50px;
  height: 45px;
}
</style>
