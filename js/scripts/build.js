const fse = require('fs-extra');
var request = require("request");

const distPath = '/news';

var apiNews = 'https://78nd8rko.api.sanity.io/v1/data/query/production?query=*[_type == "news"] | order(_createdAt desc)';
var apiAll = 'https://78nd8rko.api.sanity.io/v1/data/query/production?query=* | order(_createdAt desc)';

var today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
    timestamp = '' + date + 'T' + time + '+00:00',
    sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <;urlset; xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"; xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"; xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
        <!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->
        <url>
            <loc>/</loc>
            <lastmod>` + timestamp + `</lastmod>
            <priority>1.00</priority>
        </url>
        <url>
            <loc>/about.html</loc>
            <lastmod>` + timestamp + `</lastmod>
            <priority>0.80</priority>
        </url>`,
    loader = `<!--<div class="loader">
            <div class="loaderCont">
                <img class="lazy" data-src="images/loader.gif" alt="Loader" />
                <p>Loading...</p>
            </div>
        </div>-->`,
    header = `<!--<header>
            <div class="container">
                
                <a href="index.html" class="logo">
                    <img class="lazy" data-src="images/logo.png" alt="Bacon Buttie" />
                </a>
            </div>
        </header>-->`,
    footer = `<!--<footer></footer>-->`,
    pageName = '',
    author = '',
    indexPage = '',
    detailsPage = '',
    newsArr = [],
    allQueryResult;

// clear destination folder
fse.emptyDirSync(distPath);

//News Arr Page
// request({
//     url: apiNews,
//     auth: {
//         'bearer': 'skDDwzoijShoNda8N1faUBHHbUGhiNGSt3fsC9W6DjrKDnw8SSZ9eIkgsNr7YdR6OVaH9yhmPYwTxytrjFgwbrGJrNpNdtjQ1aT1SLzef8njB3ZbyLXFzDQZtAJGmFDQLDDEhoFbZAPoI8yPzmfZuLyppkRPKc8iRd4oNQKi27sRfoDnNJEc'
//     },
//     json: true
// }, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var jsonDataList = body.result;
//         jsonDataList.forEach((jsonData, i) => {
//             newsArr = jsonData;
//             console.log(newsArr);
//         });
//     }
// });

//Details Page
request({
    url: apiAll,
    auth: {
        'bearer': 'skDDwzoijShoNda8N1faUBHHbUGhiNGSt3fsC9W6DjrKDnw8SSZ9eIkgsNr7YdR6OVaH9yhmPYwTxytrjFgwbrGJrNpNdtjQ1aT1SLzef8njB3ZbyLXFzDQZtAJGmFDQLDDEhoFbZAPoI8yPzmfZuLyppkRPKc8iRd4oNQKi27sRfoDnNJEc'
    },
    json: true
}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        var jsonDataList = body.result;
        allQueryResult = jsonDataList;
        var mImg;
        jsonDataList.forEach((jsonData, i) => {
            var nTitle = '';
            // console.log(jsonData._type);
            // if(jsonData._type == 'sanity.imageAsset')
            // {
            //     // console.log(123)
            // }
            if (jsonData._type == 'news') {
                var pageContent = '';
                var mtImg = '';
                var metaImg = jsonData.metaImage.asset;
                var authorName = '';
                newsArr.push(jsonData);
                if (metaImg) {
                    mtImg = metaImg._ref;
                    mImg = imageAssetPath(jsonDataList, mtImg);
                }
                var newsTi = jsonData.newsTitle[0].children;
                for (i = 0; i <= newsTi.length; i++) {
                    var newsTiArr = newsTi;
                    for (j = 0; j <= newsTiArr.length - 1; j++) {
                        if (newsTiArr[j].text !== '') {
                            nTitle = newsTiArr[j].text;
                            pageName = nTitle.replace(/\s+/g, '-').toLowerCase()
                        }
                    }
                }
                var marks = [
                    "code",
                    "strong",
                    "em",
                    "underline",
                    "strike-through"
                ]
                for (var bc = 0; bc <= jsonData.bodyCopy.length - 1; bc++) {
                    var bcc = '';
                    var bcctxt = '';
                    var carouselData = '';
                    if (jsonData.bodyCopy[bc].children) {
                        bcc = jsonData.bodyCopy[bc].children;
                        bcctxt = bcc;
                    }
                    if (jsonData.bodyCopy[bc].asset) {
                        bcc = jsonData.bodyCopy[bc].asset;
                    }
                    // console.log('----------')
                    // console.log(bcctxt)
                    // console.log('----------')
                    if (jsonData.bodyCopy[bc]._type == 'block' && !jsonData.bodyCopy[bc].listItem) {
                        if (bcc) {
                            if (bcctxt.text != '' || bcctxt.text != undefined) {
                                // console.log(bcctxt.text);
                                pageContent += '<p>';
                                if (bcctxt.length > 0) {
                                    for (var bcctxtL = 0; bcctxtL <= bcctxt.length - 1; bcctxtL++) {
                                        if (bcctxt[bcctxtL].marks) {
                                            if (bcctxt[bcctxtL].marks.length == 0) {
                                                // console.log(1234);
                                                pageContent += bcctxt[bcctxtL].text;
                                            }
                                            if (bcctxt[bcctxtL].marks.length != 0) {
                                                // console.log(123456789);
                                                // pageContent += '<span class="'+bcctxt[bcctxtL].marks[mk]+'+">'+ bcctxt[bcctxtL].text+'</span>';
                                                var marksClasses = '';
                                                for (var mk = 0; mk <= bcctxt[bcctxtL].marks.length - 1; mk++) {
                                                    if (!marks.includes(marks)) {
                                                        // console.log(1243);
                                                        marksClasses += bcctxt[bcctxtL].marks[mk] + ' ';
                                                        // pageContent += '<span class="'+bcctxt[bcctxtL].marks[mk]+'+">'+ bcctxt[bcctxtL].text+'</span>';
                                                    }
                                                }
                                                pageContent += '<span class="' + marksClasses + '">' + bcctxt[bcctxtL].text + '</span>';
                                            }
                                        }
                                        // console.log();
                                    }
                                }
                                pageContent += '</p>'
                            }
                        }
                    }
                    if (jsonData.bodyCopy[bc]._type == 'image') {
                        if (bcc) {
                            pageContent += '<img class="lazy" data-src="' + bcc._ref + '" alt="">';
                        }
                    }
                    if (jsonData.bodyCopy[bc]._type == 'socialEmbed' && jsonData.bodyCopy[bc].socialEmbedCode) {
                        pageContent += jsonData.bodyCopy[bc].socialEmbedCode;
                    }
                    if (jsonData.bodyCopy[bc].listItem == 'bullet' || jsonData.bodyCopy[bc].listItem == 'number') {
                        if (bcc) {
                            if (jsonData.bodyCopy[bc].listItem == 'bullet') {
                                pageContent += '<p class="ul-level-' + jsonData.bodyCopy[bc].level + '">' + bcc[0].text + '</p>'
                            }
                            if (jsonData.bodyCopy[bc].listItem == 'number') {
                                pageContent += '<p class="ol-level-' + jsonData.bodyCopy[bc].level + '">' + bcc[0].text + '</p>'
                            }
                        }
                        // listParent += jsonData.bodyCopy[bc].listItem == 'bullet' ? '</ul>' : '</ol>';
                    }

                    if (jsonData.image) {
                        // console.log('0');
                        for (ic = 0; ic <= jsonData.image.length - 1; ic++) {
                            // console.log(jsonData.metaTitle);
                            if (jsonData.image[ic]._type == 'youtube') {

                                // console.log(1)

                                ytubeId = fetchYtubeId(jsonData.image[ic].url);
                                // console.log(ytubeId);
                                 carouselData += '<amp-youtube data-videoid="'+ytubeId+'" layout="responsive" width="1210" height="800"> <div fallback>   <p>The video could not be loaded.</p> </div></amp-youtube>'
                                // carouselData += '<iframe width="100%" height="800" src="' + jsonData.image[ic].url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                            }
                            if (jsonData.image[ic]._type == 'image') {
                                // console.log(2)
                                var BimgP = jsonData.image[ic].asset._ref;
                                var BimgPa = imageAssetPath(jsonDataList, BimgP);
                                // carouselData += '<img class="lazy" data-src="' + BimgPa + '" alt="Banner" />';
                                carouselData += '<amp-img src="' + BimgPa + '" width="1210" height="801" layout="responsive" alt="Banner"></amp-img>';
                            }


                            // console.log('----------');
                            // console.log(carouselData);
                        }
                        // var imageCarousel = 
                        // banner = `<div class="carousel">
                        //             <img class="lazy" data-src="images/banner1.jpg" alt="Banner" />
                        //             <img class="lazy" data-src="images/banner2.jpg" alt="Banner" />
                        //             <img class="lazy" data-src="images/banner3.gif" alt="Banner" />
                        //             <iframe width="100%" height="800" src="https://www.youtube.com/embed/T5sr9HsArhk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        //                 allowfullscreen></iframe>
                        //         </div>`;
                    }
                    if (jsonData.author) {
                        var authorRef = jsonData.author._ref;
                        authorName = fetchAuthor(jsonDataList, authorRef);
                        // console.log(authorName);
                    }

                }
                detailsPage += `
                    <!DOCTYPE html>
                    <html ⚡ lang="en">

                    <head>
                        <link rel="canonical" href="` + pageName + `">
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <!--<link type="text/css" rel="stylesheet" href="/css/owl.carousel.css" />
                        <link type="text/css" rel="stylesheet" href="/css/style.css" />
                        <link type="text/css" rel="stylesheet" href="/css/fullpage.min.css" />-->
                        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700,800|Open+Sans:300,400,600,700&display=swap" rel="stylesheet">
                        <style amp-custom>/* *  Owl Carousel - Animate Plugin*/.owl-carousel .animated {-webkit-animation-duration: 1000ms;animation-duration: 1000ms;-webkit-animation-fill-mode: both;animation-fill-mode: both;}.owl-carousel .owl-animated-in {z-index: 0;}.owl-carousel .owl-animated-out {z-index: 1;}.owl-carousel .fadeOut {-webkit-animation-name: fadeOut;animation-name: fadeOut;}@-webkit-keyframes fadeOut {0% {opacity: 1;}100% {opacity: 0;}}@keyframes fadeOut {0% {opacity: 1;}100% {opacity: 0;}}/* *     Owl Carousel - Auto Height Plugin*/.owl-height {-webkit-transition: height 500ms ease-in-out;-moz-transition: height 500ms ease-in-out;-ms-transition: height 500ms ease-in-out;-o-transition: height 500ms ease-in-out;transition: height 500ms ease-in-out;}/* *  Core Owl Carousel CSS File*/.owl-carousel {display: none;width: 100%;-webkit-tap-highlight-color: transparent;/* position relative and z-index fix webkit rendering fonts issue */position: relative;z-index: 1;}.bannerWrapper .owl-carousel {display: none;width: 100%;-webkit-tap-highlight-color: transparent;/* position relative and z-index fix webkit rendering fonts issue */position: relative;z-index: 0;}.owl-carousel .owl-stage {position: relative;-ms-touch-action: pan-Y;}.owl-carousel .owl-stage:after {content: ".";display: block;clear: both;visibility: hidden;line-height: 0;height: 0;}.owl-carousel .owl-stage-outer {position: relative;overflow: hidden;/* fix for flashing background */-webkit-transform: translate3d(0px, 0px, 0px);}.bannerWrapper .owl-carousel .owl-stage-outer {/*position: relative;*/overflow: hidden;/* fix for flashing background */-webkit-transform: translate3d(0px, 0px, 0px);}.owl-carousel .owl-controls .owl-nav .owl-prev,.owl-carousel .owl-controls .owl-nav .owl-next,.owl-carousel .owl-controls .owl-dot {cursor: pointer;cursor: hand;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.owl-carousel.owl-loaded {display: block;}.owl-carousel.owl-loading {opacity: 0;display: block;}.owl-carousel.owl-hidden {opacity: 0;}.owl-carousel .owl-refresh .owl-item {display: none;}.owl-carousel .owl-item {position: relative;min-height: 1px;float: left;-webkit-backface-visibility: hidden;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}.owl-carousel .owl-item img {/*display: block;width: 100%;-webkit-transform-style: preserve-3d;*/}.owl-carousel.owl-text-select-on .owl-item {-webkit-user-select: auto;-moz-user-select: auto;-ms-user-select: auto;user-select: auto;}.owl-carousel .owl-grab {cursor: move;cursor: -webkit-grab;cursor: -o-grab;cursor: -ms-grab;cursor: grab;}.owl-carousel.owl-rtl {direction: rtl;}.owl-carousel.owl-rtl .owl-item {float: right;}/* No Js */.no-js .owl-carousel {display: block;}/* *  Owl Carousel - Lazy Load Plugin*/.owl-carousel .owl-item .owl-lazy {opacity: 0;-webkit-transition: opacity 400ms ease;-moz-transition: opacity 400ms ease;-ms-transition: opacity 400ms ease;-o-transition: opacity 400ms ease;transition: opacity 400ms ease;}.owl-carousel .owl-item img {transform-style: preserve-3d;}/* *  Owl Carousel - Video Plugin*/.owl-carousel .owl-video-wrapper {position: relative;height: 100%;background: #000;}.owl-carousel .owl-video-play-icon {position: absolute;height: 80px;width: 80px;left: 50%;top: 50%;margin-left: -40px;margin-top: -40px;background: url("owl.video.play.png") no-repeat;cursor: pointer;z-index: 1;-webkit-backface-visibility: hidden;-webkit-transition: scale 100ms ease;-moz-transition: scale 100ms ease;-ms-transition: scale 100ms ease;-o-transition: scale 100ms ease;transition: scale 100ms ease;}.owl-carousel .owl-video-play-icon:hover {-webkit-transition: scale(1.3, 1.3);-moz-transition: scale(1.3, 1.3);-ms-transition: scale(1.3, 1.3);-o-transition: scale(1.3, 1.3);transition: scale(1.3, 1.3);}.owl-carousel .owl-video-playing .owl-video-tn,.owl-carousel .owl-video-playing .owl-video-play-icon {display: none;}.owl-carousel .owl-video-tn {opacity: 0;height: 100%;background-position: center center;background-repeat: no-repeat;-webkit-background-size: contain;-moz-background-size: contain;-o-background-size: contain;background-size: contain;-webkit-transition: opacity 400ms ease;-moz-transition: opacity 400ms ease;-ms-transition: opacity 400ms ease;-o-transition: opacity 400ms ease;transition: opacity 400ms ease;}.owl-carousel .owl-video-frame {position: relative;z-index: 1;}.owl-controls {text-align: center}.owl-next.disabled,.owl-prev.disabled {opacity: 0.2;cursor: default;}body,p,input,button,textarea {font-family: 'Montserrat', sans-serif;font-weight: 400;}h1,h2,h3,h4,h5,h6,strong {font-family: 'Montserrat', sans-serif;font-weight: 400;}p,input,textarea,button,a,li,label {font-size: 1.8rem;line-height: 1.4;}/* Assign Font Properties - END */html {font-size: 62.5%;}body {font-family: 'Montserrat', sans-serif;font-weight: 400;overflow: hidden;}* {margin: 0;padding: 0;outline: none;list-style: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);border: none;-webkit-border-radius: 0;-moz-border-radius: 0;-ms-border-radius: 0;border-radius: 0;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-o-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;-ms-text-size-adjust: 100%;-webkit-font-smoothing: antialiased;}a {text-decoration: none;outline: none;}a:hover {text-decoration: none;}img {border: none;max-width: 100%;vertical-align: top;border: none;}html {width: 100%;overflow-x: hidden;-webkit-text-size-adjust: 100%;}p,.ul,h1,h2,h3,h4,h5,h6 {padding-bottom: 5px;}h1,h2,h3,h4,h5,h6 {line-height: 1;}h1 {font-size: 5rem;}h2 {font-size: 3.3rem;font-weight: normal;}h3 {font-size: 2rem;}h3 a,h4 a,h5 a,h6 a {font-size: inherit;text-decoration: underline;}table,table tr td,table tr th {border: none;}table {border-collapse: collapse;border-spacing: 0;}input,textarea {outline: none;}article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,section,summary,mark {float: left;width: 100%;}.fl {float: left;}.fr {float: right;}input[type=submit],input[type=button],button[type=submit] {-webkit-appearance: none;-moz-appearance: none;appearance: none;cursor: pointer;outline: none;}::-moz-selection {background: #fff;color: #0a0c12;}::selection {background: #fff;color: #0a0c12;}input::-webkit-input-placeholder {color: #b6b6b6;}/* Grid CSS - START */.span2 {width: 50%;padding: 0 15px;float: left;}.span3 {width: 33.3%;padding: 0 15px;float: left;position: relative;}.span4 {width: 25%;padding: 0 15px;float: left;}.span5 {width: 20%;padding: 0 15px;float: left;}.span40 {width: 40%;padding: 0 15px;float: left;}.span60 {width: 60%;padding: 0 15px;float: left;}.span6 {width: 66.6%;padding: 0 15px;float: left;}.span8 {width: 75%;padding: 0 15px;float: left;}.span9 {width: 80%;padding: 0 15px;float: left;}.span10 {width: 90%;padding: 0 15px;float: left;}.span12 {width: 100%;padding: 0 15px;float: left;}.centered {position: relative;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);z-index: 1;}/* Grid CSS - END */select {-webkit-appearance: none;-moz-appearance: none;text-indent: 1px;-o-text-overflow: '';text-overflow: '';}.container {width: 100%;margin: 0 auto;padding: 0 40px;max-width: 1440px;position: relative;}.container {width: 100%;max-width: 1210px;margin: 0 auto;padding: 0;}.wrapper {width: 100%;float: left;overflow: hidden;background-color: #0a0c12;}p {color: #fff;}p.smallTxt {font-size: 1.8rem;font-family: 'Montserrat', sans-serif;font-weight: 700;}p.bigTitle {font-size: 10rem;line-height: 9rem;font-family: 'Montserrat', sans-serif;font-weight: 800;padding: 50px 0;}p.introCopy {font-size: 2.2rem;}.section1 .fp-tableCell {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}.section1 .lftSec,.section1 .rgtSec {position: relative;width: 50%;}.section1 .rgtSec {padding: 30px 50px 60px;}.section1 .lftSec {height: 100%;overflow: hidden;}.section1 .lftSec img {height: 100%;max-width: none;position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);width: auto;}.section1 p {color: #fff;}.section1 p.smallTxt {font-size: 1.8rem;font-family: 'Montserrat', sans-serif;font-weight: 700;}.section1 p.bigTitle {font-size: 10rem;line-height: 9rem;font-family: 'Montserrat', sans-serif;font-weight: 800;padding: 50px 0;}.section1 p.introCopy {font-size: 2.2rem;}.section1 .button {background-color: #d8d8d8;color: #000;padding: 20px 50px;font-size: 2.6rem;font-family: 'Montserrat', sans-serif;font-weight: 800;float: left;margin-top: 30px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-ms-border-radius: 3px;border-radius: 3px;}.section2 {/*background: url("../images/section2-bg.jpg") 0 0 no-repeat;*/padding: 20px;}.section2 .bigTitle {color: #fff;font-size: 12rem;line-height: 10rem;font-family: 'Montserrat', sans-serif;font-weight: 800;}.section2 .transpTxt {-webkit-text-fill-color: transparent;-webkit-text-stroke-width: 2px;-webkit-text-stroke-color: #fff;}.section2 .smallTxt {color: #fff;padding: 30px 0 0 0;font-size: 2.2rem;}.section3 .fp-tableCell {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}.section3 .lftSec,.section3 .rgtSec {position: relative;width: 50%;}.section3 .lftSec {padding: 30px 50px 60px;}.section3 .lftSec .bigTitle {font-size: 5rem;color: #fff;font-family: 'Montserrat', sans-serif;font-weight: 800;line-height: 4.5rem;}.section3 .lftSec .smallTxt {font-size: 2.2rem;color: #fff;padding: 40px 0;}.section3 .rgtSec {/*    background: url("../images/section3-img.jpg") right 0 no-repeat;background-size: cover;*/height: 100%;overflow: hidden;}.section3 .rgtSec img {height: 100%;max-width: none;position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);width: auto;}.button {background-color: #d8d8d8;color: #000;padding: 15px 30px;font-size: 2.6rem;font-family: 'Montserrat', sans-serif;font-weight: 800;float: left;-webkit-border-radius: 3px;-moz-border-radius: 3px;-ms-border-radius: 3px;border-radius: 3px;}.section4 .threeColumnLayout {max-width: 1400px;margin: 0 auto;}.section4 ul {display: -webkit-box;display: -ms-flexbox;display: flex;-ms-flex-pack: distribute;justify-content: space-around;-ms-flex-item-align: center;align-self: center;}.section4 ul li {max-height: 600px;min-height: 600px;overflow: hidden;position: relative;width: 30%;}.section4 ul li:before {content: "";position: absolute;left: 0;top: 0;width: 100%;height: 100%;background-color: rgba(3, 72, 142, 0.5);z-index: 1;}.section4 ul li img {height: 100%;max-width: none;/*transform: translate(-25%, 0px);*/width: auto;}.section4 ul li .articleDetail {position: absolute;bottom: 20px;width: 100%;padding: 10px;z-index: 2;}.section4 ul li h2 {color: #fff;text-align: center;margin-bottom: 10px;}.section4 ul li .button {position: relative;float: left;left: 50%;transform: translateX(-50%);-webkit-transform: translateX(-50%);-moz-transform: translateX(-50%);-ms-transform: translateX(-50%);-o-transform: translateX(-50%);clear: both;}.section5 .fp-tableCell {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}.section5 .lftSec,.section5 .rgtSec {position: relative;width: 50%;}.section5 .rgtSec {padding: 30px 30px 30px 60px;}.section5 .rgtSec .bigTitle {font-size: 5rem;color: #fff;font-family: 'Montserrat', sans-serif;font-weight: 800;line-height: 4.5rem;}.section5 .rgtSec .smallTxt {font-size: 2.2rem;color: #fff;padding: 40px 0;}.section5 .lftSec {/*background: url("../images/section3-img.jpg") right 0 no-repeat;background-size: cover;*/height: 100%;overflow: hidden;}.section5 .lftSec img {height: 100%;max-width: none;position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);transform: translate(-50%, -50%);width: auto;}.innerpage * {color: #fff;}.innerpage .articleDetail {margin: 50px 0;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;}.innerpage .articleDetail .banner .articleName {padding: 0 0 5px 0;font-size: 1.4rem;}.innerpage .articleDetail .banner img {width: 100%;}.innerpage .articleDetail .banner .owl-nav {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;}.innerpage .articleDetail .banner .owl-nav>* {padding: 10px 5px;font-size: 1.4rem;text-transform: capitalize;}.innerpage .articleDetail .banner .sourceName {font-size: 1.2rem;}.innerpage .articleDetail .banner .lhs {padding-top: 10px;width: 60%;float: left;}.innerpage .articleDetail .banner .rhs {padding-top: 10px;width: auto;float: right;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;}.innerpage .articleDetail .banner .rhs p {margin-right: 10px;font-size: 1.4rem;}.innerpage .articleDetail .banner .rhs a {margin: 0 5px;}.innerpage .articleDetail h1 {padding: 40px 0 5px 0;}.innerpage .articleDetail h2 {font-size: 2.6rem;padding-bottom: 20px;}.innerpage .articleDetail .content {float: left;}.innerpage .articleDetail .authorName {font-size: 1.6rem;}.innerpage .articleDetail .articleDate {font-size: 1.4rem;}.innerpage .articleDetail .articleContent {padding: 20px 0 0 0;}.innerpage .articleDetail .articleContent p,.innerpage .articleDetail .articleContent a {font-size: 1.6rem;}.innerpage .articleDetail .articleContent a {text-decoration: underline;}.innerpage .articleDetail .articleContent ul {display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-ms-flex-direction: column;flex-direction: column;margin: 20px 0;}.innerpage .articleDetail .articleContent ul li {font-size: 1.6rem;list-style: disc inside;padding: 3px 0;}

                        #custom-button .amp-carousel-button-prev {
      left: 5%;
      background-image: url('https://amp.dev/static/samples/img/carousel-arrow-left.png');
    }
    #custom-button .amp-carousel-button-next {
      right: 5%;
      background-image: url('https://amp.dev/static/samples/img/carousel-arrow-right.png');
    }</style>
                        <!--<link type="text/css" rel="stylesheet" href="/css/media.css" />-->
                        <!--<link rel="icon" href="/images/favicon.ico" type="image/gif" sizes="16x16">-->
                        <!-- Primary Meta Tags -->
                        <title>Startup Hack</title>
                        <meta name="title" content="` + jsonData.metaTitle + `">
                        <meta name="description" content="` + jsonData.metaDescription + `">
                        <!-- Open Graph / Facebook -->
                        <meta property="og:type" content="website">
                        <meta property="og:url" content="https://leonamunro.co.nz/news/` + pageName + `">
                        <meta property="og:title" content="` + jsonData.metaTitle + `">
                        <meta property="og:description" content="` + jsonData.metaDescription + `">
                        <meta property="og:image" content="` + mImg + `">
                        <!-- Twitter -->
                        <meta property="twitter:card" content="summary_large_image">
                        <meta property="twitter:url" content="https://metatags.io/">
                        <meta property="twitter:title" content="` + jsonData.metaTitle + `">
                        <meta property="twitter:description" content="` + jsonData.metaDescription + `">
                        <meta property="twitter:image" content="` + mImg + `">
                        <script async src="https://cdn.ampproject.org/v0.js"></script>
                        <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
                        <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>
                        <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
                        <script type="application/ld+json">
                        {
                         "@context": "http://schema.org",
                         "@type": "NewsArticle",
                         "mainEntityOfPage":{
                           "@type":"WebPage",
                           "@id":"/` + pageName + `.html"
                         },
                         "headline": "` + jsonData.metaTitle + `",
                         "image": {
                           "@type": "ImageObject",
                           "url": "` + mImg + `",
                           "height": 1200,
                           "width": 800
                         },
                         "datePublished": "2015-02-05T08:00:00+08:00",
                         "dateModified": "2015-02-05T09:20:00+08:00",
                         "author": {
                           "@type": "Person",
                           "name": "` + authorName + `"
                         },
                         "publisher": {
                           "@type": "Organization",
                           "name": "⚡ Startup Hack",
                           "logo": {
                             "@type": "ImageObject",
                             "url": "https://example.com/amptimes_logo.jpg",
                             "width": 600,
                             "height": 60
                           }
                         },
                         "description": "` + jsonData.metaDescription + `"
                        }
                        </script>
                        <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>

    <script async custom-element="amp-addthis" src="https://cdn.ampproject.org/v0/amp-addthis-0.1.js"></script>
                    </head>

                    <body>
                        <amp-analytics type="googleanalytics">
                        <script type="application/json">
                        {
                          "vars": {
                            "account": "UA-YYYY-Y"
                          },
                          "triggers": {
                            "default pageview": {
                              "on": "visible",
                              "request": "pageview",
                              "vars": {
                                "title": "Name of the Article"
                              }
                            }
                          }
                        }
                        </script>
                        </amp-analytics>
                        <!-- Loader -->
                        ` + loader + `
                        <div class="wrapper innerpage">
                            <!-- Header -->
                            ` + header + `
                            <div class="articleDetail">
                                <div class="container">
                                    <div class="banner">
                                        <amp-carousel layout="fixed-height" height="800" type="carousel" >`+carouselData+`</amp-carousel>
                                        <div class="lhs">
                                            <p class="articleName">1968 Chevrolet Corvette Stingray</p>
                                            <p class="sourceName">Source: General Motors</p>
                                        </div>
                                        <div class="rhs">
                                            <p>SHARE THIS ARTICLE</p>
                                            <amp-addthis width="320" height="92"  data-pub-id="ra-5e46671b42d1d869" data-widget-id="d5fd" data-widget-type="inline"></amp-addthis>
                                            <!--<a href="javascript:;"><img class="lazy" data-src="/images/icon-fb.png" alt="Facebook" /></a>
                                            <a href="javascript:;"><img class="lazy" data-src="/images/icon-linkedin.png" alt="LinkedIn" /></a>
                                            <a href="javascript:;"><img class="lazy" data-src="/images/icon-twitter.png" alt="Twitter" /></a>
                                            <a href="javascript:;"><img class="lazy" data-src="/images/icon-mail.png" alt="Email" /></a>-->
                                        </div>
                                    </div>
                                    <div class="content">
                                        <h1 class="title">` + nTitle + `</h1>
                                        <h2 class="subtitle">The next generation Chevrolet Corvette is 66 years in the making.</h2>
                                        <p class="authorName">By:
                                            <span>` + authorName + `</span>
                                        </p>
                                        <p class="articleDate">` + jsonData.publishedDate + `</p>
                                        <div class="articleContent">
                                            ` + pageContent + `
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Footer -->
                        </div>
                        <!--<script type="text/javascript" src="/js/jquery-3.3.1.min.js"></script>
                        <script type="text/javascript" src="/js/fullpage.js"></script>
                        <script type="text/javascript" src="/js/owl.carousel.js"></script>
                        <script type="text/javascript" src="/js/common.js"></script>-->
                        <!-- Go to www.addthis.com/dashboard to customize your tools 
                        <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5e46671b42d1d869"></script>-->
                        
                    </body>

                    </html>
                `;

                // detailsPage = jsonData[0];    
                fse.writeFileSync(`news/` + pageName + `.html`, detailsPage);
                detailsPage = '';
            }


        })
        // console.log(newsArr);
        indexPg(allQueryResult);
    }
})

