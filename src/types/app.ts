export type NoteType = {
  id: number;
  text: string;
  tags: String[];
};

export type TypeTag = {
  id: number;
  value: String;
}

export interface Notes {
  notes: Array<NoteType>;
  tags: Array<TypeTag[]>;
}