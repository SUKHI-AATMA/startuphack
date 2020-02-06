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
                                carouselData += '<iframe width="100%" height="800" src="' + jsonData.image[ic].url + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                            }
                            if (jsonData.image[ic]._type == 'image') {
                                // console.log(2)
                                var BimgP = jsonData.image[ic].asset._ref;
                                var BimgPa = imageAssetPath(jsonDataList, BimgP);
                                carouselData += '<img class="lazy" data-src="' + BimgPa + '" alt="Banner" />';
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
                    <html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <link type="text/css" rel="stylesheet" href="/css/owl.carousel.css" />
                        <link type="text/css" rel="stylesheet" href="/css/style.css" />
                        <link type="text/css" rel="stylesheet" href="/css/fullpage.min.css" />
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
                    </head>

                    <body>
                        <!-- Loader -->
                        ` + loader + `
                        <div class="wrapper innerpage">
                            <!-- Header -->
                            ` + header + `
                            <div class="articleDetail">
                                <div class="container">
                                    <div class="banner">
                                        <div class="carousel">` + carouselData + `</div>
                                        <div class="lhs">
                                            <p class="articleName">1968 Chevrolet Corvette Stingray</p>
                                            <p class="sourceName">Source: General Motors</p>
                                        </div>
                                        <div class="rhs">
                                            <p>SHARE THIS ARTICLE</p>
                                            <a href="javascript:;"><img class="lazy" data-src="/images/icon-fb.png" alt="Facebook" /></a>
                                            <a href="javascript:;"><img class="lazy" data-src="/images/icon-linkedin.png" alt="LinkedIn" /></a>
                                            <a href="javascript:;"><img class="lazy" data-src="/images/icon-twitter.png" alt="Twitter" /></a>
                                            <a href="javascript:;"><img class="lazy" data-src="/images/icon-mail.png" alt="Email" /></a>
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
                        <script type="text/javascript" src="/js/jquery-3.3.1.min.js"></script>
                        <script type="text/javascript" src="/js/fullpage.js"></script>
                        <script type="text/javascript" src="/js/owl.carousel.js"></script>
                        <script type="text/javascript" src="/js/common.js"></script>
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
//Index
// request({
//     url: apiAll,
//     auth: {
//         'bearer': 'skDDwzoijShoNda8N1faUBHHbUGhiNGSt3fsC9W6DjrKDnw8SSZ9eIkgsNr7YdR6OVaH9yhmPYwTxytrjFgwbrGJrNpNdtjQ1aT1SLzef8njB3ZbyLXFzDQZtAJGmFDQLDDEhoFbZAPoI8yPzmfZuLyppkRPKc8iRd4oNQKi27sRfoDnNJEc'
//     },
//     json: true
// }, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var jsonDataList = body.result;
//         // console.log(jsonDataList);
//         jsonDataList.forEach((jsonData, i) => {

//             if (jsonData._type == 'news')// && jsonData._id == "581b0646-3c74-49fc-84d4-5a737b1f981a" 
//             {

//                 var titleText = '';
//                 if(jsonData.newsTitle)
//                 {
//                     // titleText += '<div class="bigTitle">';
//                     for(var nt = 0; nt <= jsonData.newsTitle.length; nt++)
//                     {
//                         if(jsonData.newsTitle[nt])
//                         {
//                             var classContent = jsonData.newsTitle[nt].style !== 'smallTxt' ? 'bigTitle '+jsonData.newsTitle[nt].style : jsonData.newsTitle[nt].style;
//                             titleText += '<p class="'+classContent+'">';
//                             for(var ntc = 0; ntc <= jsonData.newsTitle[nt].children.length; ntc++)
//                             {
//                                 var texting = jsonData.newsTitle[nt].children[ntc];
//                                 // console.log(jsonData.newsTitle[nt].children);
//                                 if(texting)
//                                 {
//                                     var titletxt = texting.text.replace(/[\r\n]+/g,"<br>")
//                                     // console.log(titletxt);
//                                     // console.log('-----------------------------');
//                                     titleText += titletxt;
//                                 }
//                             }
//                             titleText += '</p>';
//                         }
//                     }
//                     // titleText += '</div>';
//                     // console.log(titleText);
//                 }
//                 var hmbim = '';
//                 if(jsonData.hmbImage)
//                 {
//                     // console.log(jsonData.hmbImage.asset._ref);
//                     var hmbi = jsonData.hmbImage.asset._ref;

//                     if(hmbi) {
//                         // hmbim = jsonData.hmbImage.asset._ref;
//                         hmbimg = imageAssetPath(jsonDataList, hmbi);
//                     }
//                     // console.log(hmbimg);
//                 }
//                 if(jsonData.bannerStyle  && jsonData.bannerStyle == 'full-column')
//                 {
//                     // console.log('Full page section');
//                     sections += `<!-- Section2 - START -->
//                                     <section class="slides section2" style='background: url("`+hmbimg+`") 0 0 no-repeat; background-size: cover;'>
//                                         `+titleText+`
//                                     </section>
//                                     <!-- Section2 - END -->`;
//                 }
//                 if(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-left')
//                 {
//                     // console.log('two-column-image-left');
//                     sections += `<!-- Section1 - START -->
//                                     <section class="slides section1">
//                                         <div class="lftSec">
//                                             <img class="lazy" data-src="`+hmbimg+`" alt="`+jsonData.metaTitle+`" />
//                                         </div>
//                                         <div class="rgtSec">
//                                             `+titleText+`

//                                             <a href="javascript:;" class="button">GRAB YOUR TICKET</a>
//                                         </div>
//                                     </section>
//                                     <!-- Section1 - END -->`;
//                 }
//                 if(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-right')
//                 {
//                     // console.log('two-column-image-right');
//                     sections += `<!-- Section3 - START -->
//                                     <section class="slides section3">
//                                         <div class="lftSec">
//                                             `+titleText+`
//                                             <a href="javascript:;" class="button">BROWSE OUR EVENTS</a>
//                                         </div>
//                                         <div class="rgtSec">
//                                             <img class="lazy" data-src="`+hmbimg+`" alt="`+jsonData.metaTitle+`">
//                                         </div>
//                                     </section>
//                                     <!-- Section3 - END -->`;
//                 }
//                 if(jsonData.bannerStyle  && jsonData.bannerStyle == 'three-column')
//                 {
//                     // console.log('three-column');
//                     sections += `<!-- Section4 - START -->
//                                     <section class="slides section4">
//                                         <div class="threeColumnLayout">
//                                             <ul>
//                                                 <li>
//                                                     <img class="lazy" data-src="`+hmbimg+`?rect=0,0,425,590&fit=max" alt="`+jsonData.metaTitle+`" />
//                                                     <div class="articleDetail">
//                                                         `+titleText+`
//                                                         <a href="javascript:;" class="button">READ MORE</a>
//                                                     </div>
//                                                 </li>
//                                                 <li>
//                                                     <img class="lazy" data-src="`+hmbimg+`?rect=0,0,425,590&fit=max" alt="`+jsonData.metaTitle+`" />
//                                                     <div class="articleDetail">
//                                                         `+titleText+`
//                                                         <a href="javascript:;" class="button">READ MORE</a>
//                                                     </div>
//                                                 </li>
//                                                 <li>
//                                                     <img class="lazy" data-src="`+hmbimg+`?rect=0,0,425,590&fit=max" alt="`+jsonData.metaTitle+`" />
//                                                     <div class="articleDetail">
//                                                         `+titleText+`
//                                                         <a href="javascript:;" class="button">READ MORE</a>
//                                                     </div>
//                                                 </li>
//                                             </ul>
//                                         </div>
//                                     </section>
//                                     <!-- Section4 - END -->`;
//                 }
//                 // }
//                 indexPage += `<!DOCTYPE html>
//                                 <html lang="en">

//                                 <head>
//                                     <meta charset="UTF-8">
//                                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                                     <meta http-equiv="X-UA-Compatible" content="ie=edge">
//                                     <title>Startup Hack</title>
//                                     <link type="text/css" rel="stylesheet" href="/css/owl.carousel.css" />
//                                     <link type="text/css" rel="stylesheet" href="/css/style.css" />
//                                     <link type="text/css" rel="stylesheet" href="/css/fullpage.min.css" />
//                                     <!--<link type="text/css" rel="stylesheet" href="/css/media.css" />-->
//                                     <!--<link rel="icon" href="/images/favicon.ico" type="image/gif" sizes="16x16">-->
//                                     <!-- Primary Meta Tags -->
//                                     <title>Startup Hack</title>
//                                     <meta name="title" content="Startup Hack">
//                                     <meta name="description" content="Your Daily dose of startup news">
//                                     <!-- Open Graph / Facebook -->
//                                     <meta property="og:type" content="website">
//                                     <meta property="og:url" content="https://leonamunro.co.nz/">
//                                     <meta property="og:title" content="Startup Hack">
//                                     <meta property="og:description" content="Your Daily dose of startup news">
//                                     <meta property="og:image" content="">
//                                     <!-- Twitter -->
//                                     <meta property="twitter:card" content="summary_large_image">
//                                     <meta property="twitter:url" content="https://metatags.io/">
//                                     <meta property="twitter:title" content="Startup Hack">
//                                     <meta property="twitter:description" content="Your Daily dose of startup news">
//                                     <meta property="twitter:image" content="">
//                                 </head>

//                                 <body>
//                                     ` + loader + `
//                                     <div class="wrapper homepage">
//                                         ` + header + `
//                                         <div class="sectionWrapper">
//                                             `+sections+`
//                                         </div>
//                                     </div>

//                                     <script type="text/javascript" src="/js/jquery-3.3.1.min.js"></script>
//                                     <script type="text/javascript" src="/js/fullpage.js"></script>
//                                     <script type="text/javascript" src="/js/common.js"></script>
//                                 </body>

//                                 </html>`;

//                 // indexPage = jsonData[0];
//                 // console.log(jsonData);
//                 fse.writeFileSync(`news/index.html`, indexPage);
//                 indexPage = '';
//             }


//         })
//     }
// })
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
                    (seq == 2 || seq == 3 || seq == 4) ? titleText += '<h2>' : titleText += '<p class="' + classContent + '">';
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
                    (seq == 2 || seq == 3 || seq == 4) ? titleText += '</h2>' : titleText += '</p>';
                    // titleText += '</p>';
                    // titleText += '</p>';
                }
            }
            // titleText += '</div>';
            // console.log(titleText);
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
                                <section class="slides section2" style='background: url("` + hmbimg + `") 0 0 no-repeat; background-size: cover;'>
                                    ` + titleText + `
                                </section>
                                <!-- Section2 - END -->`;
        }
        if (seq == 1) //(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-left')
        {
            // console.log('two-column-image-left');
            sections += `<!-- Section1 - START -->
                                <section class="slides section1">
                                    <div class="lftSec">
                                        <img class="lazy" data-src="` + hmbimg + `" alt="` + jsonData.metaTitle + `" />
                                    </div>
                                    <div class="rgtSec">
                                        ` + titleText + `
                                        
                                        <!--<a href="javascript:;" class="button">GRAB YOUR TICKET</a>-->
                                    </div>
                                </section>
                                <!-- Section1 - END -->`;
        }
        if (seq == 2 || seq == 3 || seq == 4) //(jsonData.bannerStyle  && jsonData.bannerStyle == 'three-column')
        {
            threeNews += `<li>
                                <img class="lazy" data-src="` + hmbimg + `?rect=0,0,425,590&fit=max" alt="` + jsonData.metaTitle + `" />
                                <div class="articleDetail">
                                    ` + titleText + `
                                    <!--<a href="javascript:;" class="button">READ MORE</a>-->
                                </div>
                            </li>`;

            // console.log(seq);
            // console.log(threeNews);

        }
        if (seq == 4) {
            // console.log(threeNews);

            sections += `<!-- Section4 - START -->
                                <section class="slides section4">
                                    <div class="threeColumnLayout">
                                        <ul>
                                        ` + threeNews + `
                                            
                                        </ul>
                                    </div>
                                </section>
                                <!-- Section4 - END -->`;
        }
        if (seq == 5) //(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-right')
        {
            // console.log('two-column-image-right');
            sections += `<!-- Section3 - START -->
                                <section class="slides section3">
                                    <div class="lftSec">
                                        ` + titleText + `
                                        <!--<a href="javascript:;" class="button">BROWSE OUR EVENTS</a>-->
                                    </div>
                                    <div class="rgtSec">
                                        <img class="lazy" data-src="` + hmbimg + `" alt="` + jsonData.metaTitle + `">
                                    </div>
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