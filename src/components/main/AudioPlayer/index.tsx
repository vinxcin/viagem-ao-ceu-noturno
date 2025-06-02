import { useState, useRef } from 'react';
import { Volume1,  VolumeX } from 'lucide-react'; 
import NaturezaAudio from "./../../../assets/audios/natureza.mp3"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  return (
    <div className="audio-player flex items-center">
      <audio ref={audioRef} src={NaturezaAudio} />
      <button
        onClick={toggleAudio}
        className="animate-pulse audio-toggle-button rounded-full hover:bg-green-florest focus:outline-none "
      >
        {isAudioPlaying ?  <Volume1 size={36} strokeWidth={2} className="pl-2 text-green-200 border-2 border-green-200 rounded-full" /> : <VolumeX size={36} strokeWidth={2} className="px-2 text-red-300 border-2 border-red-300 rounded-full" />}
      </button>
    </div>
  );
};

export default AudioPlayer;
