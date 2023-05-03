import { ObjectValue } from './ObjectValue';
export class Uuid extends ObjectValue<string> {
  constructor(private uuid: string) {
    super(uuid);
  }
}
