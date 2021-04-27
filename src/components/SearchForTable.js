import React from 'react';
import './TableBlock.scss'

const SearchForTable = ({setCondition, setColumn, setSearchName, searchName}) => {
    const selectColumn = (e) => {
        setColumn(e.target.value)
    }
    const selectCondition = (e) => {
        setCondition(e.target.value)
    }

    const tableSearch = (e) => {
        setSearchName(e.target.value)
    }
    // const tableSearch = (e) => {
    //     debugger
    //     const phrase =e.target.value;
    //     const table = transportListAll;
    //     const regPhrase = new RegExp(phrase.value, 'i');
    //     let flag = false;
    //     // var table = document.getElementById('info-table');
    //     // var regPhrase = new RegExp(phrase.value, 'i');
    //     // var flag = false;
    //     for (let i = 1; i < table.rows.length; i++) {
    //         flag = false;
    //         for (let j = table.rows[i].cells.length - 1; j >= 0; j--) {
    //             flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
    //             if (flag) break;
    //         }
    //         if (flag) {
    //             table.rows[i].style.display = "";
    //         } else {
    //             table.rows[i].style.display = "none";
    //         }
    //
    //     }
    // }
    return (
        <div className={'searchForTableBlock'}>
            <form action="">
                <p>FILTER</p>
                <label> Выбор колонки: </label>
                <select onChange={selectColumn}>
                    <option value=''></option>
                    <option value='name'>название (name)</option>
                    <option value="quantity">количество (quantity)</option>
                    <option value="distance">расстояние (distance)</option>
                </select>
                <label> Выбор условия: </label>
                <select onChange={selectCondition}>
                    <option value=''></option>
                    <option value='equal'>равно (equal)</option>
                    <option value="contains">содержит (contains)</option>
                    <option value="more">больше (more)</option>
                    <option value="less">меньше (less)</option>
                </select>
                <div><input value={searchName} onChange={tableSearch} type="text"
                            placeholder={'Введите значение для поиска'}
                            size="50"/>
                </div>
                <button>Поиск (Search)</button>
            </form>
        </div>
    );
};

export default SearchForTable;
