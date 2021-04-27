import React, {useEffect, useState} from 'react';
import './TableBlock.scss'
import axios from "axios";
import SearchForTable from "./SearchForTable";
import Pagination from "./Pagination";


// const state = {
// columnsName: [{date: 'Дата', name: 'Название', quantity: 'Количество(кг)', distance: 'Расстояние(км)'}],
//     data: [
//         {date: '12.05.2010', name: 'Сырье', quantity: 1500, distance: 500},
//         {date: '05.02.2222', name: 'Одежда', quantity: 100, distance: 2500},
//         {date: '25.12.2333', name: 'Тара', quantity: 300, distance: 1_500},
//         {date: '10.02.2000', name: 'Провиант', quantity: 150, distance: 3_500},
//     ]
// }

const Table = () => {
        const [transportList, setTransportList] = useState([])
        const [column, setColumn] = useState('')
        const [condition, setCondition] = useState('')
        const [searchName, setSearchName] = useState('')

        useEffect(() => {
            axios.get('http://localhost:3001/api/get')
                .then((response) => {
                    setTransportList(response.data)
                    console.log(response)
                })
        }, [])
        const firstObj = transportList.length ? transportList[0] : {};
        const tableHeader = Object.keys(firstObj).map((header, i) => {
            return <th key={header + i}>{header}</th>
        })
        tableHeader.shift(1)

        const filteredTransportList = transportList.filter(n => {
            return (
                ((!column || 'name' === column) &&
                    (!condition || 'equal' === condition) &&
                    (!searchName || n.name === searchName)) ||
                ((!column || 'quantity' === column) &&
                    (!condition || 'equal' === condition) &&
                    (!searchName || String(n.quantity) === searchName)) ||
                ((!column || 'distance' === column) &&
                    (!condition || 'equal' === condition) &&
                    (!searchName || String(n.distance) === searchName))

                ||

                ((!column || 'quantity' === column) &&
                    (!condition || 'more' === condition) &&
                    (!searchName || +n.quantity >= +searchName))
                ||
                ((!column || 'distance' === column) &&
                    (!condition || 'more' === condition) &&
                    (!searchName || +n.distance >= +searchName))

                ||

                ((!column || 'quantity' === column) &&
                    (!condition || 'less' === condition) &&
                    (!searchName || +n.quantity <= +searchName))
                ||
                ((!column || 'distance' === column) &&
                    (!condition || 'less' === condition) &&
                    (!searchName || +n.distance <= +searchName))

                ||

                ((!column || 'name' === column) &&
                    (!condition || 'contains' === condition) &&
                    (!searchName || n.name.toLowerCase().includes(searchName))) ||
                ((!column || 'quantity' === column) &&
                    (!condition || 'contains' === condition) &&
                    (!searchName || String(n.quantity).includes(searchName))) ||
                ((!column || 'distance' === column) &&
                    (!condition || 'contains' === condition) &&
                    (!searchName || String(n.distance).includes(searchName)))
            )
        });
        const transportListAll = filteredTransportList.map((el, i, array) => {
            const date = (new Date(el.date)).toLocaleDateString()
            return (
                <tr key={el.id + i}>
                    <td>{date}</td>
                    <td>{el.name}</td>
                    <td>{el.quantity}</td>
                    <td>{el.distance}</td>
                </tr>
            )
        })
        return (
            <div>
                <div>
                    <SearchForTable
                        setColumn={setColumn}
                        setCondition={setCondition}
                        setSearchName={setSearchName}
                        searchName={searchName}
                    />
                </div>
                Search: {column}: {condition}: {searchName}
                <div className="tableBlock">
                    <table>
                        <thead>
                        <tr>
                            {tableHeader}
                        </tr>
                        </thead>
                        <Pagination
                            transportListAll={transportListAll}
                            setTransportList={setTransportList}
                        />
                    </table>
                </div>
            </div>
        );
    }
;

export default Table;