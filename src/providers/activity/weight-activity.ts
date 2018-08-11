import {Activity} from './activity';

export function isWeightActivity (activity: Activity): activity is WeightActivity {
  return activity['type'] === 'WEIGHT';
}

export class WeightActivity extends Activity {
  protected type = 'WEIGHT';

  constructor(
    public time: Date,
    public weight: number,
  ) {
    super();
  }
}
