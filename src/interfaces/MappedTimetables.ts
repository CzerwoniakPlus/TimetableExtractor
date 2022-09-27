interface MappedTimetablesItem {
  className: string;
  timetable: Uint8Array;
}

export type MappedTimetables = Array<MappedTimetablesItem>;
