export const getDailyStats = async () => {
  const rescuetime_api_key = process.env.RESCUETIME_API_KEY;
  let yesterdayData;
  try {
    const response = await fetch(
      `https://www.rescuetime.com/anapi/daily_summary_feed?key=${rescuetime_api_key}`
    );
    const data = await response.json();
    yesterdayData = data[0];
    console.log(`🚀 ~ getDailyStats ~ yesterday:`, yesterday);
  } catch (error) {
    console.log(`🚀 ~ getDailyStats ~ error`, error);
  }

  const labels = [
    'Very Distracted 💀',
    'Distracted 🗿',
    'Neutral 🤨',
    'Productive 😎',
    'Very Productive 🤩',
  ];

  const datasets = [
    {
      label: 'Time Spent',
      data: [
        yesterdayData.very_distracting_percentage,
        yesterdayData.distracting_percentage,
        yesterdayData.neutral_percentage,
        yesterdayData.productive_percentage,
        yesterdayData.very_productive_percentage,
      ],
      backgroundColor: ['#D61800', '#DC685A', '#B1C1BF', '#3D80E0', '#0055C4'],
      borderColor: ['#D61800', '#DC685A', '#B1C1BF', '#3D80E0', '#0055C4'],
    },
  ];

  const dataInHours = [
    yesterdayData.very_distracting_duration_formatted,
    yesterdayData.distracting_duration_formatted,
    yesterdayData.neutral_duration_formatted,
    yesterdayData.productive_duration_formatted,
    yesterdayData.very_productive_duration_formatted,
  ];
  console.log(`🚀 ~ getDailyStats ~ dataInHours:`, dataInHours);

  return {
    labels,
    datasets,
    dataInHours,
  };
};
