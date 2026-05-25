/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetroLine, Station, LineId } from '../types';

export const METRO_STATIONS: Record<LineId, Station[]> = {
  red: [
    {
      id: 'kholodna_hora',
      name: 'Холодна гора',
      nameEn: 'Kholodna Hora',
      lineId: 'red',
      order: 1,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Пункт обігріву, запаси питної води, місця для відпочинку, розетки для підзарядки.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 155,
      depthMeters: 8,
      features: ['Доступ до приміського автовокзалу', 'Запаси технічної води', 'Генератори резервного живлення']
    },
    {
      id: 'vokzalna',
      name: 'Вокзальна',
      nameEn: 'Vokzalna',
      lineId: 'red',
      order: 2,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Зв\'язок з центральним залізничним вокзалом. Великий вестибюль, аптечний пункт, питна вода.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 125,
      depthMeters: 12,
      features: ['Вихід до залізничного вокзалу «Харків-Пасажирський»', 'Пункт медичної допомоги']
    },
    {
      id: 'tsentralnyi_rynok',
      name: 'Центральний ринок',
      nameEn: 'Tsentralnyi Rynok',
      lineId: 'red',
      order: 3,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Добре захищений підземний перехід, питна вода, біотуалети, черговий персонал.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 135,
      depthMeters: 10,
      features: ['Поруч з автостанцією', 'Широка платформа']
    },
    {
      id: 'maidan_konstytutsii',
      name: 'Майдан Конституції',
      nameEn: 'Maidan Konstytutsii',
      lineId: 'red',
      order: 4,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Велика глибина, підземний коворкінг, стабільний Wi-Fi, питна вода, дитячий куточок.',
      hasUndergroundSchool: false,
      hasTransfer: true,
      transferStationId: 'istorychnyi_muzei',
      renameHistory: 'Раніше — Радянська (перейменовано у 2015 році)',
      travelTimeToNextSeconds: 150,
      depthMeters: 28,
      features: ['Пересадка на Салтівську лінію', 'Зарядні станції', 'Wi-Fi зона від міськради']
    },
    {
      id: 'levada',
      name: 'Левада',
      nameEn: 'Levada',
      lineId: 'red',
      order: 5,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Безпечне укриття, питна вода, пункти першої допомоги, санвузли.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Проспект Гагаріна (перейменовано у липні 2024 року)',
      travelTimeToNextSeconds: 130,
      depthMeters: 10,
      features: ['Вихід до залізничної станції «Харків-Левада»', 'Поруч автовокзал №1']
    },
    {
      id: 'sportyvna',
      name: 'Спортивна',
      nameEn: 'Sportyvna',
      lineId: 'red',
      order: 6,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Питна вода, ковдри, вентиляційне обладнання з фільтрами, перша медична допомога.',
      hasUndergroundSchool: false,
      hasTransfer: true,
      transferStationId: 'metrobudivnykiv',
      travelTimeToNextSeconds: 140,
      depthMeters: 20,
      features: ['Пересадка на Олексіївську лінію', 'Безпосередній вихід до стадіону «Металіст»']
    },
    {
      id: 'zavodska',
      name: 'Заводська',
      nameEn: 'Zavodska',
      lineId: 'red',
      order: 7,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Фільтрація повітря, стабільна подача води та енергії від генераторів.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Завод імені Малишева (перейменовано у липні 2024 року)',
      travelTimeToNextSeconds: 135,
      depthMeters: 15,
      features: ['Вихід до заводу Малишева', 'Промислова зона']
    },
    {
      id: 'turboatom',
      name: 'Турбоатом',
      nameEn: 'Turboatom',
      lineId: 'red',
      order: 8,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Залізобетонна конструкція великої міцності, лави для сидіння, питна вода.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Московський проспект (перейменовано у 2019 році)',
      travelTimeToNextSeconds: 145,
      depthMeters: 12,
      features: ['Поблизу великих підприємств Турбоатом', 'Зручна парковка']
    },
    {
      id: 'palats_sportu',
      name: 'Палац Спорту',
      nameEn: 'Palats Sportu',
      lineId: 'red',
      order: 9,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Великі площі вестибюлів, дитяча безпечна зона, розетки, резервуари з водою.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Маршала Жукова (перейменовано у 2016 році)',
      travelTimeToNextSeconds: 130,
      depthMeters: 10,
      features: ['Поруч з колишнім кінотеатром «Київ»', 'Вихід до Палацу Спорту']
    },
    {
      id: 'armiiska',
      name: 'Армійська',
      nameEn: 'Armiiska',
      lineId: 'red',
      order: 10,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Теплозабезпечення, аптечки першої допомоги, питна вода, електропостачання.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Радянської Армії (перейменовано у 2016 році)',
      travelTimeToNextSeconds: 135,
      depthMeters: 9,
      features: ['Глибока односклепінна конструкція']
    },
    {
      id: 'imeni_maselskoho',
      name: 'Імені О.С. Масельського',
      nameEn: 'Imeni O.S. Maselskoho',
      lineId: 'red',
      order: 11,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Місця для сну, чергові психологи, запас теплих речей, дитяча зона.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Індустріальна (до 2004 року)',
      travelTimeToNextSeconds: 155,
      depthMeters: 8,
      features: ['Знаходиться в житловому масиві ХТЗ']
    },
    {
      id: 'traktornyi_zavod',
      name: 'Тракторний завод',
      nameEn: 'Traktornyi Zavod',
      lineId: 'red',
      order: 12,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Міцне залізобетонне перекриття, медичні аптечки, питна і технічна вода, туалети.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 160,
      depthMeters: 8,
      features: ['Вихід до Харківського тракторного заводу (ХТЗ)']
    },
    {
      id: 'industrialna',
      name: 'Індустріальна',
      nameEn: 'Industrialna',
      lineId: 'red',
      order: 13,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Кінцева станція. Величезний пасажиропотік. Великий підземний перехід облаштовано лавами, розетки, резервна каналізація.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Пролетарська (перейменовано у 2016 році)',
      travelTimeToNextSeconds: 0,
      depthMeters: 8,
      features: ['Кінцева станція на сході міста', 'Вихід до автостанції Рогань', 'Резервна генерація']
    }
  ],
  blue: [
    {
      id: 'istorychnyi_muzei',
      name: 'Історичний музей',
      nameEn: 'Istorychnyi Muzei',
      lineId: 'blue',
      order: 1,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Глибока станція. Безпечно навіть під час сильних обстрілів. Стабільний інтернет, гарячий чай, медична допомога.',
      hasUndergroundSchool: false,
      hasTransfer: true,
      transferStationId: 'maidan_konstytutsii',
      travelTimeToNextSeconds: 115,
      depthMeters: 30,
      features: ['Пересадка на Холодногірсько-Заводську лінію', 'Серце старого міста', 'Глибоке розташування']
    },
    {
      id: 'universytet',
      name: 'Університет',
      nameEn: 'Universytet',
      lineId: 'blue',
      order: 2,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Один з головних центрів підземної освіти (Метрошкола). Обладнаний дитячими класами, звукоізоляцією, рекуператорами повітря, туалетами для дітей.',
      hasUndergroundSchool: true,
      hasTransfer: true,
      transferStationId: 'derzhprom',
      renameHistory: 'Раніше — Дзержинська (перейменовано у 1991 році)',
      travelTimeToNextSeconds: 125,
      depthMeters: 25,
      features: ['Дворівнева станція', 'Підземна школа (Метрошкола)', 'Пересадка на Олексіївську лінію']
    },
    {
      id: 'yaroslava_mudroho',
      name: 'Ярослава Мудрого',
      nameEn: 'Yaroslava Mudroho',
      lineId: 'blue',
      order: 3,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Найглибша станція Харкова (~35 метрів). Максимальний рівень захисту в місті. Інтернет, комфортні сидіння, запаси фільтрованої води.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Пушкінська (перейменовано у квітні 2024 року)',
      travelTimeToNextSeconds: 160,
      depthMeters: 35,
      features: ['Найглибша станція метрополітену', 'Естетичні люстри та архітектура']
    },
    {
      id: 'kyivska',
      name: 'Київська',
      nameEn: 'Kyivska',
      lineId: 'blue',
      order: 4,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Унікальна архітектура з арками. Питна вода, резервне освітлення, ковдри, черговий волонтерський медичний пункт.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 155,
      depthMeters: 22,
      features: ['Пам\'ятка архітектури метрополітену', 'Особливий акустичний ефект']
    },
    {
      id: 'akademika_barabashova',
      name: 'Академіка Барабашова',
      nameEn: 'Akademika Barabashova',
      lineId: 'blue',
      order: 5,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Також містить обладнані підземні класи для проведення уроків у безпеці. Зарядний куточок, медики, технічна вода.',
      hasUndergroundSchool: true,
      hasTransfer: false,
      travelTimeToNextSeconds: 130,
      depthMeters: 10,
      features: ['Обладнана Метрошкола', 'Вихід до найбільшого ринку у східній Європі']
    },
    {
      id: 'akademika_pavlova',
      name: 'Академіка Павлова',
      nameEn: 'Akademika Pavlova',
      lineId: 'blue',
      order: 6,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Захищені підземні вестибюлі, автономне опалення в холодну пору року, допомога літнім людям.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 120,
      depthMeters: 11,
      features: ['Блоки стін з художніми рельєфами']
    },
    {
      id: 'studentska',
      name: 'Студентська',
      nameEn: 'Studentska',
      lineId: 'blue',
      order: 7,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Високий захист перекриття. Постійно працює черговий інженер, запаси води, розетки.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 135,
      depthMeters: 9,
      features: ['Розташування біля студентських гуртожитків', 'Поруч велика авторозв\'язка']
    },
    {
      id: 'saltivska',
      name: 'Салтівська',
      nameEn: 'Saltivska',
      lineId: 'blue',
      order: 8,
      intervalMinPeak: 6,
      intervalMinOffpeak: 11,
      shelterDetails: 'Кінцева станція. Обладнано пункт «Незламності», працює стаціонарний пункт обігріву, потужні дизель-генератори, медична аптека, дитяча зона.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Героїв Праці (перейменовано у липні 2024 року)',
      travelTimeToNextSeconds: 0,
      depthMeters: 8,
      features: ['Кінцева станція на Салтівці', 'Супер-захищений хаб з розетками та зв\'язком']
    }
  ],
  green: [
    {
      id: 'metrobudivnykiv',
      name: 'Метробудівників',
      nameEn: 'Metrobudivnykiv',
      lineId: 'green',
      order: 1,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Облаштовані зони для тривалого перебування сімей з дітьми, теплі ковдри, питна вода.',
      hasUndergroundSchool: false,
      hasTransfer: true,
      transferStationId: 'sportyvna',
      renameHistory: 'Раніше — Метробудівників імені Ващенка (спрощено у 2016 році)',
      travelTimeToNextSeconds: 120,
      depthMeters: 18,
      features: ['Пересадка на Червону лінію', 'Сучасна звукоізоляція']
    },
    {
      id: 'zakhysnykiv_ukrainy',
      name: 'Захисників України',
      nameEn: 'Zakhysnykiv Ukrainy',
      lineId: 'green',
      order: 2,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Обігрів, розетки для гаджетів, перша домедична допомога, засоби гігієни.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      renameHistory: 'Раніше — Площа Повстання (перейменовано у 2016 році)',
      travelTimeToNextSeconds: 145,
      depthMeters: 14,
      features: ['Вихід до Універмагу «Харків» та Кінного Ринку']
    },
    {
      id: 'arkhitektora_beketova',
      name: 'Архітектора Бекетова',
      nameEn: 'Arkhitektora Beketova',
      lineId: 'green',
      order: 3,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Глибоке закладення, високий безпековий ступінь. Питна вода, постійно діючі туалети, медичний кабінет.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 130,
      depthMeters: 26,
      features: ['Поблизу університетів Нац. Академії міського господарства', 'Гарний освітлювальний купол']
    },
    {
      id: 'derzhprom',
      name: 'Держпром',
      nameEn: 'Derzhprom',
      lineId: 'green',
      order: 4,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Великі вестибюлі, облаштована зарядна станція, Інтернет від провайдерів міста, дитячі ігри.',
      hasUndergroundSchool: false,
      hasTransfer: true,
      transferStationId: 'universytet',
      travelTimeToNextSeconds: 115,
      depthMeters: 24,
      features: ['Пересадка на Салтівську лінію', 'Патріотичний дизайн платформи']
    },
    {
      id: 'naukova',
      name: 'Наукова',
      nameEn: 'Naukova',
      lineId: 'green',
      order: 5,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Двоярусна простора станція. Зарядні станції для телефонів, великий запас технічної та питної води в ємностях.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 140,
      depthMeters: 11,
      features: ['Два поверхи балконів з видом на колії', 'Розташована в діловому центрі']
    },
    {
      id: 'botanichnyi_sad',
      name: 'Ботанічний сад',
      nameEn: 'Botanichnyi Sad',
      lineId: 'green',
      order: 6,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Добре вентильоване приміщення, джерела свіжого повітря, автономні електростанції, питна джерельна вода поруч.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 125,
      depthMeters: 10,
      features: ['Вихід до мальовничого парку «Саржин Яр»']
    },
    {
      id: '23_serpnia',
      name: '23 Серпня',
      nameEn: '23 Serpnia',
      lineId: 'green',
      order: 7,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Декілька виходів, широкі платформи для сидіння, чергова медсестра, ліхтарі аварійного світла.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 150,
      depthMeters: 10,
      features: ['Поруч із пам\'ятником Воїну-визволителю', 'Житловий район Павлове Поле']
    },
    {
      id: 'oleksiiivska',
      name: 'Олексіївська',
      nameEn: 'Oleksiiivska',
      lineId: 'green',
      order: 8,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Місця для сну і сидіння, посилені залізобетонні стіни, аварійні виходи обладнані автономним світлом.',
      hasUndergroundSchool: false,
      hasTransfer: false,
      travelTimeToNextSeconds: 140,
      depthMeters: 11,
      features: ['Сучасне лаконічне оздоблення']
    },
    {
      id: 'peremoha',
      name: 'Перемога',
      nameEn: 'Peremoha',
      lineId: 'green',
      order: 9,
      intervalMinPeak: 7,
      intervalMinOffpeak: 12,
      shelterDetails: 'Кінцева станція. Обладнано підземну Метрошколу для дітей Олексіївки. Великі класи зі свіжим євроремонтом, герметичні двері, сучасна вентиляція та окремий медичний кабінет.',
      hasUndergroundSchool: true,
      hasTransfer: false,
      travelTimeToNextSeconds: 0,
      depthMeters: 8,
      features: ['Найновіша станція (відкрита у 2016 році)', 'Потужна Метрошкола', 'Кінцева на північному заході']
    }
  ]
};

