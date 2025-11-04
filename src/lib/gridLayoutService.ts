interface GridLayoutPreference {
  userId: string;
  layoutId: string;
  layoutName: string;
  aspectRatio: string;
}

// Store user grid layout preferences
let userGridPreferences: GridLayoutPreference[] = [];

export const setUserGridLayout = (userId: string, layoutId: string, layoutName: string, aspectRatio: string): void => {
  const existingIndex = userGridPreferences.findIndex(pref => pref.userId === userId);
  
  const newPreference: GridLayoutPreference = {
    userId,
    layoutId,
    layoutName,
    aspectRatio
  };

  if (existingIndex >= 0) {
    userGridPreferences[existingIndex] = newPreference;
  } else {
    userGridPreferences.push(newPreference);
  }

  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('scope_grid_preferences', JSON.stringify(userGridPreferences));
  }
};

export const getUserGridLayout = (userId: string): GridLayoutPreference | null => {
  // Load from localStorage first
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('scope_grid_preferences');
    if (saved) {
      try {
        userGridPreferences = JSON.parse(saved);
      } catch (error) {
        console.error('Error parsing grid preferences:', error);
      }
    }
  }

  return userGridPreferences.find(pref => pref.userId === userId) || null;
};

export const getDefaultGridLayout = () => ({
  layoutId: 'single',
  layoutName: 'Single',
  aspectRatio: '1:1'
});
