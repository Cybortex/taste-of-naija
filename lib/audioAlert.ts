/**
 * Synthesizes a clean, high-attention two-tone restaurant bell chime
 * using the standard browser Web Audio API.
 * No external .mp3 files required (zero 404 or CORS issues).
 */
class RestaurantAudioAlert {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("taste_of_naija_sound_alerts");
      this.isEnabled = saved !== null ? saved === "true" : true;
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }

    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    return this.audioCtx;
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  public setSoundEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("taste_of_naija_sound_alerts", enabled ? "true" : "false");
    }
  }

  /**
   * Plays a 2-tone melodic notification chime (C6 -> G6)
   * designed for kitchen / admin order alerts.
   */
  public playNewOrderChime(): void {
    if (!this.isEnabled) return;

    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Note 1: High crisp chime (1046.5 Hz - C6)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1046.5, now);
      osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.12); // Ramp to E6

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.55);

      // Note 2: Harmonious follow-up bell chime (1567.98 Hz - G6) at +160ms
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1567.98, now + 0.16);

      gain2.gain.setValueAtTime(0.001, now + 0.16);
      gain2.gain.linearRampToValueAtTime(0.4, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + 0.16);
      osc2.stop(now + 1.2);
    } catch {
      // Audio playback blocked or not supported on device
    }
  }
}

export const audioAlert = new RestaurantAudioAlert();
