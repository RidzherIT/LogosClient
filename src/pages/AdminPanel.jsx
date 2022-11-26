import React from "react";
import CreateProduct from "./CreateProduct";
import Orders from "./Orders";
import { Link } from 'react-router-dom';


export default function AdminPanel() {


    return (
        <>
            <div className="admin__wrapper">
                <Link to='/'>
                    <p className="admin__btn">Вернуться в магазин</p>
                </Link>
                <CreateProduct />
                <Orders />
            </div>
        </>
    )
}