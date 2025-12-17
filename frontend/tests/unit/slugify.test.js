import slugify from '../../assets/js/slugify.js';

describe('slugify', () => {
  it('returns a lowercase hyphenated slug', () => {
    expect(slugify('Tarte Aux Pommes')).toBe('tarte-aux-pommes');
  });

  it('trims extra punctuation and spaces', () => {
    expect(slugify('  Bonjour !!! ')).toBe('bonjour');
  });
});
