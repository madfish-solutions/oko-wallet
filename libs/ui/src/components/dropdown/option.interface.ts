export interface Option<OptionType = string> {
  id: number;
  title: string;
  value: OptionType;
  testID?: string;
}
