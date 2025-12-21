import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Capsule } from '../pages/CapsulesPage/data/capsulesData';
import type { Resource } from '../pages/ResourcesPage/data/resourcesData';
import { capsulesData } from '../pages/CapsulesPage/data/capsulesData';
import { resourcesData } from '../pages/ResourcesPage/data/resourcesData';

interface ContentContextType {
  // Estado para cápsulas
  capsules: Capsule[];
  selectedCapsule: Capsule | null;
  setSelectedCapsule: (capsule: Capsule | null) => void;
  
  // Estado para recursos
  resources: Resource[];
  selectedResource: Resource | null;
  setSelectedResource: (resource: Resource | null) => void;
  
  // Estado para UI
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  
  // Acciones
  markResourceAsViewed: (resourceId: number) => void;
  markCapsuleAsCompleted: (capsuleId: number) => void;
  getProgress: () => {
    capsulesCompleted: number;
    resourcesViewed: number;
    totalProgress: number;
  };
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  
  const [capsules, setCapsules] = useState<Capsule[]>(capsulesData);
  
  const [resources, setResources] = useState<Resource[]>(resourcesData);
  
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para tracking de progreso
  const [viewedResources, setViewedResources] = useState<number[]>([]);
  const [completedCapsules, setCompletedCapsules] = useState<number[]>([]);

  const markResourceAsViewed = (resourceId: number) => {
    if (!viewedResources.includes(resourceId)) {
      setViewedResources([...viewedResources, resourceId]);
      // Se puede enviar a una API desde aqui
      console.log(`Resource ${resourceId} marked as viewed`);
    }
  };

  const markCapsuleAsCompleted = (capsuleId: number) => {
    if (!completedCapsules.includes(capsuleId)) {
      setCompletedCapsules([...completedCapsules, capsuleId]);
      // Se puede enviar a una API desde aqui
      console.log(`Capsule ${capsuleId} marked as completed`);
    }
  };

  const getProgress = () => {
    const capsulesCompleted = completedCapsules.length;
    const resourcesViewed = viewedResources.length;
    const totalCapsules = capsules.length;
    const totalResources = resources.length;
    
    const totalProgress = totalCapsules + totalResources > 0 
      ? Math.round(((capsulesCompleted + resourcesViewed) / (totalCapsules + totalResources)) * 100)
      : 0;
    
    return {
      capsulesCompleted,
      resourcesViewed,
      totalProgress
    };
  };

  const value: ContentContextType = {
    capsules,
    selectedCapsule,
    setSelectedCapsule,
    resources,
    selectedResource,
    setSelectedResource,
    isLoading,
    setIsLoading,
    error,
    setError,
    markResourceAsViewed,
    markCapsuleAsCompleted,
    getProgress
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};