export const METRO_LINES: MetroLine[] = [
  {
    id: 'red',
    name: 'Холодногірсько-Заводська',
    nameEn: 'Kholodnohirsko-Zavodska',
    color: 'bg-red-600',
    textColor: 'text-red-500',
    borderColor: 'border-red-500',
    stations: METRO_STATIONS.red
  },
  {
    id: 'blue',
    name: 'Салтівська',
    nameEn: 'Saltivska',
    color: 'bg-blue-600',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
    stations: METRO_STATIONS.blue
  },
  {
    id: 'green',
    name: 'Олексіївська',
    nameEn: 'Oleksiivska',
    color: 'bg-emerald-600',
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-500',
    stations: METRO_STATIONS.green
  }
];

// Helper to list all stations flat
export const ALL_STATIONS = [
  ...METRO_STATIONS.red,
  ...METRO_STATIONS.blue,
  ...METRO_STATIONS.green
];

// Function to find station by ID
export function findStationById(id: string): Station | undefined {
  return ALL_STATIONS.find(s => s.id === id);
}

// Simple pathfinder algorithm for the Metro (BFS)
export function calculateRoute(startId: string, endId: string): import('../types').RouteResult | null {
  if (startId === endId) {
    return {
      steps: [
        {
          type: 'start',
          stationId: startId,
          durationMinutes: 0,
          instruction: 'Ви вже знаходитесь на потрібній станції.'
        }
      ],
      totalDurationMinutes: 0,
      transfersCount: 0,
      pathStationIds: [startId]
    };
  }

  const startStation = findStationById(startId);
  const endStation = findStationById(endId);
  if (!startStation || !endStation) return null;

  // Build Adjacency List representing the subway system
  interface QueueNode {
    stationId: string;
    path: string[];
    steps: import('../types').RouteStep[];
  }

  const visited = new Set<string>();
  const queue: QueueNode[] = [
    {
      stationId: startId,
      path: [startId],
      steps: [{ type: 'start', stationId: startId, durationMinutes: 0, instruction: `Посадка на станції ${startStation.name}` }]
    }
  ];

  visited.add(startId);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current.stationId === endId) {
      // Re-calculate details & times
      return compileRouteResult(current.steps, current.path);
    }

    const currStation = findStationById(current.stationId)!;

    // Get neighbors:
    const neighbors: { stationId: string; type: 'ride' | 'transfer'; costSec: number }[] = [];

    // 1. Same line neighbors (previous & next station)
    const lineStations = METRO_STATIONS[currStation.lineId];
    const prevIdx = currStation.order - 2;
    const nextIdx = currStation.order;

    if (prevIdx >= 0) {
      const prevStation = lineStations[prevIdx];
      neighbors.push({
        stationId: prevStation.id,
        type: 'ride',
        costSec: prevStation.travelTimeToNextSeconds || 140
      });
    }

    if (nextIdx < lineStations.length) {
      const nextStation = lineStations[nextIdx];
      neighbors.push({
        stationId: nextStation.id,
        type: 'ride',
        costSec: currStation.travelTimeToNextSeconds || 140
      });
    }

    // 2. Transfer station neighbor
    if (currStation.hasTransfer && currStation.transferStationId) {
      neighbors.push({
        stationId: currStation.transferStationId,
        type: 'transfer',
        costSec: 180 // transfer takes ~3 minutes
      });
    }

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor.stationId)) {
        visited.add(neighbor.stationId);
        const nextStationObj = findStationById(neighbor.stationId)!;

        let stepInstruction = '';
        if (neighbor.type === 'ride') {
          stepInstruction = `Їдьте до станції ${nextStationObj.name}`;
        } else {
          const targetLineName = METRO_LINES.find(l => l.id === nextStationObj.lineId)?.name;
          stepInstruction = `Перейдіть на станцію ${nextStationObj.name} (${targetLineName} лінія)`;
        }

        const newStep: import('../types').RouteStep = {
          type: neighbor.type,
          stationId: neighbor.stationId,
          lineId: nextStationObj.lineId,
          durationMinutes: Math.round(neighbor.costSec / 60 * 10) / 10,
          instruction: stepInstruction
        };

        queue.push({
          stationId: neighbor.stationId,
          path: [...current.path, neighbor.stationId],
          steps: [...current.steps, newStep]
        });
      }
    }
  }

  return null;
}

