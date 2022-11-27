import React from "react";
import { useEffect } from "react";
import { useState } from "react";


export default function Orders() {
    const [orders, setOrders] = useState([])
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        getOrders()
    }, [checked])
    const getOrders = async () => {
        const res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/orders/get');
        const json = await res.json();
        setOrders(json)
    }
    const complite = async (idOrder) => {
        const data = {
            id: idOrder
        }
        const res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/orders/put', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const json = await res.json();
        setChecked(prev => !prev);
        if (json) {
            alert('Заказ был выполнен!')
        }
    }
    const deleteOrders = async () => {
        const res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/orders/delete', {
            method: 'DELETE'
        })
        const json = await res.json();
        setChecked(prev => !prev);
        if (json) {
            alert('Выполненные заказы были удалены!')
        }
    }
    return (
        <>
            <div className="admin__wrapper">
                <button className="admin__btn" onClick={deleteOrders}>Удалить выполненные заказы</button>
                <div className="admin__orders-wrapper">
                    {!orders.length && <p className="admin__subtitle">Заказы отсутствуют</p>}
                    {orders.map(order => <div className="admin__order" key={order.id}>
                        <p className="admin__text">Имя заказчика: {order.name}<br />Телефон: {order.phone}</p>
                        <ul className="admin__list">
                            {order.orders.map(elem => <li className="admin__list-item" key={elem}>
                                {elem.split('-')[0]} в количестве {elem.split('-')[1]} ед.
                            </li>)}
                        </ul>
                        <span>{orders.sale}</span>
                        {!order.checked && <button className="admin__btn" onClick={() => complite(order.id)}>Выполнить</button>}
                        {order.checked && <span className="admin__text">Выполнен</span>}

                    </div>)}

                </div>
            </div>
        </>
    )
}