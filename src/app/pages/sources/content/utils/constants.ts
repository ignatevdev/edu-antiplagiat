export const subjects = [
  "rus",
  "literature",
  "math",
  "eng",
  "biology",
  "geography",
  "comp_science",
  "history",
  "lsf",
  "social_studies",
  "technology",
  "physics",
  "chemistry",
];

export const subjectNames = {
  [subjects[0]]: "Русский язык",
  [subjects[1]]: "Литература",
  [subjects[2]]: "Математика",
  [subjects[3]]: "Английский язык",
  [subjects[4]]: "Биология",
  [subjects[5]]: "География",
  [subjects[6]]: "Информатика",
  [subjects[7]]: "История",
  [subjects[8]]: "ОБЖ",
  [subjects[9]]: "Обществознание",
  [subjects[10]]: "Технология",
  [subjects[11]]: "Физика",
  [subjects[12]]: "Химия",
};

export const subjectOptions = subjects.map((key) => ({
  key,
  title: subjectNames[key],
}));
