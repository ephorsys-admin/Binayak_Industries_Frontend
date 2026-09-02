import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_LOCATION = {
  label: 'Bhubaneswar, Odisha',
  city: 'Bhubaneswar',
  state: 'Odisha',
  pincode: '751001',
  addressLine: 'Flat 402, Royal Residency, Sector 5',
  landmark: 'Near City Centre',
  addressType: 'Home',
  isGpsLive: false,
};

// Load persisted location from localStorage
const loadPersistedLocation = () => {
  try {
    const saved = localStorage.getItem('binayak_delivery_location');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to parse location from localStorage:', e);
  }
  return DEFAULT_LOCATION;
};

const initialState = {
  currentLocation: loadPersistedLocation(),
  savedLocations: [
    { id: 1, label: 'Home', city: 'Bhubaneswar', state: 'Odisha', pincode: '751001', addressLine: 'Flat 402, Royal Residency, Sector 5', landmark: 'Near City Centre', addressType: 'Home' },
    { id: 2, label: 'Jaipur HQ', city: 'Jaipur', state: 'Rajasthan', pincode: '302001', addressLine: 'Corporate Tower B, C-Scheme', landmark: 'Near Central Mall', addressType: 'Work' },
    { id: 3, label: 'Bikaner Hub', city: 'Bikaner', state: 'Rajasthan', pincode: '334001', addressLine: 'Heritage Station Road, Kote Gate', landmark: 'Near Heritage Gate', addressType: 'Other' },
  ],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.currentLocation = {
        ...state.currentLocation,
        ...action.payload,
      };
      try {
        localStorage.setItem('binayak_delivery_location', JSON.stringify(state.currentLocation));
      } catch (e) {
        console.error('Failed to persist location:', e);
      }
    },
    setGpsLocation: (state, action) => {
      state.currentLocation = {
        ...state.currentLocation,
        ...action.payload,
        isGpsLive: true,
      };
      try {
        localStorage.setItem('binayak_delivery_location', JSON.stringify(state.currentLocation));
      } catch (e) {
        console.error('Failed to persist GPS location:', e);
      }
    },
    updateAddressField: (state, action) => {
      const { field, value } = action.payload;
      if (field) {
        state.currentLocation[field] = value;
        try {
          localStorage.setItem('binayak_delivery_location', JSON.stringify(state.currentLocation));
        } catch (e) {}
      }
    },
  },
});

export const { setLocation, setGpsLocation, updateAddressField } = locationSlice.actions;

export const selectCurrentLocation = (state) => state.location.currentLocation;
export const selectSavedLocations = (state) => state.location.savedLocations;

export default locationSlice.reducer;
