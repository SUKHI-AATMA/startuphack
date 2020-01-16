import React from 'react'

const Preview = ({value}) => {
	const { url } = value
	const id = getYouTubeId(url)
	return (<YouTube videoId={id} />)
}

export default {
    name: 'multiImageDimension',
    title: 'Multi Image Dimensions',
    type: 'object',
    fields: [
        {
            title: 'URL',
            name: 'href',
            type: 'string'
        }
    ],
    preview: {
        select: {
          title: 'href'
        },
        component: Preview
      }
}