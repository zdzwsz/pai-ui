# paiui

> paiui 是flyrise的自定义UI组件，沉淀了多年业务开发的特色，如财务壹贰叁等转换模式，具有农历的日历等。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

使用方法：
npm install paiui

在Vue中，进行引入：
import paiui from 'paiui'
Vue.use(paiui)

标签：
<p-calendar></p-calendar>
编码规范：
1、所有的标签以p + “-” + 英文单词命名。
2、如果是两个单词，是采用-来连接。
3、源代码在paiui目录下，每个控件建一个文件夹，文件夹名词是标签的没有“p”的名称。
4、每一个控件建立一个index.js文件
5、所有控件最终汇总到paiui/index目录中。
