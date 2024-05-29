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

function Volbuy(d, c, b) {
  let dateBack = parseInt(b)
  console.log(dateBack)
  // const sortedArray = (d[0].data).sort((a, b) => b.VolBuy - a.VolBuy);
  // const topValues = sortedArray.slice(0, 10);
  // console.log(topValues);
  // const latestDate = d[0].date;

  const dateData = d.map(obj => obj.date)
  console.log(dateData)
  const symbFilter = d.map(data => {
    console.log(data)
    let a = (data.data).filter(d => d.Symbol === c)
    console.log(a)
    return a[0].ValueNet
  })
  const symbFilterSell = d.map(data => {
    console.log(data)
    let a = (data.data).filter(d => d.Symbol === c)
    console.log(a)
    return a[0].VolSell
  })
  console.log(symbFilter)
  let finaldate = dateData.slice(0, dateBack);
  console.log(finaldate)
  let finalbuy = symbFilter.slice(0, dateBack);
  console.log(finalbuy)
  let finalsell = symbFilterSell.slice(0, dateBack);
  console.log(finalsell)
  // const symbolsArray = topValues.map(obj => obj.Symbol);
  // console.log(symbolsArray);
  // const volB = topValues.map(obj => obj.VolBuy);
  // console.log(volB);
  // const volS = topValues.map(obj => obj.VolSell);
  // console.log(volS);

  const colorShow = finalbuy.map(data => {
    if (data > 0) {
      return "rgba(53, 162, 235, 1)"
    } else {
      return "rgba(255, 99, 132, 1)"
    }
  })
  console.log(colorShow)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  const labels = finaldate;

  const data = {
    labels,
    datasets: [
      {
        label: 'Value Net',
        data: finalbuy,
        backgroundColor: colorShow,
      },
    ]
  };

  return (
    <TitleCard title={"Value Net (" + c + ")"}>
      <Bar options={options} data={data} />
    </TitleCard>


  )
}


export default Volbuy