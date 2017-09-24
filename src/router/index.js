import Vue from 'vue'
import Router from 'vue-router'
import ProductList from '@/components/ProductList'
import ProductInfo from '@/components/ProductInfo'
import Bag from '@/components/Bag'
import ThankYou from '@/components/thankyou'

Vue.use(Router)

function dynamicPropsFn (route) {
  return {
    name: route.params.id
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/productInfo/:id',
      name: 'ProductInfo',
      component: ProductInfo,
      props: dynamicPropsFn
    },
    {
      path: '/bag',
      name: 'Bag',
      component: Bag
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: ThankYou
    }
  ]
})
