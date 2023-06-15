
export interface GroupPercentageData {
  category: string;
  percentage_difference: number;
  timeframe: string;
}

export interface AccumulativeInvestmentProps {
  name: string;
  data: { x: string; y: string }[];
}

function calculateInvestment(data: GroupPercentageData[]): AccumulativeInvestmentProps[] {
  const outputArray: AccumulativeInvestmentProps[] = [];

  const groupedData: { [key: string]: GroupPercentageData[] } = data.reduce(
    (acc: { [key: string]: GroupPercentageData[] }, obj) => {
      const category = obj.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(obj);
      return acc;
    },
    {}
  );

  // Create output array in the desired format
  for (const category in groupedData) {
    const data = groupedData[category];
    let investment = 10000;

    const dataPoints = data.map((item: GroupPercentageData) => {
      const multiplier = 1 + item.percentage_difference / 100;
      investment *= multiplier;
      return {
        x: item.timeframe,
        y: investment.toFixed(2),
      };
    });
    outputArray.push({
      name: category,
      data: [
        {
          x: "Start",
          y: "10000",
        },
        ...dataPoints,
      ],
    });
  }
  return outputArray;
}


export default calculateInvestment;
