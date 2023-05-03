import { ObjectValue } from '../../../../shared/domain/ObjectValue';

export class Amount extends ObjectValue<number> {
  constructor(private amount: number) {
    super(amount);
  }
}
