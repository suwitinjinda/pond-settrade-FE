import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Volbuy(d, c) {
  console.log(d)
  const sortedArray = (d[0].data).sort((a, b) => b.VolSell - a.VolSell);
  const topValues = sortedArray.slice(0, 10);
  console.log(topValues);
  const latestDate = d[0].date;

  const dateData = d.map(obj => obj.date)
  console.log(dateData)
  const symbFilter = d.map(data => {
    console.log(data)
    let a = (data.data).filter(d => d.Symbol === c)
    console.log(a)
    return a[0].VolSell
  })
  console.log(symbFilter)
  const symbolsArray = topValues.map(obj => obj.Symbol);
  console.log(symbolsArray);
  const volB = topValues.map(obj => obj.VolBuy);
  console.log(volB);
  const volS = topValues.map(obj => obj.VolSell);
  // console.log(volS);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  const labels = dateData;

  const data = {
    labels,
    datasets: [
      {
        label: 'Vol Sell',
        data: symbFilter,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ]
  };

  return (
    <TitleCard title={"Volume Sell (" + c + ")"}>
      <Bar options={options} data={data} />
    </TitleCard>


  )
}


export default Volbuy