export function clearAllIntervals(intervalIds: number[]) {
  for (let id of intervalIds) {
    clearInterval(id);
  }
  // Clear the array after clearing all intervals
  return [];
}
