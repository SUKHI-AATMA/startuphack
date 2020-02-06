const fse = require('fs-extra');
var request = require("request");

const distPath = '/news';

var apiNews = 'https://78nd8rko.api.sanity.io/v1/data/query/production?query=*[_type == "news"]';
var apiAll = 'https://78nd8rko.api.sanity.io/v1/data/query/production?query=*';

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
                <img src="images/loader.gif" alt="Loader" />
                <p>Loading...</p>
            </div>
        </div>-->`,
    header = `<!--<header>
            <div class="container">
                
                <a href="index.html" class="logo">
                    <img src="images/logo.png" alt="Bacon Buttie" />
                </a>
            </div>
        </header>-->`,
    footer = `<!--<footer></footer>-->`,
    pageName = '',
    author = '',
    indexPage = '',
    detailsPage = '';

// clear destination folder
fse.emptyDirSync(distPath);



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
                if (metaImg) {
                    mtImg = metaImg._ref;
                    mImg = imageAssetPath(jsonDataList, mtImg);
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
                var marks = [
                    "code",
                    "strong",
                    "em",
                    "underline",
                    "strike-through"
                ]
                for(var bc = 0; bc <= jsonData.bodyCopy.length-1; bc++)
                {
                    var bcc = '';
                    var bcctxt = '';
                    var carouselData = ''; 
                    if(jsonData.bodyCopy[bc].children)
                    {
                        bcc = jsonData.bodyCopy[bc].children;   
                        bcctxt = bcc;
                    }
                    if(jsonData.bodyCopy[bc].asset)
                    {
                        bcc = jsonData.bodyCopy[bc].asset;
                    }
                    // console.log('----------')
                    // console.log(bcctxt)
                    // console.log('----------')
                    if(jsonData.bodyCopy[bc]._type == 'block' && !jsonData.bodyCopy[bc].listItem)
                    {
                        if(bcc)
                        {
                            if(bcctxt.text != '' || bcctxt.text != undefined )
                            {
                                // console.log(bcctxt.text);
                                pageContent += '<p>';
                                if(bcctxt.length>0)
                                {
                                    for (var bcctxtL = 0; bcctxtL <= bcctxt.length - 1; bcctxtL++) {
                                        if(bcctxt[bcctxtL].marks)
                                        {
                                            if(bcctxt[bcctxtL].marks.length == 0)
                                            {
                                                // console.log(1234);
                                                pageContent += bcctxt[bcctxtL].text;
                                            }
                                            if(bcctxt[bcctxtL].marks.length != 0)
                                            {
                                                // console.log(123456789);
                                                // pageContent += '<span class="'+bcctxt[bcctxtL].marks[mk]+'+">'+ bcctxt[bcctxtL].text+'</span>';
                                                var marksClasses = '';
                                                for(var mk = 0; mk <= bcctxt[bcctxtL].marks.length-1; mk++)
                                                {
                                                    if(!marks.includes(marks) )
                                                    {
                                                        // console.log(1243);
                                                        marksClasses += bcctxt[bcctxtL].marks[mk] + ' ';
                                                        // pageContent += '<span class="'+bcctxt[bcctxtL].marks[mk]+'+">'+ bcctxt[bcctxtL].text+'</span>';
                                                    }
                                                }
                                                pageContent += '<span class="'+marksClasses+'">'+ bcctxt[bcctxtL].text+'</span>';
                                            }
                                        }
                                        // console.log();
                                    }
                                }
                                pageContent += '</p>'
                            }
                        }
                    }
                    if(jsonData.bodyCopy[bc]._type == 'image')
                    {
                        if(bcc)
                        {
                            pageContent += '<img src="'+bcc._ref+'" alt="">';
                        }
                    }
                    if(jsonData.bodyCopy[bc]._type == 'socialEmbed' && jsonData.bodyCopy[bc].socialEmbedCode)
                    {
                        pageContent += jsonData.bodyCopy[bc].socialEmbedCode;
                    }
                    if(jsonData.bodyCopy[bc].listItem == 'bullet' || jsonData.bodyCopy[bc].listItem == 'number')
                    {
                        if(bcc)
                        {
                            if (jsonData.bodyCopy[bc].listItem == 'bullet') {
                                pageContent += '<p class="ul-level-'+jsonData.bodyCopy[bc].level+'">'+bcc[0].text+'</p>'
                            }
                            if (jsonData.bodyCopy[bc].listItem == 'number') {
                                pageContent += '<p class="ol-level-'+jsonData.bodyCopy[bc].level+'">'+bcc[0].text+'</p>'
                            }
                        }
                        // listParent += jsonData.bodyCopy[bc].listItem == 'bullet' ? '</ul>' : '</ol>';
                    }

                    if(jsonData.image)
                    {
                        // console.log('0');
                        for (ic = 0; ic <= jsonData.image.length -1; ic++)
                        {
                                // console.log(jsonData.metaTitle);
                            if(jsonData.image[ic]._type == 'youtube'){
                                // console.log(1)
                                carouselData += '<iframe width="100%" height="800" src="'+jsonData.image[ic].url+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                            }
                            if(jsonData.image[ic]._type == 'image')
                            {
                                // console.log(2)
                                var BimgP = jsonData.image[ic].asset._ref;
                                var BimgPa =imageAssetPath(jsonDataList, BimgP);
                                carouselData += '<img src="'+BimgPa+'" alt="Banner" />';
                            }

                            // console.log('----------');
                            // console.log(carouselData);
                        }
                        // var imageCarousel = 
                        // banner = `<div class="carousel">
                        //             <img src="images/banner1.jpg" alt="Banner" />
                        //             <img src="images/banner2.jpg" alt="Banner" />
                        //             <img src="images/banner3.gif" alt="Banner" />
                        //             <iframe width="100%" height="800" src="https://www.youtube.com/embed/T5sr9HsArhk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        //                 allowfullscreen></iframe>
                        //         </div>`;
                    }
                    if(jsonData.author)
                    {
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
                                        <div class="carousel">`+carouselData+`</div>
                                        <div class="lhs">
                                            <p class="articleName">1968 Chevrolet Corvette Stingray</p>
                                            <p class="sourceName">Source: General Motors</p>
                                        </div>
                                        <div class="rhs">
                                            <p>SHARE THIS ARTICLE</p>
                                            <a href="javascript:;"><img src="/images/icon-fb.png" alt="Facebook" /></a>
                                            <a href="javascript:;"><img src="/images/icon-linkedin.png" alt="LinkedIn" /></a>
                                            <a href="javascript:;"><img src="/images/icon-twitter.png" alt="Twitter" /></a>
                                            <a href="javascript:;"><img src="/images/icon-mail.png" alt="Email" /></a>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <h1 class="title">`+nTitle+`</h1>
                                        <h2 class="subtitle">The next generation Chevrolet Corvette is 66 years in the making.</h2>
                                        <p class="authorName">By:
                                            <span>`+authorName+`</span>
                                        </p>
                                        <p class="articleDate">`+jsonData.publishedDate+`</p>
                                        <div class="articleContent">
                                            `+pageContent+`
                                            
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
                fse.writeFileSync(`news/`+pageName+`.html`, detailsPage);
                detailsPage = '';
            }


        })
    }
})

