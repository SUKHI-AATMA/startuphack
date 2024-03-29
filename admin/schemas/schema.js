// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import news from './news'
import author from './author'
import blockContent from './blockContent'
import blockContentForSocial from './blockContentForSocial'
import youtube from './youtube'
import socialEmbed from './social-embed'
import blockContentForImageVideo from './blockContentForImageVideo'
import multiImageDimension from './multiImageDimension'
import blockContentForMultiDimensionImage from './blockContentForMultiDimensionImage'



// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    news,
    author,
    blockContent,
    blockContentForSocial,
    youtube,
    socialEmbed,
    blockContentForImageVideo,
    multiImageDimension,
    blockContentForMultiDimensionImage
  ])
})
