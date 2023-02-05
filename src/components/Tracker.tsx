import { Cell, Label, Pie, PieChart } from 'recharts';
import { Fasting } from '@/common/constants';
import moment from 'moment';

// stupid typings errors from moment
// eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
const toHours = (minutes: number) => moment.utc().startOf('day').add(minutes, 'minutes').format('HH:mm');

export const Tracker = ({ fastingMinutes }: { fastingMinutes: number }) => {
  const leftMinutes = Fasting._16_8_Minutes - fastingMinutes;
  const data = [
    { name: 'left', value: leftMinutes < 0 ? 0 : leftMinutes },
    { name: 'fasting', value: fastingMinutes },
  ];

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const trackerLabel = `${fastingMinutes === 0 ? 'Good Luck!' : toHours(fastingMinutes)}${
    fastingMinutes > Fasting._16_8_Minutes ? '🎉' : ''
  }`;

  return (
    <PieChart width={256} height={256}>
      <Pie data={data} startAngle={0} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
        <Cell key="cell-left" fill="#c3cdee" />
        <Cell key="cell-fasting" fill="#8884d8" />
        <Label width={32} position="center">
          {trackerLabel}
        </Label>
      </Pie>
    </PieChart>
  );
};
