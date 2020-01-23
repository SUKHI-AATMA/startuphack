const fse = require('fs-extra');
var request = require("request");

const distPath = '/news';

var api = 'https://78nd8rko.api.sanity.io/v1/data/query/production?query=*[_type == "news"]';

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
    loader = `<div class="loader">
            <div class="loaderCont">
                <img src="images/loader.gif" alt="Loader" />
                <p>Loading...</p>
            </div>
        </div>`,
    header = `<header>
            <div class="container">
                
                <a href="index.html" class="logo">
                    <img src="images/logo.png" alt="Bacon Buttie" />
                </a>
            </div>

        </header>`,
    footer = `<foooter></foooter>`,
    pageName = '',
    author = '',
    indexPage = '',
    detailsPage = '';

// clear destination folder
fse.emptyDirSync(distPath);

//Details Page
request({
    url: api,
    auth: {
        'bearer': 'skDDwzoijShoNda8N1faUBHHbUGhiNGSt3fsC9W6DjrKDnw8SSZ9eIkgsNr7YdR6OVaH9yhmPYwTxytrjFgwbrGJrNpNdtjQ1aT1SLzef8njB3ZbyLXFzDQZtAJGmFDQLDDEhoFbZAPoI8yPzmfZuLyppkRPKc8iRd4oNQKi27sRfoDnNJEc'
    },
    json: true
}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        var jsonDataList = body.result;
        jsonDataList.forEach((jsonData, i) => {
            var nTitle = '';
            if (jsonData._type == 'news') {
                var mtImg = '';
                var metaImg = jsonData.metaImage.asset;
                if (metaImg) {
                    mtImg = metaImg._ref;
                }
                var newsTi = jsonData.newsTitle[0].children;
                for(i=0; i<= newsTi.length; i++)
                {
                    var newsTiArr = newsTi;
                    for(j=0; j<= newsTiArr.length-1; j++)
                    {
                        if(newsTiArr[j].text !== '')
                        {
                            nTitle = newsTiArr[j].text;
                            pageName = nTitle.replace(/\s+/g, '-').toLowerCase()
                        }
                    }
                }
                detailsPage += `
                    <!DOCTYPE html>
                    <html lang="en">

                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <link type="text/css" rel="stylesheet" href="css/owl.carousel.css" />
                        <link type="text/css" rel="stylesheet" href="css/style.css" />
                        <link type="text/css" rel="stylesheet" href="css/fullpage.min.css" />
                        <link type="text/css" rel="stylesheet" href="css/media.css" />
                        <link rel="icon" href="images/favicon.ico" type="image/gif" sizes="16x16">
                        <!-- Primary Meta Tags -->
                        <title>Startup Hack</title>
                        <meta name="title" content="` + jsonData.metaTitle + `">
                        <meta name="description" content="` + jsonData.metaDescription + `">
                        <!-- Open Graph / Facebook -->
                        <meta property="og:type" content="website">
                        <meta property="og:url" content="https://leonamunro.co.nz/news/` + pageName + `">
                        <meta property="og:title" content="` + jsonData.metaTitle + `">
                        <meta property="og:description" content="` + jsonData.metaDescription + `">
                        <meta property="og:image" content="` + mtImg + `">
                        <!-- Twitter -->
                        <meta property="twitter:card" content="summary_large_image">
                        <meta property="twitter:url" content="https://metatags.io/">
                        <meta property="twitter:title" content="` + jsonData.metaTitle + `">
                        <meta property="twitter:description" content="` + jsonData.metaDescription + `">
                        <meta property="twitter:image" content="` + mtImg + `">
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
                                        <img src="images/banner1.jpg" alt="Banner" />
                                        <div class="lhs">
                                            <p class="articleName">1968 Chevrolet Corvette Stingray</p>
                                            <p class="sourceName">Source: General Motors</p>
                                        </div>
                                        <div class="rhs">
                                            <p>SHARE THIS ARTICLE</p>
                                            <a href="javascript:;"><img src="images/icon-fb.png" alt="Facebook" /></a>
                                            <a href="javascript:;"><img src="images/icon-linkedin.png" alt="LinkedIn" /></a>
                                            <a href="javascript:;"><img src="images/icon-twitter.png" alt="Twitter" /></a>
                                            <a href="javascript:;"><img src="images/icon-mail.png" alt="Email" /></a>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <h1 class="title">`+nTitle+`</h1>
                                        <h2 class="subtitle">The next generation Chevrolet Corvette is 66 years in the making.</h2>
                                        <p class="authorName">By:
                                            <span>`+author+`</span>
                                        </p>
                                        <p class="articleDate">July 19, 2019, 4:20 PM GMT+5:30</p>
                                        <div class="articleContent">
                                            <p>Ever since the 1950s, Chevrolet’s Corvette has charmed generations of sports-car enthusiasts and
                                                given General Motors Co. a chunk of the <a href="javascript:;">lucrative market</a> segment. Now the classic vehicle is
                                                getting a makeover for the modern era: The stick shift is gone, and a touch screen and an 8-speed
                                                automatic transmission are in.
                                                <br>
                                                <br> While each evolution of what’s known as “America’s sports car” has brought something new to
                                                the game, the latest <a href="javascript:;">incarnation</a> represents the most radical change to date. The engine has been
                                                moved to the middle of the car, behind the driver, who sits almost on top of the front axle.
                                                That gives the car a more aggressive look, better balance and improved handling.
                                                <br>
                                                <br> It remains to be seen whether the new Corvette will appeal to older, core buyers, while also
                                                attracting new fans and wealthy sports-car buffs who currently drive Ferraris and Lamborghinis.
                                                One thing that hasn’t been compromised is speed: The Stingray gets a horsepower boost to 495
                                                from 460. With a performance package, the car will hit 60 miles per hour in under 3 seconds.</p>
                                            <ul>
                                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</li>
                                                <li>Lorem ipsum dolor sit amet, consectetur</li>
                                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Footer -->
                        </div>
                        <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
                        <script type="text/javascript" src="js/fullpage.js"></script>
                        <script type="text/javascript" src="js/common.js"></script>
                    </body>

                    </html>
                `;

                // detailsPage = jsonData[0];    
                fse.writeFileSync(`news/`+pageName+`.html`, detailsPage);
            }


        })
    }
})

//Index
request({
    url: api,
    auth: {
        'bearer': 'skDDwzoijShoNda8N1faUBHHbUGhiNGSt3fsC9W6DjrKDnw8SSZ9eIkgsNr7YdR6OVaH9yhmPYwTxytrjFgwbrGJrNpNdtjQ1aT1SLzef8njB3ZbyLXFzDQZtAJGmFDQLDDEhoFbZAPoI8yPzmfZuLyppkRPKc8iRd4oNQKi27sRfoDnNJEc'
    },
    json: true
}, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        var jsonDataList = body.result;
        // console.log(jsonDataList);
        jsonDataList.forEach((jsonData, i) => {

            if (jsonData._type == 'news') {
                var mtImg = '';
                var metaImg = jsonData.metaImage.asset;
                if (metaImg) {
                    mtImg = metaImg._ref;
                }
                indexPage += ``

                // indexPage = jsonData[0];    
                fse.writeFileSync(`news/index.html`, indexPage);
            }


        })
    }
})