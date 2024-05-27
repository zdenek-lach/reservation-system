import csDayjsTranslations from 'dayjs/locale/cs';

declare type LocaleType = {
  id: string;
  lang: Translation;
  translateCode: string;
  dayjsTranslations: string | any | undefined;
};

declare type Translation = {
  feelingEmpty: string;
  free: string;
  loadNext: string;
  loadPrevious: string;
  over: string;
  taken: string;
  topbar: Topbar;
  search: string;
  week: string;
};

declare type Topbar = {
  filters: string;
  next: string;
  prev: string;
  today: string;
  view: string;
};

export const langs: LocaleType[] = [
  {
    id: 'cs',
    lang: {
      feelingEmpty: 'Cítím se tak prázdně...',
      free: 'Volno',
      loadNext: 'Další',
      loadPrevious: 'Předchozí',
      over: 'přesčas',
      taken: 'Obsazen',
      topbar: {
        filters: 'Filtry',
        next: 'Další',
        prev: 'Předchozí',
        today: 'Dnes',
        view: 'Zobrazení',
      },
      search: 'Vyhledat',
      week: 'Týden',
    },
    translateCode: 'cs-CS',
    dayjsTranslations: csDayjsTranslations,
  },
];
