export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'postTitle',
      title: 'Post Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Banner',
      type: 'blockContentForImageVideo'
    },
    {
      name: 'bannerStyle',
      title: 'Banner Style',
      type: 'string',
      options: {
        list: [
          {title: 'Full Column', value: 'full-column'},
          {title: 'Two Column Image on Right', value: 'two-column-image-right'},
          {title: 'Two Column Image on Left', value: 'two-column-image-left'},
          {title: 'Three Column', value: 'three-column'}
        ],
        layout: 'dropdown'
      }
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string'
    },
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text'
    },
    {
      name: 'metaImage',
      title: 'Meta Image',
      type: 'image'
    },
    {
      name: 'newsTitle',
      title: 'Title',
      type: 'blockContent'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string'
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date'
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string'
    },
    {
      name: 'bodyCopy',
      title: 'Body Copy',
      type: 'blockContent'
    },
    {
      name: 'twitterEmbedCode',
      title: 'Embed Twitter',
      type: 'blockContentForSocial'
    },
    {
      name: 'instagramEmbedCode',
      title: 'Embed Instagram',
      type: 'blockContentForSocial'
    }
  ]
}