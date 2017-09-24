<template>
  <div class="product_section">
    <div class="col-md-4 product">
        <router-link :to="/productInfo/+product.id">
            <a class="thumbnail">
                <img class="firstPageImg":src="product.img[0]" alt="">
                <p class="title">{{product.description}} - <span class="price">{{product.price}}</span></p>
            </a>
        </router-link>
	</div>
  </div>
</template>


<script>

export default {
  name: 'product_list',
  props: ['product']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.price{
    font-weight: bold
}
.firstPageImg{
    width: 100px;
    height: 140px;
}
</style>