function compileRouteResult(rawSteps: import('../types').RouteStep[], path: string[]): import('../types').RouteResult {
  // Aggregate adjacent ride steps to make instructions concise and pretty
  const finalSteps: import('../types').RouteStep[] = [];
  let totalDuration = 0;
  let transfersCount = 0;

  // Initial step
  const startStat = findStationById(path[0])!;
  const startLineObj = METRO_LINES.find(l => l.id === startStat.lineId)!;
  finalSteps.push({
    type: 'start',
    stationId: path[0],
    lineId: startStat.lineId,
    durationMinutes: 0,
    instruction: `Посадка на станції «${startStat.name}» (${startLineObj.name} лінія)`
  });

  // Cycle through and combine sequential rides
  let currentRideStationStart = path[0];
  let accumulatedRideDuration = 0;
  let stationsInSegment = 0;

  for (let i = 1; i < rawSteps.length; i++) {
    const rStep = rawSteps[i];
    const prevStatId = path[i - 1];
    const currStat = findStationById(rStep.stationId)!;

    if (rStep.type === 'transfer') {
      // If we had a running ride segment, push it first
      if (stationsInSegment > 0) {
        const startStObj = findStationById(currentRideStationStart)!;
        finalSteps.push({
          type: 'ride',
          stationId: prevStatId,
          lineId: startStObj.lineId,
          durationMinutes: Math.ceil(accumulatedRideDuration),
          instruction: `Проїдьте ${stationsInSegment} ${getStationUkrainianPlural(stationsInSegment)} до станції «${findStationById(prevStatId)!.name}»`
        });
        totalDuration += accumulatedRideDuration;
        // reset segment
        accumulatedRideDuration = 0;
        stationsInSegment = 0;
      }

      // Add transfer step
      finalSteps.push({
        type: 'transfer',
        stationId: rStep.stationId,
        lineId: currStat.lineId,
        durationMinutes: 3, // transfer takes average 3 min
        instruction: `Перейдіть на станцію «${currStat.name}» (${METRO_LINES.find(l => l.id === currStat.lineId)?.name} лінія)`
      });
      totalDuration += 3;
      transfersCount++;
      currentRideStationStart = rStep.stationId; // new ride segment starts here
    } else {
      // Its a ride step
      stationsInSegment++;
      accumulatedRideDuration += rStep.durationMinutes;
    }
  }

  // Finalize last ride segment
  if (stationsInSegment > 0) {
    const finalStatId = path[path.length - 1];
    const startStObj = findStationById(currentRideStationStart)!;
    finalSteps.push({
      type: 'ride',
      stationId: finalStatId,
      lineId: startStObj.lineId,
      durationMinutes: Math.ceil(accumulatedRideDuration),
      instruction: `Проїдьте ${stationsInSegment} ${getStationUkrainianPlural(stationsInSegment)} до станції «${findStationById(finalStatId)!.name}»`
    });
    totalDuration += accumulatedRideDuration;
  }

  // End destination tag
  const endStatObj = findStationById(path[path.length - 1])!;
  finalSteps.push({
    type: 'end',
    stationId: endStatObj.id,
    durationMinutes: 0,
    instruction: `Ви прибули на станцію «${endStatObj.name}»`
  });

  return {
    steps: finalSteps,
    totalDurationMinutes: Math.ceil(totalDuration),
    transfersCount,
    pathStationIds: path
  };
}

function getStationUkrainianPlural(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) return 'станцій';
  if (mod10 === 1) return 'станцію';
  if (mod10 >= 2 && mod10 <= 4) return 'станції';
  return 'станцій';
}
