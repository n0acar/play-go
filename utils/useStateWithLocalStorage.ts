import React, { useState, useEffect } from "react";

export const useStateWithLocalStorage = (
  localStorageKey: string,
  isLoaded: boolean,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(localStorage.getItem(localStorageKey) || "");
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue] as [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
};

export const useObjectStateWithLocalStorage = <T>(
  localStorageKey: string,
  initialValue: T,
  isLoaded: boolean,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const savedValue = localStorage.getItem(localStorageKey);
    if (savedValue == null) {
      setLoaded(true);
      return;
    }
    if (savedValue === "undefined") return;
    const item = JSON.parse(savedValue);
    setValue(item);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(localStorageKey, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
};
