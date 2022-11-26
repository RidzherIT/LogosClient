import React from "react";
import { useState } from "react";


export default function UpdateProduct({ id, func }) {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [sale, setSale] = useState('');
    const [kcal, setKcal] = useState('');
    const [protein, setProtein] = useState('')
    const [carb, setCarb] = useState('');
    const [fat, setFat] = useState('');
    const [weight, setWeight] = useState('');
    const [type, setType] = useState('');
    const update = async () => {
        const data = new FormData();

        data.append('title', title);
        data.append('description', desc);
        data.append('sale', sale);
        data.append('kcal', kcal);
        data.append('protein', protein);
        data.append('carb', carb);
        data.append('fat', fat);
        data.append('weight', weight);
        data.append('type', type);
        if (file) {
            data.append('image', file);
        }
        data.append('id', `${id}`)
        const res = await fetch('https://server-logos.onrender.com/product/put', {
            method: 'PUT',
            body: data,
        });
        const json = await res.json();
        setFile(null);
        setTitle('');
        setDesc('');
        setSale('');
        setKcal('');
        setProtein('');
        setCarb('');
        setFat('');
        setWeight('');
        setType('');
        func(false);
        if (json) {
            alert('Товар был успешно обновлен!');
        }
    }
    const deleteProduct = async () => {
        const data = {
            id: +id
        }
        const res = await fetch('https://server-logos.onrender.com/product/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        const json = await res.json();
        func(false);
        if (json) {
            alert('Товар был успешно удален!');
        }
    }
    return (
        <>
            <div className="admin-auth__wrapper fixed">
                <button onClick={() => func(false)} className="admin__btn">Закрыть окно</button>
                <label className="admin__create-img__wrapper" htmlFor="admin__create-img">
                    <p className="admin__btn">Выберите изображение .png</p>
                    {!file && <p className="admin__text">Изображение не выбрано</p>}
                    {file && <p className="admin__text">Изображение выбрано</p>}
                    <input className="admin__create-img" id="admin__create-img" onChange={e => setFile(e.target.files[0])} type="file" />
                </label>
                <input placeholder="Введите заголовок" className="admin__input" onChange={e => setTitle(e.target.value)} value={title} type="text" />
                <input placeholder="Введите описание" className="admin__input" onChange={e => setDesc(e.target.value)} value={desc} type="text" />
                <input placeholder="Введите цены" className="admin__input" onChange={e => setSale(e.target.value)} value={sale} type="number" />
                <input placeholder="Введите калорийность" className="admin__input" onChange={e => setKcal(e.target.value)} value={kcal} type="number" />
                <input placeholder="Введите кол-во белка" className="admin__input" onChange={e => setProtein(e.target.value)} value={protein} type="number" />
                <input placeholder="Введите кол-во углеводов" className="admin__input" onChange={e => setCarb(e.target.value)} value={carb} type="number" />
                <input placeholder="Введите кол-во жиров" className="admin__input" onChange={e => setFat(e.target.value)} value={fat} type="number" />
                <input placeholder="Введите вес" className="admin__input" onChange={e => setWeight(e.target.value)} value={weight} type="number" />
                <div className="admin__list">
                    <ul>
                        <h2 className="admin__subtitle">Тип товара</h2>
                        <li className="admin__list-item">Холодные закуски - 1</li>
                        <li className="admin__list-item">Горячие закуски - 2</li>
                        <li className="admin__list-item">Мясные блюда - 3</li>
                        <li className="admin__list-item">Супы - 4</li>
                        <li className="admin__list-item">Рыбные блюда - 5</li>
                        <li className="admin__list-item">Гриль меню - 6</li>
                        <li className="admin__list-item">Фирменные блюда - 7</li>
                        <li className="admin__list-item">Напитки - 8</li>
                    </ul>
                </div>
                <input placeholder="Введите тип товара от 1 до 8" className="admin__input" onChange={e => setType(e.target.value)} value={type} type="number" />
                <button className="admin__btn" onClick={update}>Обновить товар</button>
                <button className="admin__btn" onClick={deleteProduct}>Удалить товар</button>
            </div>
        </>
    )
}