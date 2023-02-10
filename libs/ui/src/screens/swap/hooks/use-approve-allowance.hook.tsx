import { useCallback, useEffect, useMemo, useState } from 'react';
import { from, Subject, map } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

import { getApproveData } from '../../../api/1inch/1inch';
import { ONE_INCH_ICON, ONE_INCH_ROUTER_ADDRESS, ONE_INCH_SITE } from '../../../api/1inch/constants';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { Token } from '../../../interfaces/token.interface';
import { useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { OperationsEnum } from '../../send-confirmation/enums';

export const useApproveAllowance = () => {
  const { chainId } = useSelectedNetworkSelector();
  const { navigate } = useNavigation();

  const [isApproveAllowanceLoading, setIsApproveAllowanceLoading] = useState(false);

  const approveAllowance$ = useMemo(() => new Subject<Token>(), []);

  const onApprovePress = useCallback((token: Token) => approveAllowance$.next(token), []);

  useEffect(() => {
    const subscription = approveAllowance$
      .pipe(
        tap(() => setIsApproveAllowanceLoading(true)),
        concatMap(token =>
          from(getApproveData(chainId, token.tokenAddress)).pipe(
            map(approveDataResponse =>
              navigate(ScreensEnum.SendConfirmation, {
                transferParams: {
                  token,
                  transactionParams: approveDataResponse,
                  receiverPublicKeyHash: approveDataResponse.to,
                  value: approveDataResponse.value,
                  operation: OperationsEnum.Approve,
                  dAppInfo: {
                    origin: ONE_INCH_SITE,
                    name: ONE_INCH_ROUTER_ADDRESS,
                    favicon: ONE_INCH_ICON
                  }
                }
              })
            )
          )
        ),
        tap(() => setIsApproveAllowanceLoading(false))
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  return {
    onApprovePress,
    isApproveAllowanceLoading
  };
};
