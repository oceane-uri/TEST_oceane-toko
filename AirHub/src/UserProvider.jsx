// UserProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/reservations/user/${user._id}`);
          setReservations(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error('Erreur lors de la récupération des réservations :', error);
          setError('Erreur lors de la récupération des réservations. Veuillez réessayer.');
          setIsLoading(false);
        }
      }
    };

    fetchReservations();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, reservations, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
