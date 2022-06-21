<template>
  <div style="display: flex; align-items: center;" v-if="MaxNum >= 2">

    <div style="width: 4.3rem; height: 0.3rem; display: flex; justify-content: flex-end;">

      <div @click="PaginationNumComputentReduce()" style="width: 0.3rem; height: 0.3rem; margin-right: 0.05rem; background-color: #F4F4F5; border-radius: 0.01rem; display: flex; justify-content: center; align-items: center;">
        <div style="width: 0.07rem; height: 0.07rem; border-color: #606266; border-style: solid; border-width: 0 0.02rem 0.02rem 0; transform: rotate(135deg); display: inline-block;"></div>
      </div>

      <div v-for="(item,index) in PaginationNum" :key="index" @click="Gopage(item)">
        <div style="width: 0.3rem; height: 0.3rem; background-color: #BD1A2D; margin: 0 0.05rem; border-radius: 0.01rem; display: flex; justify-content: center; align-items: center;" v-if="item == PaginationNumSelected">
          <p class="textselect" style=" font-size: 0.14rem; color: #fff; ">{{ item }}</p>
        </div>
        <div style="width: 0.3rem; height: 0.3rem; background-color: #F4F4F5; margin: 0 0.05rem; border-radius: 0.01rem; display: flex; justify-content: center; align-items: center;" v-else>
          <p class="textselect" style=" font-size: 0.14rem; color: #606266; ">{{ item }}</p>
        </div>
      </div>

      <div @click="PaginationNumComputentAdd()" style="width: 0.3rem; height: 0.3rem; margin-left: 0.05rem; background-color: #F4F4F5; border-radius: 0.01rem; display: flex; justify-content: center; align-items: center;">
        <div style="width: 0.07rem; height: 0.07rem; border-color: #606266; border-style: solid; border-width: 0 0.02rem 0.02rem 0; transform: rotate(315deg); display: inline-block;"></div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'PaginaTion',
  props: ["Total"], //通过父组件给的最大页数来运行
  data() {
    return {
      PaginationNumReplace: '',
      PaginationNum: [],

      MaxNum: '',
    }
  },
  mounted() {
    this.CalculateMaximum();
  },
  methods: {
    CalculateMaximum(){
      this.PaginationNum = [];
      if (this.MaxNum < 8) {
        for (let i = 1; i <= this.MaxNum; i++) {
          this.PaginationNum.push(i);
        }
      }else{
        this.PaginationNum = [1,2,3,4,5,6,'...',this.MaxNum]
      };
    },

    PaginationNumComputentReduce(){
      if (this.PaginationNumReplace == this.PaginationNum[0]) {
        return;
      }else{
        this.PaginationNumReplace--;
      }
    },
    PaginationNumComputentAdd(){
      if (this.PaginationNumReplace == this.PaginationNum[this.PaginationNum.length-1]) {
        return;
      }else{
        this.PaginationNumReplace++;
      }
    },
    Gopage(Num){
      // console.log(Num);
      this.PaginationNumReplace = Num;
    },
  },
  computed: {
    PaginationNumSelected: {
      get(){
        if (this.PaginationNumReplace == '') {
          return this.PaginationNum[0];
        }else{
          return this.PaginationNumReplace;
        }
      },
      set(value){
        this.PaginationNumReplace = value;
      }
    },
  },
  watch: {
    Total: {
      immediate: false,
      deep: true,
      handler(){
        this.MaxNum = this.Total;
        this.CalculateMaximum();
      }
    },
    PaginationNumSelected: {
      immediate: true,
      deep: true,
      handler(newValue){
        this.$emit('clickPage', newValue)
        let max = this.PaginationNum[this.PaginationNum.length-1];
        if (this.MaxNum >= 8) {
          if (newValue < 6) {
          this.PaginationNum = [1,2,3,4,5,6,'...',max];
          }
          if (newValue >= 6 && newValue < max-3) {
            this.PaginationNum = [1,'...',newValue-2,newValue-1,newValue,newValue+1,'...',max];
          }
          if (newValue >= max-3) {
            this.PaginationNum = [1,'...',max-5,max-4,max-3,max-2,max-1,max];
          }
        }
      }
    },
    PaginationNumReplace: {
      immediate: true,
      deep: true,
      handler(){
        if (this.PaginationNumReplace == '') {
          this.PaginationNumReplace = 1;
        }
      }
    },
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .textselect{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>