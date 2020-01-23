/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default {
  title: 'Block Content For Image/Video',
  name: 'blockContentForImageVideo',
  type: 'array',
  of: [
    // {
    //   type: 'image',
    //   fields: [
    //     {
    //       type: 'text',
    //       name: 'alt',
    //       title: 'Alternative text',
    //       description: `Some of your visitors cannot see images, 
    //         be they blind, color-blind, low-sighted; 
    //         alternative text is of great help for those 
    //         people that can rely on it to have a good idea of 
    //         what\'s on your page.`,
    //       options: {
    //         isHighlighted: true,
    //         hotspot: true
    //       }
    //     }
    //   ]
    // },
    {
      type: 'multiImageDimension'
    },
    {
      type: 'youtube'
    }
  ]
}
