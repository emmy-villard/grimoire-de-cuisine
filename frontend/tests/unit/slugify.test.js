import slugify from '../../assets/js/slugify.js';

describe('slugify', () => {
  it('returns a lowercase hyphenated slug', () => {
    expect(slugify('Tarte Aux Pommes')).toBe('tarte-aux-pommes');
  });

  it('trims extra punctuation and spaces', () => {
    expect(slugify('  Bonjour !!! ')).toBe('bonjour');
  });

  it('these slugs must be identical', () => {
    expect(slugify('Tarte Aux Pommes')).toBe(
      slugify('Tarte-aux_PoMmes'));
  });

  it('trims special characters', () => {
    expect(slugify('"«»boNjoUr<|""CAMARaDE"«»*» ')).toBe(
      slugify('bonjour-camarade'));
  });
});
