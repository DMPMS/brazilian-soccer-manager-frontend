import { useEffect } from 'react';

import { URL_RULE } from '../../../../shared/constants/urls';
import { MethodsEnum } from '../../../../shared/enums/Methods.enum';
import { useNewRequests } from '../../../../shared/hooks/useNewRequests';
import { RuleType } from '../../../../shared/types/Rule.type';
import { useRuleReducer } from '../../../../store/reducers/ruleReducer/useRuleReducer';

export const useRule = () => {
  const { rules, setRules } = useRuleReducer();

  const { newRequest } = useNewRequests();

  useEffect(() => {
    if (!rules || rules.length === 0) {
      newRequest(MethodsEnum.GET, URL_RULE).then((data: RuleType[]) => {
        setRules(data);
      });
    }
  }, []);

  return {
    rules,
  };
};
