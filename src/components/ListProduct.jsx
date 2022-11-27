import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "./Product";
import $ from 'jquery';
import 'slick-carousel';
export default function ListProduct({ title, idList }) {

    useEffect(() => {
        const promise = new Promise(function (resolve, reject) {
            resolve(getProduct())
        })
        promise.finally(function () {
            setTimeout(() => {
                $('.products-slider').slick({
                    centerMode: true,
                    centerPadding: '20px',
                    slidesToShow: 3,
                    arrows: false,
                    variableWidth: true,
                    responsive: [
                        {
                            breakpoint: 1541,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '20px',
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 1261,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '20px',
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 820,
                            settings: {
                                arrows: false,
                                centerMode: true,
                                centerPadding: '10px',
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 620,
                            settings: {
                                arrows: false,
                                centerMode: false,
                                centerPadding: '50px',
                                slidesToShow: 1
                            }
                        }
                    ]
                });

            }, 1000)
        })

    }, [])

    const getProduct = async () => {
        const data = {
            type: idList
        }
        let res;
        if (idList === 0) {
            res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/product/getRandom');
        } else {
            res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/product/get', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
        }

        const json = await res.json();
        setList(prev => [...prev, ...json]);
    }
    const [list, setList] = useState([]);
    return (
        <>
            <h3 class="products__title title" id={`prod-${idList}`}>{title}</h3>
            {!list.length && <p className="admin__subtext">Товары отсутствуют</p>}
            {list.length && <>
                <div class="products-slider">
                    {list.map(elem => <div key={elem.id}>
                        <Product idProduct={elem.id} title={elem.title} weight={elem.weight} sale={elem.sale} img={elem.img} desc={elem.description} />
                    </div>)}
                </div>
            </>}
        </>
    )
}