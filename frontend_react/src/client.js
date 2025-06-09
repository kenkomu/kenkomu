import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID, // replace with your Sanity project ID
    dataset: 'production', // replace with your Sanity dataset name
    apiVersion: '2023-10-01', // use a specific API version
    useCdn: true, // `false` if you want to ensure fresh
    token: process.env.REACT_APP_SANITY_TOKEN, // replace with your Sanity token if needed
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);