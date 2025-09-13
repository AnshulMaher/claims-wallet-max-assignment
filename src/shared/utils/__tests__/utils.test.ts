import { cn } from '@/shared/utils/utils';

describe('utils', () => {
  it('combines class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles undefined values', () => {
    expect(cn('class1', undefined, 'class2')).toBe('class1 class2');
  });

  it('handles empty strings', () => {
    expect(cn('class1', '', 'class2')).toBe('class1 class2');
  });

  it('handles mixed types', () => {
    expect(cn('class1', undefined, 'class2', null, 'class3')).toBe(
      'class1 class2 class3'
    );
  });
});
