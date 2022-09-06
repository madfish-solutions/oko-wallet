export interface Word {
  id: number;
  index: number;
  word: string;
  selected: boolean;
  shuffledWordId: number;
}

export interface ShuffleWord {
  shuffledId: number;
  word: string;
  selected: boolean;
}

export interface SelectedContainer {
  id: number;
  force: boolean;
}
