export default {
    name: 'news',
    title: 'News',
    type: 'document',
    initialValue: () => ({
        publishedDate: new Date().toISOString()
    }),

    fields: [{
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
            title: 'Meta Image (1200 x 630)',
            type: 'image',
            options: {
                accept: '.png,.jpg,.gif,.jpeg'
            }
        },
        {
            name: 'hmbImage',
            title: 'Homepage Banner Image (1980 x 1080)',
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
            title: 'Details Banner Image(minimum width: 1600)',
            type: 'blockContentForImageVideo'
        },

        {
            name: 'bannerStyle',
            title: 'Banner Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Column', value: 'full-column' },
                    { title: 'Two Column Image on Right', value: 'two-column-image-right' },
                    { title: 'Two Column Image on Left', value: 'two-column-image-left' },
                    { title: 'Three Column', value: 'three-column' }
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
            to: [{
                type: 'author'
            }]
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