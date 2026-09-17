import { beforeEach, describe, expect, it } from 'bun:test';
import { ToolNavWrapper } from './ToolNav.test-wrapper';

describe('ToolNav', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows the chord builder by default', async () => {
    await ToolNavWrapper.mount();

    expect(ToolNavWrapper.chordBuilderVisible()).toBe(true);
    expect(ToolNavWrapper.triadPairsVisible()).toBe(false);
  });

  it('shows the triad pairs placeholder and hides the chord builder when its nav link is clicked', async () => {
    await ToolNavWrapper.mount();

    await ToolNavWrapper.goTo('Triad pairs');

    expect(ToolNavWrapper.triadPairsVisible()).toBe(true);
    expect(ToolNavWrapper.chordBuilderVisible()).toBe(false);
  });

  it('brings the chord builder back when its nav link is clicked', async () => {
    await ToolNavWrapper.mount();

    await ToolNavWrapper.goTo('Triad pairs');
    await ToolNavWrapper.goTo('Chords');

    expect(ToolNavWrapper.chordBuilderVisible()).toBe(true);
    expect(ToolNavWrapper.triadPairsVisible()).toBe(false);
  });
});
