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
  const imageDimension_Big = 'https://cdn.sanity.io/images/78nd8rko/production/' + imageActualName + '.' + imageExtension + '?w=1920&fit=max';
  const imageDimension_Med = 'https://cdn.sanity.io/images/78nd8rko/production/' + imageActualName + '.' + imageExtension + '?w=960&fit=max';
  const imageDimension_Small = 'https://cdn.sanity.io/images/78nd8rko/production/' + imageActualName + '.' + imageExtension + '?w=425&h=590&fit=max';

  
  return (
    <div>
    <img src={imageDimension_Big} alt="" style={{width: '100%', display: 'block', marginBottom: '10px'}} />
    <img src={imageDimension_Med} alt="" style={{width: '50%', display: 'block', marginBottom: '10px'}} />
    <img src={imageDimension_Small} alt="" style={{width: '30%', display: 'block', marginBottom: '10px'}} />

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