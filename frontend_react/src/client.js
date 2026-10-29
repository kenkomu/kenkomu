// frontend_react/src/client.js

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID, // replace with your Sanity project ID
    dataset: 'production', // replace with your Sanity dataset name
    apiVersion: '2025-02-19', // use a specific API version
    useCdn: true, // `false` if you want to ensure fresh
    token: process.env.REACT_APP_SANITY_TOKEN, // replace with your Sanity token if needed
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// Resized, format-negotiated image URL. Pass a height to crop around the hotspot.
export const imageUrl = (source, width, height) => {
    let img = urlFor(source).width(width).auto('format').quality(80);
    if (height) img = img.height(height).fit('crop');
    return img.url();
};
