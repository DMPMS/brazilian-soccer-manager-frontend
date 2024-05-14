import { useEffect } from 'react';

import { URL_RULE } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useRuleReducer } from '../../../store/reducers/ruleReducer/useRuleReducer';

export const useRule = () => {
  const { rules, setRules } = useRuleReducer();
  const { request } = useRequests();

  useEffect(() => {
    if (!rules || rules.length === 0) {
      request(URL_RULE, MethodsEnum.GET, setRules);
    }
  }, []);

  return {
    rules,
  };
};
