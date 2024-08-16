'use client';
import { BarChart } from '@tremor/react';
import AOS from 'aos';
import { useEffect } from 'react';

const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();

interface BarChartHeroProps {
  chartData: { title: string; answerCount: number }[] | undefined;
}

export const BarChartHero = ({ chartData }: BarChartHeroProps) => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    });
  });

  if (!chartData) {
    return null;
  }

  return (
    <div data-aos={'fade-up'} className="w-full max-w-sm lg:max-w-lg  border-l-2 border-t-2 border-r-4 border-b-4 border-black rounded-lg overflow-hidden">
      <BarChart
        data={chartData}
        animationDuration={600}
        showAnimation
        className="bg-white p-4 lg:p-8"
        index="title"
        categories={['answerCount']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
};
