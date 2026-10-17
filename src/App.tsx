import React, { useState } from 'react';
import { QuizQuestion, ScreenId } from './types';
import { MOCK_QUESTIONS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnterPinModal } from './components/EnterPinModal';
import { ScreenSwitcher } from './components/ScreenSwitcher';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { HostDashboardScreen } from './screens/HostDashboardScreen';
import { QuizBuilderScreen } from './screens/QuizBuilderScreen';
import { EventDetailsScreen } from './screens/EventDetailsScreen';
import { LaunchModeScreen } from './screens/LaunchModeScreen';
import { EventsCalendarScreen } from './screens/EventsCalendarScreen';
import { LivePlayerScreen } from './screens/LivePlayerScreen';
import { HostControlScreen } from './screens/HostControlScreen';
import { ResultsStandingsScreen } from './screens/ResultsStandingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [activePin, setActivePin] = useState('749204');
  const [playerNickname, setPlayerNickname] = useState('Alex Rivera');
  const [selectedEventId, setSelectedEventId] = useState('ev-1');
  const [questions, setQuestions] = useState<QuizQuestion[]>(MOCK_QUESTIONS);

  // Handle live updates to a single question
  const handleUpdateQuestion = (index: number, updated: QuizQuestion) => {
    setQuestions((prev) => prev.map((q, idx) => (idx === index ? updated : q)));
  };

  // Handle saving the full question list
  const handleSaveQuestions = (updatedList: QuizQuestion[]) => {
    setQuestions(updatedList);
  };

  // Handle joining game via PIN
  const handleJoinGame = (pin: string, nickname?: string) => {
    setActivePin(pin);
    if (nickname) setPlayerNickname(nickname);
    setIsPinModalOpen(false);
    setCurrentScreen('live-player');
  };

  // Launch host control room directly
  const handleLaunchHost = () => {
    setCurrentScreen('host-control');
  };

  // Launch player test mode
  const handleLaunchPlayer = () => {
    setCurrentScreen('live-player');
  };

  // Check if current screen is immersive full-screen game mode
  const isImmersiveScreen = currentScreen === 'live-player' || currentScreen === 'host-control';

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Global Navigation Bar (displayed on non-immersive screens) */}
      {!isImmersiveScreen && (
        <Navbar
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenPinModal={() => setIsPinModalOpen(true)}
        />
      )}

      {/* Screen Render Stage */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onJoinGame={handleJoinGame}
          />
        )}

        {currentScreen === 'host-dashboard' && (
          <HostDashboardScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLaunchInstant={handleLaunchHost}
          />
        )}

        {currentScreen === 'quiz-builder' && (
          <QuizBuilderScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            questions={questions}
            onSaveQuestions={handleSaveQuestions}
          />
        )}

        {currentScreen === 'event-details' && (
          <EventDetailsScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onJoinGame={handleJoinGame}
          />
        )}

        {currentScreen === 'launch-mode' && (
          <LaunchModeScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLaunchHost={handleLaunchHost}
            onLaunchPlayer={handleLaunchPlayer}
          />
        )}

        {currentScreen === 'events-calendar' && (
          <EventsCalendarScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectEvent={(id) => setSelectedEventId(id)}
            onJoinGame={handleJoinGame}
          />
        )}

        {currentScreen === 'live-player' && (
          <LivePlayerScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            playerNickname={playerNickname}
            questions={questions}
            onUpdateQuestion={handleUpdateQuestion}
          />
        )}

        {currentScreen === 'host-control' && (
          <HostControlScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            questions={questions}
            onUpdateQuestion={handleUpdateQuestion}
            onFinishQuiz={() => {
              setCurrentScreen('results-standings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'results-standings' && (
          <ResultsStandingsScreen
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onPlayAgain={() => {
              setCurrentScreen('live-player');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Global Footer (displayed on non-immersive screens) */}
      {!isImmersiveScreen && (
        <Footer
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Enter PIN Modal */}
      <EnterPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onJoin={handleJoinGame}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating 9-Screen Quick Switcher Bar */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
