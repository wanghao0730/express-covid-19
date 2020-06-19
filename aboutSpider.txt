//! 加载superagent
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const serve = http.createServer(app);
const url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia';
superagent
  .get(url)
  .then(res => {
    //!res.text就保存了爬取的html文本 在利用cherrio解析html
    // console.log(res.text)
    const $ = cheerio.load(res.text);
    //! 可以利用jquery的语法去获取对应的元素下面的内容了
    //todo 国外疫情情况
    const $getListByCountryTypeService2true = $('#getListByCountryTypeService2true').html();
    //todo 国内疫情
    const $getAreaStat = $('#getAreaStat').html();
    //! $getListByCountryTypeService2true是全国疫情的数据 因为这组数据保存在了window下
    //! 服务端没有window 利用replace替换window 自己创建个对象存储数据
    //!  worldData对象中存世界的数据
    let worldData = {};
    //! 存储中国内陆的数据
    let areaData = {};
    //! 因为拿到数据是字符串 解析字符串代码利用了eval函数 但eval函数不安全
    eval($getListByCountryTypeService2true.replace(/window/g, 'worldData'));
    eval($getAreaStat.replace(/window/g, 'areaData'));
    //! dataObj对象中就存储了getListByCountryTypeService2true这个数组
    //! 存储到json中 这里将dataObj对象转成了json的格式存储
    //! 将dataObj为对象类型的转为JSON存入文件中
    console.log($getListByCountryTypeService2true);
    console.log($getAreaStat);
    fs.writeFile(path.join(__dirname, 'data/world-data.json'), JSON.stringify(worldData), (err) => {
      if (err) {
        throw err;
      }
      console.log('数据写入成功');
    })
    fs.writeFile(path.join(__dirname, 'data/area-data.json'), JSON.stringify(areaData), (err) => {
      if (err) {
        throw err;
      }
      console.log('数据写入成功');
    })
  })
  .catch(err => {
    console.log(err)
  })

app.use('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'data/world-data.json'), (err, data) => {
    if (err) {
      throw err
    }
    //! data为二进制类型 转为字符串发送
    res.send(data.toString());
  })
})
serve.listen(3000)
