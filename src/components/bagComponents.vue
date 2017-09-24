<template>
  <div class="productSection">
    <!-- <div class="col-md-4 product">
        <router-link :to="/productInfo/+product.id">
        <a class="thumbnail">
            <img :src="product.img[0]" alt="">
            <p class="title">{{product.description}} - <span class="price">{{product.price}}</span></p>
        </a>
        </router-link> -->
            <hr></hr>
        <!-- <div> -->
            <div class="leftBlock">
                <div>
                    <div>
                        <div class="title">
                            <p>title</p>
                        </div>
                        <div class="remove">
                            <button class="removeButton" v-on:click="removeProduct">X</button>
                        </div>
                    </div>
                    <div class="rowDiv">
                        <div class="size">
                            <span class="firstSpan">Size</span>
                            <span>{{product.size}}</span>
                            </div>
                        <div class="price"> 
                            <span>{{ product.price }} EUR </span>
                        </div>
                    </div>
                    <div class="rowDiv">
                        <div class="color">
                            <span class="firstSpan">Color</span> 
                            <span>{{product.color[0]}}</span>
                        </div>
                        <div class="count">
                            <button v-on:click="minus" class="minus">-</button>
                            <span >{{count}}</span>
                            <button v-on:click="plus" class="plus">+</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rightBlock">

                <img :src="product.img[0]" alt="">
            </div>
        </div>
	<!-- </div> -->
</template>


<script>

export default {
  name: 'bag_list',
  data () {
    return {
    //   bagData: '',
      count: 0
    }
  },
  methods: {
    plus: function () {
      this.count++
      var bag = JSON.parse(localStorage['bag'])
      bag[this.product.id].count = this.count
      localStorage['bag'] = JSON.stringify(bag)
    //   var changeCostOn = this.count * this.product.price
      this.$emit('changeCount', this.product.id, this.count)
    },
    minus: function () {
      this.count--
      var bag = JSON.parse(localStorage['bag'])
      bag[this.product.id].count = this.count
      localStorage['bag'] = JSON.stringify(bag)
    //   var changeCostOn = this.count * this.product.price
      this.$emit('changeCount', this.product.id, this.count)
    },
    removeProduct: function () {
      var bag = JSON.parse(localStorage['bag'])
      delete bag[this.product.id]
      localStorage['bag'] = JSON.stringify(bag)
      this.$emit('dataRemove', this.product.id)
    }
  },
  props: ['product'],
  created () {
    this.count = this.product.count
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.productSection{
    height: 150px;
}
.price{
    font-weight: bold
}
.leftBlock{
    display: inline-block;
    width: 70%;
}
.rightBlock{
    float: right;
    height: 99%;
    width: 30%;
    text-align: center;
}
.rightBlock img{
    height: 100%;
    max-width: 100%;
}

.firstSpan{
    display: block;
}

.rowDiv{
    width: 50%;
}

.size, .color, .title{
    display: inline-block;
}
.price, .count, .remove{
    float: right;
}
.minus, .plus, .removeButton{
  height: 30px;
  width: 25px;
  border: 0;
  /* margin-top: 10px; */
  color: white;
  background-color: black;
}
/* .removeButton{} */

</style>
