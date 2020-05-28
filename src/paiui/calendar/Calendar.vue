<template>
  <div class="main">
    <div class="choose_year">
      <div class="icon" @click="chooseYears(-1)">&lt;&lt;</div>
      <div class="icon" @click="chooseMonth(-1)">&lt;</div>
      <div class="date">{{year}}.{{month.toString().padStart(2, '0')}}</div>
      <div class="icon" @click="chooseMonth(1)">&gt;</div>
      <div class="icon" @click="chooseYears(1)">&gt;&gt;</div>
    </div>
    <div class="days_area">
      <div class="day week" v-for="week in weeks" :key="week">{{week}}</div>
      <div class="day" @click="chooseThisDay(day.gregorian)" v-for="(day, index) in days" :key="index" :class="day.type === 0 ? 'invalid_day' : (day.gregorian === today ? 'choose_day' : '')">
        <p>{{day.gregorian}}</p>
        <span>{{day.lunar}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'p-calendar',
  data () {
    return {
      year: 0,
      month: 0,
      today: 0,
      days: [],
      weeks: ['一', '二', '三', '四', '五', '六', '日']
    }
  },

  mounted () {
    const now = new Date()
    this.year = now.getFullYear()
    this.month = now.getMonth()+1
    this.today = now.getDate()
    this.getDays()
  },

  methods: {
    getDays () { // 获取当前月份所有公历日期及其农历日期
      this.days = []
      const time = new Date()
      time.setFullYear(this.year, this.month-1, 0)
      let lastDate = time.getDate()
      for (let i = 0; i < time.getDay(); i++) {
        let t = lastDate-time.getDay() + i+1;
        this.days.push({gregorian: t, lunar: this.getLunarDay(this.year, this.month-1, t),type: 0})
      }
      time.setFullYear(this.year, this.month, 0)
      for (let i = 1; i <= time.getDate(); i++) {
        this.days.push({gregorian: i, lunar: this.getLunarDay(this.year, this.month, i),type: 1})
      }
      let overlength = 42-this.days.length
      for (let i = 1; i <= overlength; i++) {
        this.days.push({gregorian: i, lunar: this.getLunarDay(this.year, this.month+1, i),type: 0})
      }
    },

    chooseYears (state) { // 改变年份
      this.year += state
      this.today = 1
      this.getDays()
    },

    chooseMonth (state) { // 改变月份
      this.month += state
      this.today = 1
      if (this.month < 1) {
        this.month = 12
        this.chooseYears(-1)
      } else if (this.month > 12) {
        this.month = 1
        this.chooseYears(1)
      } else {
        this.getDays()
      }
    },

    chooseThisDay (day) { // 选择某天，主要是考虑可以当时间选择器用
      if (day > 0) {
        this.today = day
      }
    },

    getLunarDay (solarYear, solarMonth, solarDay) { 
      const madd = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
      // const tgString = '甲乙丙丁戊己庚辛壬癸'
      // const dzString = '子丑寅卯辰巳午未申酉戌亥'
      const numString = '一二三四五六七八九十'
      const monString = '正二三四五六七八九十冬腊'
      const CalendarData = 
      [
        0x4AE, 0xA57, 0x50A4D, 0xD26, 0xD95, 0x40D55, 0x56A, 0x9AD, 0x2095D, 0x4AE,   //1910
        0x6149B, 0xA4D, 0xD25, 0x51AA5, 0xB54, 0xD6A, 0x212DA, 0x95B, 0x70937, 0x497, //1920
        0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, //1930
        0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A,   //1940
        0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, //1950
        0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, //1960
        0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D,   //1970
        0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, //1980
        0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, //1990
        0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96,   //2000
        0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, //2010
        0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95, //2020
        0x6AA, 0xAD5, 0x209B5, 0x4B6, 0x614AE, 0xA4E, 0xD26, 0x51D26, 0xD53, 0x5AA,   //2030
        0x30D6A, 0x96D, 0xB095D, 0x4AD, 0xA4D, 0x61A4B, 0xD25, 0xD52, 0x51B54, 0xB5A, //2040
        0x56D, 0x2095B, 0x49B, 0x71497, 0xA4B, 0xAA5, 0x516A5, 0x6D2, 0xADA, 0x30AB6, //2050
        0x937, 0x8092F, 0x497, 0x64B, 0x60D4A, 0xEA5, 0x6B2, 0x4156C, 0xAAE, 0x92E,   //2060
        0x3192E, 0xC96, 0x71A95, 0xD4A, 0xDA5, 0x50B55, 0x56A, 0xA6D, 0x40A5D, 0x52D, //2070
        0x8152B, 0xA95, 0xB4A, 0x616AA, 0xAD5, 0x55A, 0x414BA, 0xA5B, 0x52B, 0x31527, //2080
        0x693, 0x70E53, 0x6AA, 0xAD5, 0x509B5, 0x4B6, 0xA57, 0x40A4E, 0xD26, 0x81D26, //2090
        0xD52, 0xDAA, 0x60D6A, 0x56D, 0x4AE, 0x4149D, 0xA4D, 0xD15, 0x21B25, 0xD52,   //2100
        0x71B52, 0xB5A, 0x55D, 0x5095B, 0x49B, 0xA4B, 0x41A4B, 0xAA5, 0x916A5, 0x6D2, //2110
        0xAD6, 0x60AB6, 0x937, 0x497, 0x40C97, 0x54B, 0x6A5, 0x30DA5, 0x6AA, 0x7156A, //2120
        0xAAD, 0x52E, 0x5192E, 0xA96, 0xD4A, 0x41D4A, 0xD95, 0x90B55, 0x56A, 0xA6D,   //2130
        0x60A5D, 0x52D, 0xA8D, 0x51A95, 0xB2A
      ]
     if (!(solarYear < 1921 || solarYear > 2135)) {
        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11
        const timeArr = [solarYear, solarMonth, solarDay]
        let TheDate = (timeArr.length !== 3) ? new Date() : new Date(timeArr[0], timeArr[1], timeArr[2])
        let total, m, n, k
        let isEnd = false
        let theDateYear = TheDate.getFullYear()
        total = (theDateYear - 1901) * 365 + Math.floor((theDateYear - 1901) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 49
        if (theDateYear % 4 === 0 && TheDate.getMonth() > 1) {
          total++
        }
        for (m = 0; ; m++) {
          k = (CalendarData[m] < 0xfff) ? 11 : 12
          for (n = k; n >= 0; n--) {
            if (total <= this.getBit(CalendarData[m], n)) {
              isEnd = true
              break
            }
            total = total - this.getBit(CalendarData[m], n)
          }
          if (isEnd) {
            break
          }
        }
        //console.log("total:"+total)
        let cMonth, cDay // cYear,
        // cYear = 1921 + m
        cMonth = k - n + 1
        cDay = total
        if (k === 12) {
          if (cMonth === Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth = 1 - cMonth
          }
          if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
            cMonth--
          }
        }
        let run = ''
        let cDayStr = numString.charAt(cDay - 1)
        if (cMonth < 1) {
          run = '闰'
          cMonth = Math.abs(cMonth);
        } 
        if (cDay % 10 !== 0 || cDay === 10) {
          cDayStr = numString.charAt((cDay - 1) % 10)
        }
        return cDay === 1 ? run + monString.charAt(cMonth - 1) + '月' : (cDay < 11 ? '初' : (cDay < 20 ? '十' : (cDay < 21 ? '二十' : (cDay < 30 ? '廿' : '三十')))) + cDayStr 
      }
    },
    getBit (m, n) {
      return 29 + ((m >> n) & 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main{
    width: 450px;
    .choose_year{
      display: flex;
      background-color: #eeeeee;
      .icon{
        width: 10%;
        height: 8vh;
        line-height: 8vh;
        text-align: center;
      }

      .date{
        width: 60%;
        text-align: center;
        height: 8vh;
        line-height: 8vh;
        font-size: 14px;
      }
    }
    .days_area{
      display: flex;
      flex-wrap: wrap;
      .day{
        width: 14.28%;
        text-align: center;
        padding: 1vh 0;
        margin-top: 1vh;
        p{
          margin: 0;
          font-size: 14px;
        }
        span{
          font-size: 14px;
        }
      }
      .week{
        background-color: rgba(37, 143, 248, 0.938);
        color: #fff;
        font-weight: bold;
        height: 6vh;
        line-height: 4vh;
        margin: 0;
      }
      .choose_day{
        background-color: dodgerblue;
        color: #fff;
        font-weight: bold;
      }
      .invalid_day{
        color: #c9c9c9;
      }
    }
  }
</style>