//Index
request({
    url: apiAll,
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
                var sections = '';
                if (metaImg) {
                    mtImg = metaImg._ref;
                }
                // console.log(jsonData.bannerStyle);
                if (jsonData._type == 'news') 
                {
                    if(jsonData.bannerStyle  && jsonData.bannerStyle == 'full-column')
                    {
                        if(jsonData.newsTitle)
                        {
                            // console.log(jsonData.newsTitle.children);
                            for(var nt = 0; nt <= jsonData.newsTitle[0].children.length; nt++)
                            {
                                console.log(jsonData.newsTitle[0].children)
                            }
                        }
                        // console.log('Full page section');
                        sections += `<!-- Section2 - START -->
                                        <section class="slides section2">
                                            <p class="transpTxt bigTitle">NOTHING
                                                <br> NORMAL EVER</p>
                                            <p class="bigTitle">CHANGED
                                                <br> THE WORLD.</p>
                                            <p class="smallTxt">BUT A COMMUNITY OF WORLD-CONQUERING
                                                <br> ENTREPRENEURS JUST MIGHT.</p>
                                        </section>
                                        <!-- Section2 - END -->`;
                    }
                    if(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-left')
                    {
                        // console.log('two-column-image-left');
                        sections += `<!-- Section1 - START -->
                                        <section class="slides section1">
                                            <div class="lftSec">
                                                <img src="images/startup-event-img.jpg" alt="Startup Event" />
                                            </div>
                                            <div class="rgtSec">
                                                <p class="smallTxt">LOREM HELSININKI - NOV 21-22, 2019</p>
                                                <p class="bigTitle">THE
                                                    <br> WORLD'S
                                                    <br> LEADING
                                                    <br> STARTUP
                                                    <br> EVENT.
                                                </p>
                                                <p class="introCopy">Just a little gathering of 25,000 changemakers,
                                                    <br> including 4,000 startups and 2,000 investors.</p>
                                                <a href="javascript:;" class="button">GRAB YOUR TICKET</a>
                                            </div>
                                        </section>
                                        <!-- Section1 - END -->`;
                    }
                    if(jsonData.bannerStyle  && jsonData.bannerStyle == 'two-column-image-right')
                    {
                        // console.log('two-column-image-right');
                        sections += `<!-- Section3 - START -->
                                        <section class="slides section3">
                                            <div class="lftSec">
                                                <p class="bigTitle">MAKING
                                                    <br> ENTREPRENEURIAL
                                                    <br> WAVES AT HOMR AND
                                                    <br> AWAY.
                                                </p>
                                                <p class="smallTxt">Lorem has grown from a single gathering in Helsinki to a series of events organized all around the world.
                                                    We throw bigger events in Finland, Japan, and China, and smaller get-togethers around the globe,
                                                    from Singapore to NYC. Wherever they happen, our events aim at equipping founders to solve the most
                                                    meaningful problems of our time.</p>
                                                <a href="javascript:;" class="button">BROWSE OUR EVENTS</a>
                                            </div>
                                            <div class="rgtSec">
                                                <img src="/images/section3-img.jpg" alt="">
                                            </div>
                                        </section>
                                        <!-- Section3 - END -->`;
                    }
                    if(jsonData.bannerStyle  && jsonData.bannerStyle == 'three-column')
                    {
                        // console.log('three-column');
                        sections += `<!-- Section4 - START -->
                                        <section class="slides section4">
                                            <div class="threeColumnLayout">
                                                <ul>
                                                    <li>
                                                        <img src="images/section4-img.jpg" />
                                                        <div class="articleDetail">
                                                            <h2>FOR STARTUPS</h2>
                                                            <a href="javascript:;" class="button">READ MORE</a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <img src="images/section4-img.jpg" />
                                                        <div class="articleDetail">
                                                            <h2>FOR STARTUPS</h2>
                                                            <a href="javascript:;" class="button">READ MORE</a>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <img src="images/section4-img.jpg" />
                                                        <div class="articleDetail">
                                                            <h2>FOR STARTUPS</h2>
                                                            <a href="javascript:;" class="button">READ MORE</a>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                        <!-- Section4 - END -->`;
                    }
                }
                
                indexPage += ``

                // indexPage = jsonData[0];
                // console.log(jsonData);
                fse.writeFileSync(`news/index.html`, indexPage);
            }


        })
    }
})
function imageAssetPath(jD, imgID) {
    var imgPath = '';
    jD.forEach((jsData, i) => {
        // console.log(imgID);
        var imd = imgID;
        if(jsData._type == 'sanity.imageAsset')
        {
            if(jsData._id == imd)
            {
                imgPath = jsData.url;
            }
        }
    })
    return imgPath;
}
function fetchAuthor(jD, refId)
{
    var authorName = '';
    jD.forEach((jsData, i) => {
        // console.log(imgID);
        var rId = refId;
        if(jsData._type == 'author')
        {
            if(jsData._id == rId)
            {
                authorName = jsData.name;
            }
        }
    });
    return authorName;
}