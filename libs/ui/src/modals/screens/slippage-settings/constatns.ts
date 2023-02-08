import { requiredFieldRule } from '../../../screens/send-confirmation/components/confirmation/constants';

export const OWN = 'own';

export const slippageOptions = [
  { title: '0.5%', value: '0.5' },
  { title: '1%', value: '1' },
  { title: '3%', value: '3' },
  { title: OWN, value: OWN }
];

export const ownSlippageRules = {
  ...requiredFieldRule,
  validate: {
    checkValue: (value: string) => {
      const numberValue = Number(value);
      if (numberValue === 0) {
        return 'Value must be bigger than zero';
      } else if (numberValue >= 100) {
        return "Haha! Nice try, but the price can't lose more than 100%";
      } else if (numberValue > 50) {
        return 'Set slippage <= 50%';
      }

      return true;
    },
    checkIsCorrectAmount: (value: string) => Number(value) > 0 || 'Please, enter correct amount'
  }
};
