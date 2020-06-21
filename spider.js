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
    //todo 实时播报
    const $getTimelineService1 = $('#getTimelineService1').html();
    console.log($getTimelineService1);
    //! 存储国外疫情的数据 使用
    let worldData = {};
    //! 存储中国内陆的数据
    let areaData = {};
    //! 实时播报数据
    let timeService = {}
    eval($getListByCountryTypeService2true.replace(/window/g, 'worldData'));
    eval($getAreaStat.replace(/window/g, 'areaData'))
    eval($getTimelineService1.replace(/window/g, 'timeService'));
    // console.log($getListByCountryTypeService2true);
    //! 写入到存储世界疫情数据的json中
    fs.writeFile(path.join(__dirname, 'data/world-data.json'), JSON.stringify(worldData), (err) => {
      if (err) {
        throw err;
      }
      console.log('数据写入成功');
    })
    //! 写入到存储国内疫情数据的json中
    fs.writeFile(path.join(__dirname, 'data/area-data.json'), JSON.stringify(areaData), (err) => {
      if (err) {
        throw err;
      }
      console.log('数据写入成功');
    })
    //! 将实时播报数据写入 json
    fs.writeFile(path.join(__dirname, 'data/time-service.json'), JSON.stringify(timeService), (err) => {
      if (err) {
        throw err;
      }
      console.log('数据写入成功');
    })
  })
  .catch(err => {
    console.log(err)
  })

serve.listen(3000)
