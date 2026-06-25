import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer
} from 'react';
import api from '../api/client';

const AuthContext = createContext();
const initialState = {
  user: JSON.parse(localStorage.getItem('reservafit_user') || 'null'),
  token: localStorage.getItem('reservafit_token'),
  loading: false,
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'START': return { ...state, loading: true, error: '' };
    case 'SUCCESS': return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
    case 'ERROR': return { ...state, loading: false, error: action.payload };
    case 'LOGOUT': return { ...initialState, user: null, token: null };
    default: return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const persist = useCallback(({ user, token }) => {
    localStorage.setItem('reservafit_user', JSON.stringify(user));
    localStorage.setItem('reservafit_token', token);
    dispatch({ type: 'SUCCESS', payload: { user, token } });
  }, []);

  const login = useCallback(async credentials => {
    dispatch({ type: 'START' });
    try {
      const { data } = await api.post('/auth/login', credentials);
      persist(data);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.response?.data?.message || 'Error al iniciar sesión' });
    }
  }, [persist]);

  const register = useCallback(async formData => {
    dispatch({ type: 'START' });
    try {
      const { data } = await api.post('/auth/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      persist(data);
    } catch (error) {
      dispatch({ type: 'ERROR', payload: error.response?.data?.message || 'Error al registrarse' });
    }
  }, [persist]);

  const logout = useCallback(() => {
    localStorage.removeItem('reservafit_user');
    localStorage.removeItem('reservafit_token');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo(() => ({ ...state, login, register, logout, isAdmin: state.user?.role === 'admin' }), [state, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
