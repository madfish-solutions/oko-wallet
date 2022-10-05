import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { useCallback, useEffect, useState } from 'react';

import { passwordValidationInitialState } from '../constants/password-validation';
import {
  lettersNumbersMixtureRegx,
  specialCharacterRegx,
  uppercaseLowercaseMixtureRegx
} from '../constants/regex-validation';

export const useValidationMessages = <T extends { password?: boolean | undefined }>(
  password: string,
  dirtyFields: T
) => {
  const [passwordValidationMessages, setPasswordValidationMessages] = useState(passwordValidationInitialState);
  const updateValidationMessageState = useCallback(
    (id: number, valid: boolean) =>
      setPasswordValidationMessages(prev =>
        prev.map(item => {
          if (item.id === id) {
            return {
              ...item,
              valid
            };
          }

          return item;
        })
      ),
    []
  );

  useEffect(() => {
    if (!isNotEmptyString(password)) {
      setPasswordValidationMessages(passwordValidationInitialState);
    }

    if (isDefined(dirtyFields?.password)) {
      // check password length
      if (password.trim().length < 8 || password.trim().length > 30) {
        updateValidationMessageState(1, false);
      } else if (isNotEmptyString(password)) {
        updateValidationMessageState(1, true);
      }

      // check mix uppercase and lowercase letters
      if (!uppercaseLowercaseMixtureRegx.test(password)) {
        updateValidationMessageState(2, false);
      } else {
        updateValidationMessageState(2, true);
      }

      // check mix of letters and numbers
      if (!lettersNumbersMixtureRegx.test(password)) {
        updateValidationMessageState(3, false);
      } else if (isNotEmptyString(password)) {
        updateValidationMessageState(3, true);
      }

      // check special character
      if (!specialCharacterRegx.test(password)) {
        updateValidationMessageState(4, false);
      } else if (isNotEmptyString(password)) {
        updateValidationMessageState(4, true);
      }
    }
  }, [dirtyFields?.password, password, updateValidationMessageState]);

  return { passwordValidationMessages };
};
