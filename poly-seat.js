// ==UserScript==
// @name         my-polyt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://blpw.polyt.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    let data = {
        showId,
        sectionId,
        theaterId
    }
    $.ajax({
        url: _ctx+ '/chooseSeat/openArea',
        method: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8' ,
        data: data,
        dataType: 'json',
        success: function(res) {
            let price = gankT(res.data);
            console.log('price', price)
        },
        error: function(err) {
            console.log('错误', err)
        }
    })
    function gankT(data){
        let priceList = data.priceList;
        let ticketList = data.seatList;
        ticketList.sort((a, b) => a.y - b.y)
        let betterT = getBetterT(ticketList);
        function getPrice(ticket){
            for(let i = 0; i < priceList.length - 1; i++){
                if(priceList[i].ticketPriceId == ticket.pid){
                    return priceList[i].price
                }
            }
        }
        return getPrice(betterT);
    }
    function getBetterT(data) {
        let midTArr = []
        data.forEach(item => {
            if(item.x == 44) midTArr.push(data.indexOf(item))
        })
        let flag = midTArr.length
        let recursive = function() {
            let haft = flag >> 1;
            for(let i = haft; i < midTArr.length - 1; i++){
                for(let j = midTArr[i]; j < midTArr[i] + 7; j++){
                    if(data[j].sst.id == 0) return data[j]
                }
                for(let j = midTArr[i]; j < midTArr[i] - 7; j--){
                    if(data[j].sst.id == 0) return data[j]
                }
            }
            flag = haft;
            recursive();
        }
        return recursive()
    }
})();