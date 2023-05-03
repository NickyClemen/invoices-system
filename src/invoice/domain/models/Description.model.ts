import { ObjectValue } from '../../../../shared/domain/ObjectValue';

export class Description extends ObjectValue<string> {
  constructor(private description: string) {
    super(description);
  }
}
