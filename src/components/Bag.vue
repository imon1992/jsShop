<template>
<div>
<div class="leftContainer col-md-6">
    <h3>Checkout</h3>
    <bag-components  @dataRemove="getNewData" @changeCount="changeProductCount"
     v-for="item in rendreNewView" :product="item"></bag-components>
</div>
<div class="rightContainer col-md-6">
  <div class="vaucherSection">
    <p>Vaucher Code</p>
    <input class="textInput" v-model="vaucherCode" type="text">
    <button class="button" v-on:click="recountCostByVaucher">Submit</button>
  </div>
  <hr></hr>
  <div class="priceProcessionSection">
    <div>
      <span>Bascet</span>
      <span class="coast">{{bagCost}}</span>
    </div>
    <div>
      <span>Vaucher Reduction</span>
      <span class="coast">{{vaucherReduction}}</span>
    </div>
    <div>
      <span>Shiping</span>
      <span class="coast">{{shiping}}</span>
    </div>
    <div class="total">
      <span>Grand total</span>
      <span class="coast">{{total}}</span>
    </div>
  </div>
  <hr></hr>
  <div class="paymentSectio">
    <p>Select payment method</p>

    <div v-for="payment in paymentSystem" class="checkbox">
      <label>
        <input type="checkbox" value="">
        <span>{{payment}}</span>
      </label>
    </div>
  </div>
  <div class="userInfoSection">
    <p>Your detalis</p>
    <div>
      <input class="textInput" placeholder='First Name' v-model="firstName" type="text">
      <span class="errorMsg">{{errorMsg}}</span>
    </div>
    <div>
      <input class="textInput" placeholder="Last Name"v-model="lastName" type="text">
      <span class="errorMsg">{{errorMsg}}</span>
    </div>
    <div>
      <input class="textInput" placeholder="Email"v-model="email" type="text">
      <span class="errorMsg">{{errorMsg}}</span>
    </div>
    <div>
      <input class="textInput" placeholder="Phone"v-model="phone" type="text">
    </div>
    <div>
      <input class="textInput" placeholder="Addres"v-model="adrees" type="text">
    </div>
      <button class="buttonComplete" v-on:click="completePurchase">Complete Purchase</button>
  </div>
  <hr></hr>
</div>
</div>
</template>



<script>
import BagComponents from '@/components/bagComponents'

export default {
  name: 'product_list',
  data () {
    return {
      bagData: '',
      vaucherCode: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      adrees: '',
      bagCost: 0,
      shiping: 9.90,
      total: 0,
      errorMsg: '',
      vaucherReduction: 0,
      discount: 0,
      key: '',
      productKey: '',
      payment: '',
      userId: 12,
      prorocentDiscount: {
        'disck10': 0.10
      },
      staticDiscount: {
        'disck5eur': 5
      },
      paymentSystem: [
        'Credit card',
        'PayPal'
      ]
    }
  },
  components: {
    BagComponents
  },
  created () {
    if (localStorage['bag'] !== undefined) {
      this.bagData = JSON.parse(localStorage['bag'])
      this.countUpTotal()
    }
  },
  methods: {
    getNewData: function (id) {
      this.key = id
    },
    changeProductCount: function (productKey, newCount) {
      this.bagData[productKey].count = newCount
      this.countUpTotal()
    },
    recountCostByVaucher: function () {
      for (var procentKey in this.prorocentDiscount) {
        if (procentKey === this.vaucherCode) {
          var discount = this.bagCost * this.prorocentDiscount[procentKey]
          this.discount = this.prorocentDiscount[procentKey]
          this.vaucherReduction = discount
          this.vaucherCode = ''
          return
        }
      }
      for (var staticKey in this.staticDiscount) {
        if (staticKey === this.vaucherCode) {
          discount = this.staticDiscount[staticKey]
          this.vaucherReduction = discount
          this.discount = discount
          this.vaucherCode = ''
          return
        }
      }
    },
    completePurchase: function () {
      if (this.firstName === '' || this.lastName === '' || this.email === '') {
        this.errorMsg = 'Fill field'
      } else {
        localStorage.removeItem('bag')
        this.$router.push({ path: '/thankyou' })
        this.errorMsg = ''
      }
    },
    countUpTotal: function () {
      this.bagCost = 0
      for (var key in this.bagData) {
        this.bagCost += this.bagData[key].count * this.bagData[key].price
      }

      if (this.discount > 1) {
        console.log(122)
        this.total = this.bagCost - this.vaucherReduction + this.shiping
        return
      }

      if (this.discount > 0 && this.discount < 1) {
        console.log(1221)
        var vaucherReduction = this.bagCost * this.discount
        this.total = this.bagCost - vaucherReduction + this.shiping
        this.vaucherReduction = vaucherReduction
        return
      }

      this.total = this.bagCost - this.vaucherReduction + this.shiping
    }
  },
  computed: {
    rendreNewView: function () {
      if (this.key === '') {
        this.countUpTotal()
        return this.bagData
      } else {
        delete this.bagData[this.key]
        this.countUpTotal()
        return this.bagData
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.leftContainer{
  padding-left: 50px;
  width: 50%;
}
.rightContainer{
  width: 20%;
}

.textInput{
  width: 100%
}

.coast{
  float: right;
}

.errorMsg{
  color: red;
}

.total{
  padding-top: 30px;
  font-size: 20px; 
}

.buttonComplete{
  height: 50px;
  width: 100%;
  border: 0;
  margin-top: 10px;
  color: white;
  background-color: black;
}

</style>