var sections = '';

function indexPg(allQueryResult) {
    var seq = 0;
    var threeNews = '';
    newsArr.forEach(function(jsonData, i) {
        // if (jsonData._type == 'news')// && jsonData._id == "581b0646-3c74-49fc-84d4-5a737b1f981a" 
        // {
        var titleText = '';
        if (jsonData.newsTitle) {
            // titleText += '<div class="bigTitle">';
            for (var nt = 0; nt <= jsonData.newsTitle.length; nt++) {
                if (jsonData.newsTitle[nt]) {
                    var classContent = jsonData.newsTitle[nt].style !== 'smallTxt' ? 'bigTitle ' + jsonData.newsTitle[nt].style : jsonData.newsTitle[nt].style;
                    (seq == 2 || seq == 3 || seq == 4) ? titleText += '<h2>': titleText += '<p class="' + classContent + '">';
                    for (var ntc = 0; ntc <= jsonData.newsTitle[nt].children.length; ntc++) {
                        var texting = jsonData.newsTitle[nt].children[ntc];
                        // console.log(jsonData.newsTitle[nt].children);
                        if (texting) {
                            var titletxt = texting.text.replace(/[\r\n]+/g, "<br>")
                            // console.log(titletxt);
                            // console.log('-----------------------------');
                            titleText += titletxt;
                        }
                    }
                    (seq == 2 || seq == 3 || seq == 4) ? titleText += '</h2>': titleText += '</p>';
                    // titleText += '</p>';
                    // titleText += '</p>';
                }
            }
            // titleText += '</div>';
            // console.log(titleText);
        }
        if (jsonData.bodyCopy) {
            var introTxt = '';
            for (var bc = 0; bc <= jsonData.bodyCopy.length - 1; bc++) {
                var bcc = '',
                    bcctxt = '',
                    carouselData = '';
                if (jsonData.bodyCopy[bc].children) {
                    bcc = jsonData.bodyCopy[bc].children;
                    bcctxt = bcc;
                }
                if (jsonData.bodyCopy[bc].asset) {
                    bcc = jsonData.bodyCopy[bc].asset;
                }
                if (jsonData.bodyCopy[bc]._type == 'block' && !jsonData.bodyCopy[bc].listItem) {
                    if (bcc) {
                        if (bcctxt.text != '' || bcctxt.text != undefined) {
                            // console.log(bcctxt.text);
                            introTxt += '<p class="introCopy">';
                            if (bcctxt.length > 0) {
                                for (var bcctxtL = 0; bcctxtL <= bcctxt.length - 1; bcctxtL++) {
                                    if (bcctxt[bcctxtL].marks) {
                                        if (bcctxt[bcctxtL].marks.length == 0) {
                                            // console.log(1234);
                                            introTxt += bcctxt[bcctxtL].text;
                                        }
                                        if (bcctxt[bcctxtL].marks.length != 0) {
                                            // console.log(123456789);
                                            // introTxt += '<span class="'+bcctxt[bcctxtL].marks[mk]+'+">'+ bcctxt[bcctxtL].text+'</span>';
                                            var marksClasses = '';
                                            for (var mk = 0; mk <= bcctxt[bcctxtL].marks.length - 1; mk++) {
                                                if (!marks.includes(marks)) {
                                                    // console.log(1243);
                                                    marksClasses += bcctxt[bcctxtL].marks[mk] + ' ';
                                                    // introTxt += '<span class="'+bcctxt[bcctxtL].marks[mk]+'+">'+ bcctxt[bcctxtL].text+'</span>';
                                                }
                                            }
                                            introTxt += '<span class="' + marksClasses + '">' + bcctxt[bcctxtL].text + '</span>';
                                        }
                                    }
                                    // console.log();
                                }
                            }
                            introTxt += '</p>'
                            // console.log(introTxt);
                            // console.log('--------');
                        }
                    }
                }
            }
        }
        var hmbim = '';
        if (jsonData.hmbImage) {
            // console.log(jsonData.hmbImage.asset._ref);
            var hmbi = jsonData.hmbImage.asset._ref;

            if (hmbi) {
                // hmbim = jsonData.hmbImage.asset._ref;
                hmbimg = imageAssetPath(allQueryResult, hmbi);
            }
            // console.log(hmbimg);
        }

        if (seq == 0) //(jsonData.bannerStyle  && jsonData.bannerStyle == 'full-column')
        {
            // console.log('Full page section');
            sections += `<!-- Section2 - START -->
                                <section class="slides section2" style='background: url("` + hmbimg + `") 0 0 no-repeat; background-size: cover;'><a href="/news/` + pageName + `.html">
                                    ` + titleText + introTxt + `</a>

                                </section>
                                <!-- Section2 - END -->`;
        }
        if (seq == 1) //(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-left')
        {
            // console.log('two-column-image-left');
            sections += `<!-- Section1 - START -->
                                <section class="slides section1"><a href="/news/` + pageName + `.html">
                                    <div class="lftSec">
                                        <img class="lazy" data-src="` + hmbimg + `" alt="` + jsonData.metaTitle + `" />
                                    </div>
                                    <div class="rgtSec">
                                        ` + titleText + introTxt + `
                                        
                                        <!--<a href="javascript:;" class="button">GRAB YOUR TICKET</a>-->
                                    </div></a>
                                </section>
                                <!-- Section1 - END -->`;
        }
        if (seq == 2 || seq == 3 || seq == 4) //(jsonData.bannerStyle  && jsonData.bannerStyle == 'three-column')
        {
            threeNews += `<li><a href="/news/` + pageName + `.html">
                                <img class="lazy" data-src="` + hmbimg + `?rect=0,0,425,590&fit=max" alt="` + jsonData.metaTitle + `" />
                                <div class="articleDetail">
                                    ` + titleText + `
                                    <!--<a href="javascript:;" class="button">READ MORE</a>-->
                                </div>
                                </a>
                            </li>`;

            // console.log(seq);
            // console.log(threeNews);

        }
        if (seq == 4) {
            // console.log(threeNews);

            sections += `<!-- Section4 - START -->
                                <section class="slides section4"><a href="/news/` + pageName + `.html">
                                    <div class="threeColumnLayout">
                                        <ul>
                                        ` + threeNews + `
                                            
                                        </ul>
                                    </div>
                                    </a>
                                </section>
                                <!-- Section4 - END -->`;
        }
        if (seq == 5) //(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-right')
        {
            // console.log('two-column-image-right');
            sections += `<!-- Section3 - START -->
                                <section class="slides section3">
                                <a href="/news/` + pageName + `.html">
                                    <div class="lftSec">
                                        ` + titleText + introTxt + `
                                        <!--<a href="javascript:;" class="button">BROWSE OUR EVENTS</a>-->
                                    </div>
                                    <div class="rgtSec">
                                        <img class="lazy" data-src="` + hmbimg + `" alt="` + jsonData.metaTitle + `">
                                    </div>
                                    </a>
                                </section>
                                <!-- Section3 - END -->`;
        }
        (i == 6) ? (seq = 0) : (seq++);
        // console.log(seq);
        // console.log(i);
        // if()
        // }
        indexPage += `<!DOCTYPE html>
                            <html lang="en">

                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>Startup Hack</title>
                                <link type="text/css" rel="stylesheet" href="/css/owl.carousel.css" />
                                <link type="text/css" rel="stylesheet" href="/css/style.css" />
                                <link type="text/css" rel="stylesheet" href="/css/fullpage.min.css" />
                                <!--<link type="text/css" rel="stylesheet" href="/css/media.css" />-->
                                <!--<link rel="icon" href="/images/favicon.ico" type="image/gif" sizes="16x16">-->
                                <!-- Primary Meta Tags -->
                                <title>Startup Hack</title>
                                <meta name="title" content="Startup Hack">
                                <meta name="description" content="Your Daily dose of startup news">
                                <!-- Open Graph / Facebook -->
                                <meta property="og:type" content="website">
                                <meta property="og:url" content="https://leonamunro.co.nz/">
                                <meta property="og:title" content="Startup Hack">
                                <meta property="og:description" content="Your Daily dose of startup news">
                                <meta property="og:image" content="">
                                <!-- Twitter -->
                                <meta property="twitter:card" content="summary_large_image">
                                <meta property="twitter:url" content="https://metatags.io/">
                                <meta property="twitter:title" content="Startup Hack">
                                <meta property="twitter:description" content="Your Daily dose of startup news">
                                <meta property="twitter:image" content="">
                            </head>

                            <body>
                                ` + loader + `
                                <div class="wrapper homepage">
                                    ` + header + `
                                    <div class="sectionWrapper">
                                        ` + sections + `
                                    </div>
                                </div>

                                <script type="text/javascript" src="/js/jquery-3.3.1.min.js"></script>
                                <script type="text/javascript" src="/js/fullpage.js"></script>
                                <script type="text/javascript" src="/js/common.js"></script>
                            </body>

                            </html>`;

        // indexPage = jsonData[0];
        // console.log(jsonData);
        fse.writeFileSync(`index.html`, indexPage);
        indexPage = '';
        // }     
    });

}

function imageAssetPath(jD, imgID) {
    var imgPath = '';
    jD.forEach((jsData, i) => {
        // console.log(imgID);
        var imd = imgID;
        if (jsData._type == 'sanity.imageAsset') {
            if (jsData._id == imd) {
                imgPath = jsData.url;
            }
        }
    })
    return imgPath;
}

function fetchAuthor(jD, refId) {
    var authorName = '';
    jD.forEach((jsData, i) => {
        // console.log(imgID);
        var rId = refId;
        if (jsData._type == 'author') {
            if (jsData._id == rId) {
                authorName = jsData.name;
            }
        }
    });
    return authorName;
}

function fetchYtubeId(yurl) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = yurl.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}