<template>
<div class="mainContainer">
  <h1>My Shop</h1>
  <div class="filter_section">
<!-- <button type="button" class="btn btn-primary">Primary</button> -->
    <select class="form-control select" id="category" v-model="category">
      <option value="">Category</option>
      <option  v-for="category in options.categories" 
      :value="category.value" >{{category.title}}</option>
    </select>
        <select class="form-control select" id="size" v-model="size">
      <option value="">Sizes</option>
      <option v-for="size in options.sizes" 
      :value="size">{{size}}</option>
    </select>
        <select class="form-control select" id="color" v-model="color">
      <option value="">color</option>
      <option  v-for="color in options.colors" 
      :value="color.value">{{color.title}}</option>
    </select>
        <select class="form-control select" id="sort" v-model="sort">
      <option value="">sort</option>
      <option  v-for="sort in options.sorts" 
      :value="sort.value">{{sort.title}}</option>
    </select>
    <button class="button" v-on:click="clearFilter"> clear filter</button>
  </div>
  <div class="product-section">
    <Products v-for="key in filteredProducts" :product="key"></Products>
  </div>
</div>
</template>


<script>
import Products from '@/components/products'
import mainBackEnd from '../js/backEnd'

export default {
  name: 'product_list',
  data () {
    return {
      category: '',
      size: '',
      color: '',
      sort: '',
      dataInfo: mainBackEnd.dataJson,
      options: {
        categories: [
          {
            value: 'T-shirt',
            title: 'Cool T-shirt'
          },
          {
            value: 'cap',
            title: 'Coll Cap'
          },
          {
            value: 'sweater',
            title: 'Coll sweater'
          }
        ],
        colors: [
          {
            value: 'black',
            title: 'Black Color'
          },
          {
            value: 'green',
            title: 'Green Color'
          },
          {
            value: 'red',
            title: 'Red Color'
          }
        ],
        sizes: [
          'S',
          'L',
          'M',
          'XL',
          'XXL'
        ],
        sorts: [
          {
            value: 'asc',
            title: 'Low first'
          },
          {
            value: 'desc',
            title: 'Hight first'
          }
        ]
      }
    }
  },
  components: {
    Products
  },
  computed: {
    filteredProducts () {
      var self = this
      var checkSize = (el) => {
        if (self.size === '' || el.size.indexOf(self.size) !== -1) {
          return true
        }
        return false
      }
      var checkCategory = (el) => {
        if (self.category === '' || el.category === self.category) {
          return true
        }
        return false
      }
      var checkColor = (el) => {
        if (self.color === '' || el.color.indexOf(self.color) !== -1) {
          return true
        }
        return false
      }

      var filterResult = this.dataInfo.filter(function (el) {
        return checkSize(el) && checkCategory(el) && checkColor(el)
      })
      if (self.sort === 'desc') {
        return filterResult.sort(function (a, b) {
          return b.price - a.price
        })
      } else if (self.sort === 'asc') {
        return filterResult.sort(function (a, b) {
          return a.price - b.price
        })
      } else {
        return filterResult
      }
    }
  },
  methods: {
    clearFilter: function () {
      this.category = ''
      this.size = ''
      this.color = ''
      this.sort = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
} */
.mainContainer{
  text-align: center;
}
.select{
  width: 15%;
  display: inline-block
}
</style>
