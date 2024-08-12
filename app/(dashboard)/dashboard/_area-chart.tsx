'use client';
import { AreaChart } from '@tremor/react';
import { useEffect } from 'react';
import AOS from 'aos';
import { formatDateIndonesian } from '@/libs/utils';

const dataFormatter = (number: number) => `${number.toString()}`;

interface AreaChartHeroProps {
  chartData: MonthlyAnswerCount[] | undefined;
}

export function AreaChartHero({ chartData }: AreaChartHeroProps) {
  if (!chartData) {
    return null;
  }

  const formatedAnswers = chartData.map((answer) => ({
    month: formatDateIndonesian(answer.month.toString()),
    count: answer.count,
  }));

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  }, []);
  return (
    <div data-aos={'fade-up'} className="w-full max-w-sm lg:max-w-3xl border-l-2 border-t-2 border-r-4 border-b-4 border-black rounded-lg overflow-hidden">
      <AreaChart
        animationDuration={600}
        showAnimation
        className="h-80 bg-white p-4 lg:p-8"
        data={formatedAnswers}
        index="month"
        categories={['count']}
        colors={['indigo']}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
