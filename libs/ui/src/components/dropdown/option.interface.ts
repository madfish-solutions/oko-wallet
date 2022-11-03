import { TestIDProps } from '../../interfaces/test-id.props';

export interface Option<OptionType = string> extends TestIDProps {
  id: number;
  title: string;
  value: OptionType;
}
