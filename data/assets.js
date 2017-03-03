module.exports = [
  {
    id: 'Hairstyles',
    required: false,
    sortOrder: 1,
    menuItem: 'Hairstyles'
  },
  {
    id: 'Beards',
    required: false,
    sortOrder: 5,
    menuItem: 'Beards'
  },
  {
    id: 'Body',
    required: true,
    sortOrder: 0,
    menuItem: 'Body'
  },
  {
    id: 'Glasses',
    required: false,
    sortOrder: 2,
    menuItem: 'Accessories'
  },
  {
    id: 'Scarfes',
    required: false,
    sortOrder: 4,
    menuItem: 'Accessories'
  },
  {
    id: 'Shirts',
    required: false,
    sortOrder: 1,
    menuItem: 'Clothes',
    conflicts: {
      white: {
        indexes: [5 ,6],
        assets: ['Tie'],
        message: 'Sorry but you can\'t use ties with this shirt'
      }
    }
  },
  {
    id: 'Tie',
    required: false,
    sortOrder: 2,
    menuItem: 'Accessories'
  },
  {
    id: 'Eyes',
    required: true,
    sortOrder: 1,
    subColors: true,
    menuItem: 'Eyes'
  },
  {
    id: 'Jackets',
    required: false,
    sortOrder: 3,
    menuItem: 'Clothes'
  },
  {
    id: 'Mouths',
    required: true,
    sortOrder: 1,
    menuItem: 'Mouth'
  }
];