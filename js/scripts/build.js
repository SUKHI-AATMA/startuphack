const fse = require('fs-extra');
const distPath = '/news';
var request = require("request");
var api = 'https://78nd8rko.api.sanity.io/v1/data/query/production?query=*[_type == "news"]';
var fileHtml = '',
    flag = 1,
    today = new Date(),
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
        metatags = `<!-- Primary Meta Tags -->
	    <title>Startup Hack</title>
	    <meta name="title" content="Meta Tags — Preview, Edit and Generate">
	    <meta name="description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!">

	    <!-- Open Graph / Facebook -->
	    <meta property="og:type" content="website">
	    <meta property="og:url" content="https://metatags.io/">
	    <meta property="og:title" content="Meta Tags — Preview, Edit and Generate">
	    <meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!">
	    <meta property="og:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">

	    <!-- Twitter -->
	    <meta property="twitter:card" content="summary_large_image">
	    <meta property="twitter:url" content="https://metatags.io/">
	    <meta property="twitter:title" content="Meta Tags — Preview, Edit and Generate">
	    <meta property="twitter:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!">
	    <meta property="twitter:image" content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png">`,
        loader = `<div class="loader">
	        <div class="loaderCont">
	            <img src="images/loader.gif" alt="Loader" />
	            <p>Loading...</p>
	        </div>
	    </div>`,
        header= `<header>
            <div class="container">
                
                <a href="index.html" class="logo">
                    <img src="images/logo.png" alt="Bacon Buttie" />
                </a>
            </div>

        </header>`,
        footer = `<foooter></foooter>`;
// clear destination folder
fse.emptyDirSync(distPath);

//Meta Data
request({
    url: api,
    json: true
}, function(error, response, body) {
    flag = flag + 1;
    // console.log(flag);
    if (!error && response.statusCode === 200) {
        var jsonDataList = body.result;
        	console.log(response);
        jsonDataList.forEach((jsonData, i) => {
        })
    }
})

// function buildPages() {


// 	pagestart = '';
//     projectsPage += ``;
//     fse.writeFileSync(`projects.html`, projectsPage);

//     sitemap += '</urlset>';

//     fse.writeFileSync(`sitemap.xml`, sitemap);
// }
// var buildInterval = setInterval(function() {
//     if (flag == 5) {
//         // console.log(flag + ' flag')
//         buildPages();
//         clearInterval(buildInterval);
//     }
// }, 1000)