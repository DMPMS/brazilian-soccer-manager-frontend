import { useDispatch } from 'react-redux';

import { RuleType } from '../../../shared/types/Rule.type';
import { useAppSelector } from '../../hooks';
import { setRulesAction } from '.';

export const useRuleReducer = () => {
  const dispatch = useDispatch();
  const { rules } = useAppSelector((state) => state.ruleReducer);

  const setRules = (rules: RuleType[]) => {
    dispatch(setRulesAction(rules));
  };

  return {
    rules,
    setRules,
  };
};
