import type { Instrument } from './Instrument';

type ToneModule = typeof import('tone');
type Synth = InstanceType<ToneModule['PolySynth']>;

const ATTACK = 0.02;
const DECAY = 0.3;
const SUSTAIN = 0.4;
const RELEASE = 0.3;
const VOLUME_DB = -8;
const CHORD_DURATION_SECONDS = 0.35;

export class ToneInstrument implements Instrument {
  private synth: Synth | null = null;

  private buildSynth(Tone: ToneModule): Synth {
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: {
        attack: ATTACK,
        decay: DECAY,
        sustain: SUSTAIN,
        release: RELEASE,
      },
    });
    const volume = new Tone.Volume(VOLUME_DB).toDestination();
    synth.connect(volume);
    return synth;
  }

  private getSynth(Tone: ToneModule): Synth {
    if (this.synth === null) {
      this.synth = this.buildSynth(Tone);
    }
    return this.synth;
  }

  private async activate(): Promise<{ Tone: ToneModule; synth: Synth }> {
    const Tone = await import('tone');
    await Tone.start();
    const synth = this.getSynth(Tone);
    synth.releaseAll();
    return { Tone, synth };
  }

  async playChord(notes: string[]): Promise<void> {
    const { synth } = await this.activate();
    synth.triggerAttackRelease(notes, CHORD_DURATION_SECONDS);
  }

  async playSequence(
    notes: string[],
    secondsPerNote: number,
    onNoteStart: (index: number) => void,
  ): Promise<void> {
    const { Tone, synth } = await this.activate();

    const startTime = Tone.now();
    const draw = Tone.getDraw();

    notes.forEach((note, index) => {
      const time = startTime + index * secondsPerNote;
      synth.triggerAttackRelease(note, secondsPerNote, time);
      draw.schedule(() => onNoteStart(index), time);
    });

    return new Promise((resolve) => {
      draw.schedule(resolve, startTime + notes.length * secondsPerNote);
    });
  }
}
