import React, { useState } from 'react';
import { AuthScreens } from './components/AuthScreens';
import { HomeDashboard } from './components/HomeDashboard';
import { LocationMap } from './components/LocationMap';
import { SiteDetails } from './components/SiteDetails';
import { UserProfile } from './components/UserProfile';
import { Notifications } from './components/Notifications';
import { ResearcherDashboard } from './components/ResearcherDashboard';
import { PolicymakerDashboard } from './components/PolicymakerDashboard';
import { BottomNavigation } from './components/BottomNavigation';

type UserType = 'researcher' | 'policymaker' | 'general';
type Screen = 'auth' | 'home' | 'map' | 'site-details' | 'notifications' | 'profile' | 'research' | 'policy';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('auth');
  const [userType, setUserType] = useState<UserType>('general');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('');
  
  // Mock notification count - in a real app this would come from an API
  const notificationCount = 3;

  const handleLogin = (type: UserType) => {
    setUserType(type);
    setCurrentScreen('home');
  };

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleSiteSelect = (siteId: string) => {
    setSelectedSiteId(siteId);
    setCurrentScreen('site-details');
  };

  const handleBackFromSiteDetails = () => {
    setCurrentScreen('map');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth':
        return <AuthScreens onLogin={handleLogin} />;
      
      case 'home':
        return <HomeDashboard userType={userType} />;
      
      case 'map':
        return <LocationMap onSiteSelect={handleSiteSelect} />;
      
      case 'site-details':
        return (
          <SiteDetails 
            siteId={selectedSiteId} 
            onBack={handleBackFromSiteDetails} 
          />
        );
      
      case 'notifications':
        return <Notifications />;
      
      case 'profile':
        return <UserProfile userType={userType} />;
      
      case 'research':
        return userType === 'researcher' ? <ResearcherDashboard /> : <HomeDashboard userType={userType} />;
      
      case 'policy':
        return userType === 'policymaker' ? <PolicymakerDashboard /> : <HomeDashboard userType={userType} />;
      
      default:
        return <HomeDashboard userType={userType} />;
    }
  };

  const showBottomNavigation = currentScreen !== 'auth' && currentScreen !== 'site-details';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className={`${showBottomNavigation ? 'pb-20' : ''}`}>
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNavigation && (
        <BottomNavigation
          activeScreen={currentScreen}
          onScreenChange={handleScreenChange}
          userType={userType}
          notificationCount={notificationCount}
        />
      )}
    </div>
  );
}