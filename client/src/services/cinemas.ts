const getCinemas = async () => {
  const res = await fetch('http://localhost:5000/api/cinemas');

  if (!res.ok) {
    throw new Error('Failed to fetch cinemas');
  }
  return res.json();
};

export { getCinemas };
