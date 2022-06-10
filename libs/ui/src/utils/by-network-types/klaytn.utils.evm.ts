// @ts-ignore
import CaverExtKAS from 'caver-js-ext-kas';

let caverExtCas: any;

export const getCaverExtCas = () => {
  if (!caverExtCas) {
    caverExtCas = new CaverExtKAS();
  }

  return caverExtCas;
};
