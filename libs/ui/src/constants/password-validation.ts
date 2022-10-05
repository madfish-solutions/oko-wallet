export const passwordValidationInitialState = [
  {
    id: 1,
    message: 'At least 8 characters - the more characters is better (8-30)',
    valid: false
  },
  {
    id: 2,
    message: 'Mix of both uppercase and lowercase letters',
    valid: false
  },
  {
    id: 3,
    message: 'Mix of letters and numbers',
    valid: false
  },
  {
    id: 4,
    message: 'Inclusion of at least one special character, e.g., ! @ # ? ] - (optional, recommended).',
    valid: false,
    optional: true
  }
];
