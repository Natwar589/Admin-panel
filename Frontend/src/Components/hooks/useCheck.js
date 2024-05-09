import { useEffect, useState } from "react";

const useCheck = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Check if username exists in local storage
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Only run this effect once, on component mount

  return username;
};

export default useCheck;
