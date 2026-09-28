import type { Instrument } from './Instrument';

type ToneModule = typeof import('tone');
type Synth = InstanceType<ToneModule['PolySynth']>;
type Transport = ReturnType<ToneModule['getTransport']>;

const ATTACK = 0.02;
const DECAY = 0.3;
const SUSTAIN = 0.4;
const RELEASE = 0.3;
const VOLUME_DB = -8;
const CHORD_DURATION_SECONDS = 0.35;
// Fraction of each progression slot a chord sounds, so repeated chords re-attack.
const PROGRESSION_GATE = 0.9;

export class ToneInstrument implements Instrument {
  private synth: Synth | null = null;
  private transport: Transport | null = null;
  private finishProgression: (() => void) | null = null;

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

  async playProgression(
    chords: string[][],
    secondsPerChord: number,
    onChordStart: (index: number) => void,
  ): Promise<void> {
    const { Tone, synth } = await this.activate();
    this.stop();

    const transport = Tone.getTransport();
    const draw = Tone.getDraw();
    this.transport = transport;

    chords.forEach((notes, index) => {
      transport.schedule((time) => {
        synth.triggerAttackRelease(
          notes,
          secondsPerChord * PROGRESSION_GATE,
          time,
        );
        draw.schedule(() => onChordStart(index), time);
      }, index * secondsPerChord);
    });

    return new Promise((resolve) => {
      this.finishProgression = resolve;
      transport.schedule((time) => {
        draw.schedule(() => this.stop(), time);
      }, chords.length * secondsPerChord);
      transport.start();
    });
  }

  stop(): void {
    this.transport?.stop();
    this.transport?.cancel();
    this.synth?.releaseAll();

    const finish = this.finishProgression;
    this.finishProgression = null;
    finish?.();
  }
}
