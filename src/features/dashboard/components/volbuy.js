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

function Volbuy(d, date) {
  console.log(d)
  if (date === "") {
    const sortedArray = (d[0].data).sort((a, b) => b.VolBuy - a.VolBuy);
    const topValues = sortedArray.slice(0, 15);
    console.log(topValues);
    const latestDate = d[0].date;

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

    const labels = symbolsArray;

    const data = {
      labels,
      datasets: [
        {
          label: 'Vol Buy',
          data: volB,
          backgroundColor: 'rgba(53, 162, 235, 1)',
        },
        {
          label: 'Vol Sell',
          data: volS,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };

    return (
      <TitleCard title={"Top 15 company volume Buy On " + latestDate}>
        <Bar options={options} data={data} />
      </TitleCard>
    )
  } else {
    let a = d.filter(data => data.date === date)
    console.log(a[0].data)
    const sortedArray = (a[0].data).sort((a, b) => b.VolBuy - a.VolBuy);
    console.log(sortedArray)
    const topValues = sortedArray.slice(0, 15);
    console.log(topValues);
    const latestDate = date;

    const symbolsArray = (topValues).map(obj => obj.Symbol);
    console.log(symbolsArray);
    const volB = (topValues).map(obj => obj.VolBuy);
    console.log(volB);
    const volS = (topValues).map(obj => obj.VolSell);
    // console.log(volS);

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      },
    };

    const labels = symbolsArray;

    const data = {
      labels,
      datasets: [
        {
          label: 'Vol Buy',
          data: volB,
          backgroundColor: 'rgba(53, 162, 235, 1)',
        },
        {
          label: 'Vol Sell',
          data: volS,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };

    return (
      <TitleCard title={"Top 15 company volume Buy On " + latestDate}>
        <Bar options={options} data={data} />
      </TitleCard>


    )
  }

}


export default Volbuy