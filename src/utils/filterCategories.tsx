export const filterCategories = (
  places: { category: string }[] = []
): string[] => {
  const categorySet = new Set(places.map((place) => place.category));
  return Array.from(categorySet);
};
