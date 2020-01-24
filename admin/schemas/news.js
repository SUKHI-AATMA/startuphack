export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
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
      type: 'image',
      options: {
        accept: '.png,.jpg,.gif,.jpeg'
      }
    },
    // {
    //   name: 'banner_image',
    //   title: 'Banner Image',
    //   type: 'blockContentForMultiDimensionImage'
    // },
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
      name: 'newsTitle',
      title: 'Title',
      type: 'blockContent'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [
        {
          type: 'author'
        }
      ]
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date'
    },
    {
      name: 'externalLink',
      title: 'Source',
      type: 'string'
    },
    {
      name: 'bodyCopy',
      title: 'Body Copy',
      type: 'blockContentSocial'
    }
  ]
}