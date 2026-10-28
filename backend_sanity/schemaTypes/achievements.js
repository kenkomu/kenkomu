export default {
    name: 'achievements',
    title: 'Achievements',
    type: 'document',
    orderings: [
      {
        title: 'Newest first',
        name: 'dateDesc',
        by: [{ field: 'date', direction: 'desc' }],
      },
    ],
    preview: {
      select: { title: 'title', type: 'type', result: 'result', date: 'date', media: 'image' },
      prepare: ({ title, type, result, date, media }) => ({
        title,
        subtitle: [type, result, date && date.slice(0, 7)].filter(Boolean).join(' · '),
        media,
      }),
    },
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'The event, grant, programme or certificate, e.g. "Starknet Private Sprint".',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'type',
        title: 'Type',
        type: 'string',
        options: {
          list: ['Hackathon', 'Grant', 'Programme', 'Certification', 'Award'],
          layout: 'radio',
          direction: 'horizontal',
        },
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'organizer',
        title: 'Organizer',
        type: 'string',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'date',
        description: 'When it ended or was awarded. Achievements are listed newest first.',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'result',
        title: 'Result',
        type: 'string',
        description: 'e.g. "1st place", "Finalist", "Grant awarded", "Completed". Leave empty if you only took part.',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 3,
      },
      {
        name: 'link',
        title: 'Proof link',
        type: 'url',
        description: 'Results page, certificate, announcement post or submission.',
      },
      {
        name: 'project',
        title: 'Related project',
        type: 'reference',
        to: [{ type: 'works' }],
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        description: 'Optional certificate or event photo.',
        options: { hotspot: true },
      },
      {
        name: 'featured',
        title: 'Featured',
        type: 'boolean',
        description: 'Featured achievements appear on the home page.',
        initialValue: false,
      },
    ],
  };
