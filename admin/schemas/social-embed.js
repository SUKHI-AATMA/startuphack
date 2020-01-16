import  React from 'react';

const SocialEmbedPreview = ({value}) => (<pre>{JSON.stringify(value.socialEmbedCode, null, 2)}</pre>);

export default {
    name: 'socialEmbed',
    type: 'object',
    title: 'Social Embed',
    fields: [
        {
            name: 'socialEmbedCode',
            type: 'string',
            title: 'Embed Code'
        }
    ],
    preview: {
        select: {
            socialEmbedCode: 'socialEmbedCode'
        },
        component: SocialEmbedPreview
    }
}