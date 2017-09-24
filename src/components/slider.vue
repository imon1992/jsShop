<template>
    <div class="slider-content">
    <div class='slidershow-container'>
        <div v-for="img,key in imgs" v-if="key == 0" id='slider-wrapper'>
           <div class='mySlides' ref="mySlides">
               <img :src="img" alt='' class="img">
           </div>
        </div>
        <div v-for="img,key in imgs" v-if="key != 0"id='slider-wrapper'>
           <div class='mySlides noActive' ref="mySlides">
               <img :src="img" alt='' class="img">
           </div>
        </div>
          <a class='prev' v-on:click='minusSlides'>&#10094</a>
          <a class='next' v-on:click='plusSlides'>&#10095</a>
    </div>
    <br>
    <div class="preveiw-section">
        <img  v-for="img,key in imgs" class="imgPrev preveiw" :src="img" v-on:click='currentSlide(key+1)' ref="prevImg">
    </div>
    </div>
</template>
 
 
<script>
export default {
  name: 'Slider',
  props: ['imgs'],
  data () {
    return {
      slideIndex: 1,
      visible: false,
      repeatSlider: ''
    }
  },
  methods: {
    plusSlides: function () {
      this.slideIndex++
      this.showSlides(this.slideIndex)
    },
    minusSlides: function () {
      this.slideIndex--
      this.showSlides(this.slideIndex)
    },
    currentSlide: function (n) {
      console.log(this.c)
      console.log(this.imgs)
    //   this.imgs
      this.showSlides(this.slideIndex = n)
    },
    showSlides: function (n) {
      var i
      var slides = this.$refs.mySlides
      var imgsPrev = this.$refs.prevImg
      if (n > slides.length) {
        this.slideIndex = 1
      }
      if (n < 1) {
        this.slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none'
      }
      for (i = 0; i < imgsPrev.length; i++) {
        imgsPrev[i].className = imgsPrev[i].className.replace('active', '')
      }
      slides[this.slideIndex - 1].style.display = 'block'
      imgsPrev[this.slideIndex - 1].className += ' active'
    }
  },
  created () {
    this.repeatSlider = setInterval(this.plusSlides, 2000)
  },
  beforeDestroy () {
    clearInterval(this.repeatSlider)
  }
}

</script>
<style>
.slider-content{
    float: left;
}
 
.slidershow-container{
    position: relative;
    margin: auto;
        text-align: center;
}
 
.mySlides{
    margin-top: 28px;
    width: 400px;
}
.mySlides img{
    margin-top: 28px;
    width: 200px;
    height: 200px;
}
 
.img{
  width: 100%
}
 
.prev, .next{
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    margin-top: -22px;
    padding: 16px;
    color: grey;
    font-weight: bold;
    font-size: 18px;
    transition: 1.5s;
    border-radius: 0 3px 3px 0;
}
 
.next{
    right: 0;
    border-radius: 3px 0 0 3px;
    margin-right: 30px;
}
.prev{
    left: 0;
    margin-left: 30px;
}
 
.prev:hover, .next:hover{
    background-color: rgba(0,0,0,0.8);
}
 
.text{
    color: #e81bc4;
    font-size: 18px;
    padding: 5px 8px;
    position: absolute;
    top: 0;
}
 
.imgPrev{
    cursor: pointer;
    display: inline-block;
    transition-duration: 0.5s;
}
.preveiw-section img {
            height: 70px;
    width: 80px;
}
 
.active, .imgPrev:hover{
    opacity: 0.5;
    border: 2px solid deepskyblue;
}
 
#slider-wrapper {
    position: relative;
    transition: left 400ms linear;
}
.noActive{
    display: none;
}
 
.preveiw-section{
    margin-top: 10px;
    margin-left: 10px;
    position: relative;
    bottom: 30px;
    width: inherit;
}
 
.preveiw{
  width: 100px;
  float: left;
}
.imgPrev{
  width: 100%;
}
 
</style>