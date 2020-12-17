export const catalogs = ["publishers", "authors"];

export const catalogNames = {
  [catalogs[0]]: "Издательства",
  [catalogs[1]]: "Авторы",
};

export const catalogsOptions = catalogs.map((key) => ({
  key,
  title: catalogNames[key],
}));
