import React from 'react'

// const previewImage = props  => (<pre>{JSON.stringify(props, null, 2)}</pre>);
const previewImage = ({value})  => {
  if(!value.file || !value.file.asset || !value.file.asset._ref) {
    return false;
  }

  const imageName = value.file.asset._ref;
  const imageNameFirstIndex = imageName.substr(imageName.indexOf("-") + 1);
  const imageNameLastIndex = imageNameFirstIndex.substr(0, imageNameFirstIndex.lastIndexOf("-"));
  const imageActualName = imageNameLastIndex;
  const imageExtension = imageName.substr(imageName.lastIndexOf("-") + 1, imageName.length);
  //const imagePath = 'https://cdn.sanity.io/images/78nd8rko/production/' + imageNameFirstIndex + '.' + imageNameLastIndex + '?w=1000&h=1000&fit=max';
  const imageDimension_Big = 'https://cdn.sanity.io/images/78nd8rko/production/' + imageActualName + '.' + imageExtension + '?w=1000&h=1000&fit=max';
  const imageDimension_Med = 'https://cdn.sanity.io/images/78nd8rko/production/' + imageActualName + '.' + imageExtension + '?w=500&h=500&fit=max';
  const imageDimension_Small = 'https://cdn.sanity.io/images/78nd8rko/production/' + imageActualName + '.' + imageExtension + '?w=300&h=300&fit=max';

  
  return (
    <div>
    <img src={imageDimension_Big} alt="" />
    <img src={imageDimension_Med} alt="" />
    <img src={imageDimension_Small} alt="" />
    </div>
  );
};

export default {
    name: 'multiImageDimension',
    title: 'Multi Image Dimensions',
    type: 'object',
    fields: [
        {
            title: 'URL',
            name: 'url',
            type: 'image'
        }
    ],
    preview: {
        select: {
          file: 'url',
        },
        component: previewImage
      }
}