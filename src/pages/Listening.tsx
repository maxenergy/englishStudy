import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface AudioTrack {
  id: number;
  title: string;
  src: string;
  transcript: string;
}

const Listening: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioTracks: AudioTrack[] = [
    {
      id: 1,
      title: "The Importance of Time Management",
      src: "https://example.com/audio1.mp3",
      transcript: "Time management is a crucial skill in today's fast-paced world. It involves planning, organizing, and controlling your time effectively to increase productivity and achieve your goals. Good time management can lead to better work-life balance, reduced stress, and improved overall performance in both personal and professional spheres."
    },
    {
      id: 2,
      title: "The Impact of Social Media",
      src: "https://example.com/audio2.mp3",
      transcript: "Social media has revolutionized the way we communicate and share information. While it offers numerous benefits such as connecting people across the globe and providing platforms for self-expression, it also presents challenges like privacy concerns and the spread of misinformation. Understanding both the positive and negative aspects of social media is essential in today's digital age."
    },
    // Add more tracks as needed
  ];

  useEffect(() => {
    if (audioTracks.length > 0) {
      setCurrentTrack(audioTracks[0]);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackChange = (direction: 'next' | 'prev') => {
    const currentIndex = audioTracks.findIndex(track => track.id === currentTrack?.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % audioTracks.length;
    } else {
      newIndex = (currentIndex - 1 + audioTracks.length) % audioTracks.length;
    }
    setCurrentTrack(audioTracks[newIndex]);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Listening Practice</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {currentTrack && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">{currentTrack.title}</h2>
              <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => handleTrackChange('next')}
              />
            </div>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <button onClick={() => handleTrackChange('prev')} className="p-2 rounded-full hover:bg-gray-200">
                <SkipBack size={24} />
              </button>
              <button onClick={togglePlay} className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              <button onClick={() => handleTrackChange('next')} className="p-2 rounded-full hover:bg-gray-200">
                <SkipForward size={24} />
              </button>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center mb-6">
              <Volume2 size={20} className="mr-2" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full"
              />
            </div>
            <div className="mb-6">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
              </button>
              {showTranscript && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                  <p>{currentTrack.transcript}</p>
                </div>
              )}
            </div>
          </>
        )}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Comprehension Questions</h3>
          <div>
            <p className="font-medium mb-2">1. What is the main topic of this audio?</p>
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows={3}
              placeholder="Type your answer here..."
            ></textarea>
          </div>
          <div>
            <p className="font-medium mb-2">2. What are two key points mentioned in the audio?</p>
            <textarea
              className="w-full p-2 border rounded resize-none"
              rows={3}
              placeholder="Type your answer here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listening;