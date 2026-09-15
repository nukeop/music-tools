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

  async playChord(notes: string[]): Promise<void> {
    const Tone = await import('tone');
    await Tone.start();
    const synth = this.getSynth(Tone);
    synth.releaseAll();
    synth.triggerAttackRelease(notes, CHORD_DURATION_SECONDS);
  }
}
