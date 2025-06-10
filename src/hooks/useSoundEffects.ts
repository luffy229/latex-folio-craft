
import { useCallback } from 'react';

export const useSoundEffects = () => {
  const playSound = useCallback((frequency: number, duration: number = 200, type: OscillatorType = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (error) {
      // Fallback for browsers that don't support Web Audio API
      console.log('Sound effect would play here');
    }
  }, []);

  const playHoverSound = useCallback(() => playSound(800, 100), [playSound]);
  const playClickSound = useCallback(() => playSound(600, 150, 'square'), [playSound]);
  const playSuccessSound = useCallback(() => {
    playSound(523, 200);
    setTimeout(() => playSound(659, 200), 100);
    setTimeout(() => playSound(784, 300), 200);
  }, [playSound]);

  return {
    playHoverSound,
    playClickSound,
    playSuccessSound,
  };
};
