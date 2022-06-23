<!-- 
  *
  做一个冰箱温度，温度4正负1随机数，时间08:00到10:00之间的随机数,时间一列(180分钟里随机时间),温度一列
  *
 -->


<template>
  <div class="AppMain" style="display: flex; justify-content: center;">
    <div class="Condition" style="width: 90%; box-shadow: 0 0.02rem 0.12rem 0 rgba(0, 0, 0, 0.1);">
      <div>

        <div style="display: flex; align-items: center; margin-bottom: 0.2rem;">
          <div class="BigCategoryTitle">请输入范围:</div>
          <!-- <div style="display: flex; align-items: center;"> -->
            <!-- <input class="BigCategoryInput" type="number" v-model="MinimumRange" placeholder="基数"/> -->
            <!-- <div style="width: 0.15rem; height:0.02rem; background: #b9b9b9; margin: 0.04rem"></div> -->
            <!-- <div style="margin: 0 0.1rem; color:#606266; font-size: 0.32rem;">±</div> -->
            <!-- <input class="BigCategoryInput" type="number" v-model="MaximumRange" placeholder="范围"/> -->
          <!-- </div> -->

          <div style="display: flex; align-items: center;">
            <input class="BigCategoryInput" type="number" v-model="MinimumRange" placeholder="最小值"/>
            <div style="width: 0.15rem; height:0.02rem; background: #b9b9b9; margin: 0.04rem"></div>
            <input class="BigCategoryInput" type="number" v-model="MaximumRange" placeholder="最大值"/>
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 0.2rem;">
          <div class="BigCategoryTitle">请输入小数精度(就是几位小数,不需要就不写):</div>
          <div style="display: flex; align-items: center;">
            <input class="BigCategoryInput" type="number" v-model="DecimalPrecision" placeholder="小数精度"/>
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 0.2rem;">
          <div class="BigCategoryTitle">请输入计算得出的数据数量:</div>
          <div style="display: flex; align-items: center;">
            <input class="BigCategoryInput" type="number" v-model="DataQuantity" placeholder="数据数量"/>
          </div>
        </div>

        <!-- <div style="display: flex; align-items: center; margin-bottom: 0.2rem;"> -->
          <!-- <div class="BigCategoryTitle">数据结果是否需要为随机正负:</div> -->
          <!-- <div style="display: flex; align-items: center;"> -->
            <!-- <input class="BigCategoryInput" type="checkbox" v-model="PositiveAndNegativeStates"/> -->
          <!-- </div> -->
        <!-- </div> -->

        <div style="cursor: pointer; width: 1.32rem; height: 0.38rem; line-height: 0.38rem; border: 0.01rem solid #afafaf; box-sizing: border-box; border-radius: 0.08rem; text-align: center; color:#606266; font-size: 0.2rem; margin-bottom: 0.2rem;" @click="Go()">开始</div>

        <div>
          <p style="color:#606266; font-size: 0.4rem; margin-bottom: 0.2rem;">结果：</p>
          <p style="color:#606266; font-size: 0.2rem; margin-bottom: 0.2rem;" v-for="(item, index) in Data" :key="index">{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  props: {

  },
  data() {
    return {
      //表单值
      MinimumRange: '',
      MaximumRange: '',
      DecimalPrecision: '',
      DataQuantity: '',
      PositiveAndNegativeStates: '',
      Data: [],

      //计算辅值
      //中位数
      Median: '',
      //范围
      Range: '',

    }
  },
  methods: {
    Go() {
      // console.log(this.MinimumRange);
      // console.log(this.MaximumRange);
      // console.log(this.DecimalPrecision);
      // console.log(this.DataQuantity);
      // console.log(this.PositiveAndNegativeStates);

      this.Data=[];

      if (this.MaximumRange <= this.MinimumRange) {
        alert('最大值与最小值关系不匹配');
      }

      this.Median = this.MinimumRange + (this.MaximumRange - this.MinimumRange)/2;
      this.Range = (this.MaximumRange - this.MinimumRange)/2;
      console.log(this.Median);
      console.log(this.Range);

      if (this.DecimalPrecision == '') {
        this.DecimalPrecision = 0;
      }else if (this.DecimalPrecision < 0) {
        this.DecimalPrecision = 0;
      }

      // this.Median +- (((Math.random() * 10) * this.Range)/10)
      for (let i = 0; i < this.DataQuantity; i++) {
        let RandomRange = (((Math.random() * 10) * this.Range)/10); //范围内的随机值
        if (Math.random() * 10 >= 5) {
          this.Data.push((this.Median + RandomRange).toFixed(this.DecimalPrecision));
        }else{
          this.Data.push((this.Median - RandomRange).toFixed(this.DecimalPrecision));
        }
      }


    },
  },
  mounted() {
    
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Condition{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
.BigCategoryTitle {
  width: 4.9rem;
  height: 0.23rem;
  display: inline-block;
  font-family: Alibaba Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 0.2rem;
  line-height: 0.22rem;
  align-items: center;
  color: #afafaf;
}
.BigCategoryInput {
  width: 1.32rem;
  height: 0.38rem;
  border: 0.01rem solid #afafaf;
  box-sizing: border-box;
  font-size: 0.16rem;
  border-radius: 0.08rem;
  text-align: center;
  color:#606266;
}
</style>