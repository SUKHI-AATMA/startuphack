var previewURL="";

if(location.protocol.indexOf("https") == -1) {
    previewURL = "http://localhost:7889";
}
else {
    previewURL = "https://startuphack-staging.netlify.com";
}


export default function resolveProductionUrl(document) {
    return `${previewURL}/preview-v2.html#${document._id}`
}

