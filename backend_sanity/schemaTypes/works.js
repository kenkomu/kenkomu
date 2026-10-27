export default {
    name: 'works',
    title: 'Works',
    type: 'document',
    orderings: [
      {
        title: 'Newest first',
        name: 'yearDesc',
        by: [{ field: 'year', direction: 'desc' }],
      },
    ],
    preview: {
      select: { title: 'title', subtitle: 'role', media: 'imgUrl', featured: 'featured' },
      prepare: ({ title, subtitle, media, featured }) => ({
        title: featured ? `★ ${title}` : title,
        subtitle,
        media,
      }),
    },
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        description: 'Used in the shareable link to this project, e.g. /#work/kayasend',
        options: { source: 'title', maxLength: 64 },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
        description: 'One or two sentences shown on the project card.',
      },
      {
        name: 'featured',
        title: 'Featured',
        type: 'boolean',
        description: 'Featured projects get a large card at the top of the Work section.',
        initialValue: false,
      },
      {
        name: 'year',
        title: 'Year',
        type: 'number',
        description: 'Projects are listed newest first.',
      },
      {
        name: 'role',
        title: 'My role',
        type: 'string',
      },
      {
        name: 'client',
        title: 'Built for',
        type: 'string',
        description: 'Company, team or hackathon. Leave empty for personal projects.',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: ['Live', 'In development', 'Internal tool', 'Hackathon', 'Archived'],
          layout: 'radio',
          direction: 'horizontal',
        },
      },
      {
        name: 'projectLink',
        title: 'Project Link',
        type: 'string',
      },
      {
        name: 'codeLink',
        title: 'Code Link',
        type: 'string',
        description: 'Leave empty for private repositories.',
      },
      {
        name: 'imgUrl',
        title: 'Cover image',
        type: 'image',
        description: '16:10 works best (e.g. 1600×1000).',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'gallery',
        title: 'Gallery',
        type: 'array',
        description: 'Extra screenshots shown in the project details panel.',
        of: [{ type: 'image', options: { hotspot: true } }],
      },
      {
        name: 'tags',
        title: 'Categories',
        description: 'The first category is shown on the card. Each one becomes a filter.',
       type:'array',
       of: [
         {
           name:'tag',
           title:'Tag',
           type:'string'
         }
       ],
       options: {
         list: ['Blockchain App', 'Web App', 'Mobile App', 'UI/UX'],
       },
      },
      {
        name: 'stack',
        title: 'Tech stack',
        type: 'array',
        of: [{ type: 'string' }],
        options: { layout: 'tags' },
      },
      {
        name: 'highlights',
        title: 'Highlights',
        type: 'array',
        description: 'Short bullet points shown in the project details panel.',
        of: [{ type: 'string' }],
      },
    ],
  };
