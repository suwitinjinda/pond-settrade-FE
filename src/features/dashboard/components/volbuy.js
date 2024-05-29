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
    const sortedArray = (d[0].data).sort((a, b) => b.ValueBuy - a.ValueBuy);
    const topValues = sortedArray.slice(0, 20);
    console.log(topValues);
    const latestDate = d[0].date;

    const symbolsArray = topValues.map(obj => obj.Symbol);
    console.log(symbolsArray);
    const volB = topValues.map(obj => obj.ValueBuy);
    console.log(volB);
    const volS = topValues.map(obj => obj.ValueSell);
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
          label: 'Value Buy',
          data: volB,
          backgroundColor: 'rgba(53, 162, 235, 1)',
        },
        {
          label: 'Value Sell',
          data: volS,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };

    return (
      <TitleCard title={"Top 20 company Value Buy On " + latestDate}>
        <Bar options={options} data={data} />
      </TitleCard>
    )
  } else {
    let a = d.filter(data => data.date === date)
    console.log(a[0].data)
    const sortedArray = (a[0].data).sort((a, b) => b.ValueBuy - a.ValueBuy);
    console.log(sortedArray)
    const topValues = sortedArray.slice(0, 20);
    console.log(topValues);
    const latestDate = date;

    const symbolsArray = (topValues).map(obj => obj.Symbol);
    console.log(symbolsArray);
    const volB = (topValues).map(obj => obj.ValueBuy);
    console.log(volB);
    const volS = (topValues).map(obj => obj.ValueSell);
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
          label: 'Value Buy',
          data: volB,
          backgroundColor: 'rgba(53, 162, 235, 1)',
        },
        {
          label: 'Value Sell',
          data: volS,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    };

    return (
      <TitleCard title={"Top 20 company Value Buy On " + latestDate}>
        <Bar options={options} data={data} />
      </TitleCard>


    )
  }

}


export default Volbuy