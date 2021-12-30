import React, { useState, useEffect } from "react";

export const useStateWithLocalStorage = (localStorageKey: string) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(localStorage.getItem(localStorageKey) || "");
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue] as [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ];
};

export const useObjectStateWithLocalStorage = <T,>(
  localStorageKey: string,
  initialValue: T
) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const savedValue = localStorage.getItem(localStorageKey);
    if (savedValue == null) return;
    if (savedValue === "undefined") return;
    const item = JSON.parse(savedValue);
    setValue(item);
    item.isLoaded = true;
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
};
