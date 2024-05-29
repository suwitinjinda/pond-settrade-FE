import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
// import { useState } from 'react'
import Volbuy from './components/volbuy'
import VolbuyAccu from './components/volbuyAccu'
import VolsellAccu from './components/volSellAccu'

//custom
import React, { useState, useEffect } from 'react';
import axios from "axios";

const statsData = [
    { title: "New Users", value: "34.7k", icon: <UserGroupIcon className='w-8 h-8' />, description: "↗︎ 2300 (22%)" },
    { title: "Total Sales", value: "$34,545", icon: <CreditCardIcon className='w-8 h-8' />, description: "Current month" },
    { title: "Pending Leads", value: "450", icon: <CircleStackIcon className='w-8 h-8' />, description: "50 in hot leads" },
    { title: "Active Users", value: "5.6k", icon: <UsersIcon className='w-8 h-8' />, description: "↙ 300 (18%)" },
]



function Dashboard() {
    const [file, setFile] = useState(null);
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [dateBack, setDateBack] = useState("7");
    const [getData, getDataTotal] = useState('');

    React.useEffect(() => {
        axios.get("http://localhost:5000/api/items")
            .then(response => {
                console.log(response.data)
                if ((response.data).length > 0)
                    getDataTotal(response.data)
            })
            .catch(error => console.error(error));
    }, []);



    const topVol = () => {
        if (getData !== "") {
            const sortDate = getData.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
            console.log(sortDate);
            // const sortedArray = (getData[0].data).sort((a, b) => b.VolBuy - a.VolBuy);
            // const top10Values = sortedArray.slice(0, 10);

            // console.log(top10Values);
            // Volbuy(top10Values)

            return (
                <>
                    {Volbuy(sortDate, date)}
                </>
            )
        }

    }
    const volAccu = () => {
        if (getData !== "" && company !== "") {
            const sortDate = getData.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
            console.log(company);
            // const sortedArray = (getData[0].data).sort((a, b) => b.VolBuy - a.VolBuy);
            // const top10Values = sortedArray.slice(0, 10);

            // console.log(top10Values);
            // Volbuy(top10Values)

            return (
                <>
                    {VolbuyAccu(sortDate, company, dateBack)}
                </>
            )
        }

    }
    const volSellAccu = () => {
        if (getData !== "") {
            const sortDate = getData.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
            console.log(sortDate);
            // const sortedArray = (getData[0].data).sort((a, b) => b.VolBuy - a.VolBuy);
            // const top10Values = sortedArray.slice(0, 10);

            // console.log(top10Values);
            // Volbuy(top10Values)

            return (
                <>
                    {VolsellAccu(sortDate, company)}
                </>
            )
        }

    }
    const dispatch = useDispatch()


    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }))
    }

    const FileUpload = () => {
        // const [file, setFile] = useState(null);

        const handleFileChange = (event) => {
            setFile(event.target.files[0]);
        };

        const addData = (a) => {
            console.log(a)
            axios.post("http://localhost:5000/api/items/add", { a })
                .then(response => {
                    console.log(response.data)
                    // getDataTotal(response.data)
                    alert(response.data)
                    window.location.reload();
                })
                .catch(error => console.error(error));
        }

        return (
            <div>
                <input type="file" onChange={handleFileChange} /> <button onClick={() => addData(file.name)}><b>IMPORT</b></button>  {SelectSymol()}
                {file && (
                    <div>
                        {/* <p>File Name: {file.name}</p> */}
                        {/* <p>File Size: {file.size} bytes</p>
                        <p>File Type: {file.type}</p>
                        <p>Last Modified: {file.lastModifiedDate.toLocaleDateString()}</p> */}
                    </div>
                )}
            </div>
        );
    };

    const SelectSymol = () => {
        if (getData !== "") {
            // console.log(getData[0].data)
            const symbolsArray = (getData[0].data).map(obj => obj.Symbol);

            var sortedNames = symbolsArray.sort();
            // console.log(sortedNames)

            const sortDate1 = getData.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });
            const dateArray = sortDate1.map(obj => obj.date);
            // console.log(symbolsArray)
            const handleSelectChange = (event) => {
                setCompany(event.target.value);
            };
            const handleDateChange = (event) => {
                setDate(event.target.value);
            };
            const handleDateBackChange = (event) => {
                setDateBack(event.target.value);
            };

            return (
                <div>
                    {/* <h2>Select Example</h2> */}
                    <hr></hr>
                    <select value={company} onChange={handleSelectChange}>
                        <option value="">Select company...</option>
                        {sortedNames.map(data => {
                            return (
                                <>
                                    <option value={data}>{data}</option>
                                </>
                            )
                        })}
                    </select>
                    <select value={date} onChange={handleDateChange}>
                        <option value="">Select date...</option>
                        {dateArray.map(data => {
                            return (
                                <>
                                    <option value={data}>{data}</option>
                                </>
                            )
                        })}
                    </select>
                    <select value={date} onChange={handleDateBackChange}>
                        <option value="">ย้อนหลัง...</option>
                        <option value="7">7</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                    </select>
                    {/* <p>Selected: {selectedOption}</p> */}
                </div>
            );
        }
    };

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} /> */}
            {FileUpload()}

            {/** ---------------------- Different stats content 1 ------------------------- */}
            {/* <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div> */}



            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid gap-6">
                {/* <LineChart /> */}
                {/* <BarChart /> */}
                {topVol()}
            </div>
            {/* <div>
                {SelectSymol()}
            </div> */}
            <div className="grid gap-6">
                {/* <LineChart /> */}
                {/* <BarChart /> */}
                {volAccu()}
            </div>
            <div className="grid gap-6">
                {/* <LineChart /> */}
                {/* <BarChart /> */}
                {/* {volSellAccu()} */}
            </div>

            {/** ---------------------- Different stats content 2 ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/** ---------------------- User source channels table  ------------------------- */}

            {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    )
}

export default Dashboard