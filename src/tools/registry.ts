import type { IconifyIcon } from '@iconify/types';
import audioLines from '@iconify-icons/lucide/audio-lines';
import music from '@iconify-icons/lucide/music';
import triangle from '@iconify-icons/lucide/triangle';
import type { ComponentType } from 'react';
import { ChordBuilder } from './chord-builder/ChordBuilder';
import { Scales } from './scales/Scales';
import { TriadPairs } from './triad-pairs/TriadPairs';

export type Tool = {
  path: string;
  label: string;
  icon: IconifyIcon;
  component: ComponentType;
};

export const TOOLS = [
  {
    path: '/chords',
    label: 'Chords',
    icon: music,
    component: ChordBuilder,
  },
  {
    path: '/triad-pairs',
    label: 'Triad pairs',
    icon: triangle,
    component: TriadPairs,
  },
  {
    path: '/scales',
    label: 'Scales',
    icon: audioLines,
    component: Scales,
  },
] satisfies Tool[];
