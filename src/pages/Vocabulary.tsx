import React, { useState, useEffect } from 'react';
import { Search, Plus, X } from 'lucide-react';

interface Word {
  id: number;
  term: string;
  definition: string;
  example: string;
}

const Vocabulary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState({ term: '', definition: '', example: '' });
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  useEffect(() => {
    const storedWords = localStorage.getItem('vocabularyWords');
    if (storedWords) {
      setWords(JSON.parse(storedWords));
    } else {
      const initialWords: Word[] = [
        { id: 1, term: 'Ubiquitous', definition: 'Present, appearing, or found everywhere.', example: 'Mobile phones are now ubiquitous in modern society.' },
        { id: 2, term: 'Ephemeral', definition: 'Lasting for a very short time.', example: 'The ephemeral nature of fashion trends makes it hard to keep up.' },
        { id: 3, term: 'Serendipity', definition: 'The occurrence and development of events by chance in a happy or beneficial way.', example: 'Their meeting was pure serendipity.' },
      ];
      setWords(initialWords);
      localStorage.setItem('vocabularyWords', JSON.stringify(initialWords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('vocabularyWords', JSON.stringify(words));
  }, [words]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredWords = words.filter(word =>
    word.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddWord = () => {
    if (newWord.term && newWord.definition) {
      const newId = words.length > 0 ? Math.max(...words.map(w => w.id)) + 1 : 1;
      setWords([...words, { ...newWord, id: newId }]);
      setNewWord({ term: '', definition: '', example: '' });
      setIsAddingWord(false);
    }
  };

  const toggleFlashcardMode = () => {
    setFlashcardMode(!flashcardMode);
    setCurrentWordIndex(0);
    setShowDefinition(false);
  };

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    setShowDefinition(false);
  };

  const prevWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
    setShowDefinition(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Vocabulary Builder</h1>
      {!flashcardMode && (
        <>
          <div className="mb-6 flex">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search words..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 pl-10 border rounded"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button
              onClick={() => setIsAddingWord(true)}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
            >
              <Plus size={20} className="mr-2" /> Add Word
            </button>
            <button
              onClick={toggleFlashcardMode}
              className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Flashcard Mode
            </button>
          </div>
          <div className="space-y-4">
            {filteredWords.map(word => (
              <div key={word.id} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">{word.term}</h2>
                <p className="text-gray-600 mb-2">{word.definition}</p>
                <p className="italic">"{word.example}"</p>
              </div>
            ))}
          </div>
        </>
      )}
      {flashcardMode && words.length > 0 && (
        <div className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-4">
            <h2 className="text-3xl font-bold mb-4">{words[currentWordIndex].term}</h2>
            {showDefinition && (
              <>
                <p className="text-xl mb-2">{words[currentWordIndex].definition}</p>
                <p className="italic">"{words[currentWordIndex].example}"</p>
              </>
            )}
          </div>
          <div className="flex justify-center space-x-4">
            <button onClick={prevWord} className="px-4 py-2 bg-gray-300 rounded">Previous</button>
            <button onClick={() => setShowDefinition(!showDefinition)} className="px-4 py-2 bg-blue-500 text-white rounded">
              {showDefinition ? 'Hide Definition' : 'Show Definition'}
            </button>
            <button onClick={nextWord} className="px-4 py-2 bg-gray-300 rounded">Next</button>
          </div>
          <button onClick={toggleFlashcardMode} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Exit Flashcard Mode
          </button>
        </div>
      )}
      {isAddingWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Word</h2>
            <input
              type="text"
              placeholder="Term"
              value={newWord.term}
              onChange={(e) => setNewWord({ ...newWord, term: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Definition"
              value={newWord.definition}
              onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Example (optional)"
              value={newWord.example}
              onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <button onClick={() => setIsAddingWord(false)} className="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
              <button onClick={handleAddWord} className="px-4 py-2 bg-blue-500 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vocabulary;