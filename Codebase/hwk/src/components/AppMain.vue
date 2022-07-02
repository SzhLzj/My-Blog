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
          <div class="BigCategoryTitle">数列数量:</div>
          <div style="display: flex; align-items: center; width: 3.1rem;">
            <input class="BigCategoryInput" type="number" v-model="FormNum" placeholder="为了美观,最大4"/>
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 0.2rem;">
          <div class="BigCategoryTitle">请输入范围:</div>
          <div style="display: flex; align-items: center; width: 3.1rem;" v-for="item of FormNum" :key="item">
            <!-- <input class="BigCategoryInput" type="number" v-model="MinimumRange" placeholder="最小值"/> -->
            <input class="BigCategoryInput" type="number" v-model="form[`MinimumRange${item}`]" placeholder="最小值"/>
            <div style="width: 0.15rem; height:0.02rem; background: #b9b9b9; margin: 0.04rem"></div>
            <input class="BigCategoryInput" type="number" v-model="form[`MaximumRange${item}`]" placeholder="最大值"/>
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 0.2rem;">
          <div class="BigCategoryTitle">请输入小数精度(就是几位小数,不需要就不写):</div>
          <div style="display: flex; align-items: center; width: 3.1rem;" v-for="item of FormNum" :key="item">
            <input class="BigCategoryInput" type="number" v-model="form[`DecimalPrecision${item}`]" placeholder="小数精度"/>
          </div>
        </div>

        <div style="display: flex; align-items: center; margin-bottom: 0.2rem;">
          <div class="BigCategoryTitle">请输入计算得出的数据数量:</div>
          <div style="display: flex; align-items: center; width: 3.1rem;" v-for="item of FormNum" :key="item">
            <input class="BigCategoryInput" type="number" v-model="form[`DataQuantity${item}`]" placeholder="数据数量"/>
          </div>
        </div>

        <div style="cursor: pointer; width: 1.32rem; height: 0.38rem; line-height: 0.38rem; border: 0.01rem solid #afafaf; box-sizing: border-box; border-radius: 0.08rem; text-align: center; color:#606266; font-size: 0.2rem; margin-bottom: 0.2rem;" @click="Go()">
          开始
        </div>

        <div>
          <p style="color:#606266; font-size: 0.4rem; margin-bottom: 0.2rem;">结果：</p>
          <div style="display: flex;">
            <div style=" border: #606266 solid 0.01rem;" v-if="Median1">
              <p style="color:#606266; font-size: 0.2rem; padding: 0.12rem 0.55rem; border-bottom: #606266 solid 0.01rem;" v-for="(item, index) in Data1" :key="index">{{ item }}</p>
            </div>
            <div style=" border: #606266 solid 0.01rem;" v-if="Median2">
              <p style="color:#606266; font-size: 0.2rem; padding: 0.12rem 0.55rem; border-bottom: #606266 solid 0.01rem;" v-for="(item, index) in Data2" :key="index">{{ item }}</p>
            </div>
            <div style=" border: #606266 solid 0.01rem;" v-if="Median3">
              <p style="color:#606266; font-size: 0.2rem; padding: 0.12rem 0.55rem; border-bottom: #606266 solid 0.01rem;" v-for="(item, index) in Data3" :key="index">{{ item }}</p>
            </div>
            <div style=" border: #606266 solid 0.01rem;" v-if="Median4">
              <p style="color:#606266; font-size: 0.2rem; padding: 0.12rem 0.55rem; border-bottom: #606266 solid 0.01rem;" v-for="(item, index) in Data4" :key="index">{{ item }}</p>
            </div>
          </div>
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
      form:{
        MinimumRange1: '',
        MaximumRange1: '',
        DecimalPrecision1: '',
        DataQuantity1: '',

        MinimumRange2: '',
        MaximumRange2: '',
        DecimalPrecision2: '',
        DataQuantity2: '',

        MinimumRange3: '',
        MaximumRange3: '',
        DecimalPrecision3: '',
        DataQuantity3: '',

        MinimumRange4: '',
        MaximumRange4: '',
        DecimalPrecision4: '',
        DataQuantity4: '',
      },

      //正负值
      // PositiveAndNegativeStates: '',
      Data1: [],
      Data2: [],
      Data3: [],
      Data4: [],

      //计算辅值
      //中位数
      Median1: '',
      Median2: '',
      Median3: '',
      Median4: '',
      //范围
      Range1: '',
      Range2: '',
      Range3: '',
      Range4: '',

      FormNum: 1,
    }
  },
  methods: {
    Go() {
      // console.log(this.MinimumRange);
      // console.log(this.MaximumRange);
      // console.log(this.DecimalPrecision);
      // console.log(this.DataQuantity);
      // console.log(this.PositiveAndNegativeStates);

      for (let i = 1; i <= this.FormNum; i++) {
        this[`Data${i}`]=[];

        if (this.form[`MaximumRange${i}`] <= this.form[`MinimumRange${i}`]) {
          alert('最大值与最小值关系不匹配');
        }

        this[`Median${i}`] = this.form[`MinimumRange${i}`] + (this.form[`MaximumRange${i}`] - this.form[`MinimumRange${i}`])/2;
        this[`Range${i}`] = (this.form[`MaximumRange${i}`] - this.form[`MinimumRange${i}`])/2;
        console.log(this[`Median${i}`]);
        console.log(this[`Range${i}`]);

        if (this.form[`DecimalPrecision${i}`] == '') {
          this.form[`DecimalPrecision${i}`] = 0;
        }else if (this.form[`DecimalPrecision${i}`] < 0) {
          this.form[`DecimalPrecision${i}`] = 0;
        }
        
        // this.Median +- (((Math.random() * 10) * this.Range)/10)
        for (let index = 0; index < this.form[`DataQuantity${i}`]; index++) {
          let RandomRange = (((Math.random() * 10) * this[`Range${i}`])/10); //范围内的随机值
          if (Math.random() * 10 >= 5) {
            this[`Data${i}`].push((this[`Median${i}`] + RandomRange).toFixed(this.form[`DecimalPrecision${i}`]));
          }else{
            this[`Data${i}`].push((this[`Median${i}`] - RandomRange).toFixed(this.form[`DecimalPrecision${i}`]));
          }
        }

      }

    },
  },
  mounted() {
    
  },
  watch: {
    FormNum: {
      //immediate会在初始化的时候就编译一下handler
      immediate: true,
      //开启深度监视
      deep: true,
      //handler,一个回调函数,监听到变化时会自动执行的函数
      handler(newValue,oldValue){
        if (newValue > 4) {
          this.FormNum = 4;
        }
      }
    },
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
  width: 4.6rem;
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