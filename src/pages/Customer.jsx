import React, { useContext, useEffect, useState } from "react";
import ProductWrapper from "../components/ProductWrapper";
import stopImg from '../images/stop.png';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from "..";
export default observer(function Customer() {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [checking, setChecking] = useState(false);
    const createOrder = async () => {
        const dataCustomer = {
            name: name,
            phone: phone
        }
        if (!name || !phone || !checking) {
            alert(`Вы не указали имя/телефон либо не подтвердили обработку персональных данных!`)
            return;
        }
        const resCustomer = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/customer/create', {
            method: 'POST',
            body: JSON.stringify(dataCustomer),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const jsonCustomer = await resCustomer.json();
        const productsArray = store.products.map(elem => `${elem.title}-${elem.value}`);
        const order = {
            sale: store.sale.sale,
            orders: productsArray,
            checked: false,
            customer_id: +jsonCustomer.id
        }
        const resOrder = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/orders/create', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const jsonOrder = await resOrder.json();
        setName('');
        setPhone('');
        setChecking(false);
        store.setDeleteAllProducts();
        store.setValueProducts();
        store.setSaleUpdate();
        if (jsonOrder.rows[0]) {
            alert('Вы оформили заказ! Нажмите ОК, чтобы перейти на главную страницу.');
            navigate('/');
        }
    }



    const [hourCheck, setHourCheck] = useState(false);
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 21 || hour <= 8) setHourCheck(true)
    }, [])




    const [deliveryInput, setDeliveryInput] = useState(null);
    const [payInput, setPayInput] = useState(null);
    const [timeInput, setTimeInput] = useState(null);
    const [callInput, setCallInput] = useState(null);
    useEffect(() => {
        const delivery = document.querySelector('.place-order__delivery-box').children;
        for (let i = 0; i < delivery.length; i++) if (delivery[i].firstElementChild.checked) setDeliveryInput(delivery[i].firstElementChild);
        const pay = document.querySelector('.place-order__pay').children;
        for (let i = 0; i < pay.length; i++) if (pay[i].tagName == 'LABEL' && pay[i].firstElementChild.checked) setPayInput(pay[i].firstElementChild);
        const time = document.querySelector('.place-order__whendeliver-wrapper').children;
        for (let i = 0; i < time.length; i++)  if (time[i].tagName == 'LABEL' && time[i].firstElementChild.checked) setTimeInput(time[i].firstElementChild);
        const calling = document.querySelector('.place-order__whendeliver-call__wrapper').children;
        for (let i = 0; i < calling.length; i++)  if (calling[i].tagName == 'LABEL' && calling[i].firstElementChild.checked) setCallInput(calling[i].firstElementChild);
    }, [])
    const clickDelivery = (e) => {
        if (e.target.tagName == 'SPAN') {
            deliveryInput.checked = !deliveryInput.checked;
            e.target.previousElementSibling.checked = true;
            setDeliveryInput(e.target.previousElementSibling)
        }
    }
    const clickPay = (e) => {
        if (e.target.tagName == 'SPAN' && e.target.previousElementSibling.dataset.name != 'radio-6') {
            payInput.checked = !payInput.checked;
            e.target.previousElementSibling.checked = true;
            setPayInput(e.target.previousElementSibling)
        }
    }
    const clickTime = (e) => {
        if (e.target.tagName == 'SPAN' && e.target.previousElementSibling.dataset.name != 'radio-9') {
            timeInput.checked = !timeInput.checked;
            e.target.previousElementSibling.checked = true;
            setTimeInput(e.target.previousElementSibling);
        }
    }
    const clickCall = (e) => {
        if (e.target.tagName == 'SPAN') {
            console.log(callInput, e.target)
            callInput.checked = !callInput.checked;
            e.target.previousElementSibling.checked = true;
            setCallInput(e.target.previousElementSibling);
        }
    }
    console.log(checking);
    return (
        <>
            <ProductWrapper>
                <div class="container-basket">
                    <div class="basket__box">
                        <Link to='/basket'>
                            <p class="basket__link">в корзину</p>
                        </Link>
                        <h3 class="basket__title title">
                            Оформление заказа
                        </h3>
                    </div>
                    <form class="place-order__form">
                        {hourCheck && <>
                            <div class="place-order__stop">
                                <div class="place-order__stop-box">
                                    <h3 class="place-order__stop-title">
                                        Сегодня мы уже не доставляем.
                                    </h3>
                                    <p class="place-order__stop-text">
                                        Заказы принимаем до 20:50, доставляем с 8:30 до 21:30
                                    </p>
                                </div>
                                <img src={stopImg} alt="stop soon img" />
                            </div>
                        </>}
                        <div class="place-order__info">
                            <h5 class="place-order__info-title">
                                1. Контактная информация
                            </h5>
                            <label class="place-order__info-label">
                                <input value={name} onChange={e => setName(e.target.value)} class="place-order__info-input" type="text" placeholder="Имя*" />
                                <input value={phone} onChange={e => setPhone(e.target.value)} class="place-order__info-input" type="text" placeholder="Телефон*" />
                            </label>
                        </div>
                        <div class="place-order__delivery">
                            <h5 class="place-order__delivery-title">
                                2. Доставка
                            </h5>
                            <div onClick={e => clickDelivery(e)} class="place-order__delivery-box">
                                <label class="place-order__delivery-label">
                                    <input class="place-order__delivery-input" type="radio" data-name="radio-1" name="radio" checked />
                                    <span class="place-order__delivery-span" >Доставка</span>
                                </label>
                                <label class="place-order__delivery-label place-order--radius">
                                    <input class="place-order__delivery-input" type="radio" data-name="radio-2" name="radio" />
                                    <span class="place-order__delivery-span">Самовывоз</span>
                                </label>
                                {deliveryInput && deliveryInput.dataset.name == 'radio-1' && <p class="place-order__delivery-text">
                                    Доставим через 1 час 30 минут
                                </p>}
                            </div>
                        </div>
                        <div onClick={e => clickPay(e)} class="place-order__pay place-order__pay--padding">
                            <h5 class="place-order__pay-title">
                                3. Оплатить
                            </h5>
                            <label class="place-order__pay-label">
                                <input class="place-order__pay-input" data-name='radio-3' type="radio" name="radio-pay" />
                                <span class="place-order__pay-span">Оплата онлайн</span>
                            </label>
                            <label class="place-order__pay-label place-order__pay-label__courier">
                                <input class="place-order__pay-input" data-name='radio-4' type="radio" name="radio-pay" />
                                <span class="place-order__pay-span">Курьеру картой</span>
                            </label>
                            <label class="place-order__pay-label place-order__pay-label__nall">
                                <input class="place-order__pay-input" data-name='radio-5' type="radio" name="radio-pay" checked />
                                <span class="place-order__pay-span">Наличными</span>
                            </label>
                            {payInput && payInput.dataset.name == 'radio-5' && <>
                                <label class="place-order__pay-label place-order__pay-label__change">
                                    <input data-name='radio-6' class="place-order__pay-input" type="text" name="radio-change" />
                                    <span class="place-order__pay-span">Сдача с</span>
                                </label>
                            </>}
                        </div>
                        <div class="place-order__whendeliver">
                            <div onClick={e => clickTime(e)} className="place-order__whendeliver-wrapper">
                                <h5 class="place-order__whendeliver-title">
                                    4. Когда доставить
                                </h5>
                                <label class="place-order__whendeliver-label place-order__whendeliver-label__time">
                                    <input data-name="radio-7" class="place-order__whendeliver-input" type="radio" name="radio-liver" />
                                    <span class="place-order__whendeliver-spann">В ближайшее время</span>
                                </label>
                                <label class="place-order__whendeliver-label place-order__whendeliver-label__intime">
                                    <input data-name="radio-8" class="place-order__whendeliver-input" type="radio" name="radio-liver" checked />
                                    <span class="place-order__whendeliver-spann">Ко времени</span>
                                </label>
                                {timeInput && timeInput.dataset.name == 'radio-8' && <>
                                    <label class="place-order__whendeliver-label place-order__whendeliver-label__clock">
                                        <input data-name="radio-9" class="place-order__whendeliver-input place-order__whendeliver-time" type="radio"
                                            name="radio-clock" />
                                        <span class="place-order__whendeliver-spann">Укажите время</span>
                                    </label>
                                </>}
                            </div>

                            <div onClick={e => clickCall(e)} className="place-order__whendeliver-call__wrapper">
                                <h6 class="place-order__whendeliver-call">
                                    Хотите мы позвоним?
                                </h6>
                                <label
                                    class="place-order__whendeliver-label__call place-order__whendeliver-label__call--active">
                                    <input data-name='radio-10' class="place-order__whendeliver-input" type="radio" name="radio-call" value="1"
                                        checked />
                                    <span class="place-order__whendeliver-span"></span>
                                    Не перезванивать
                                </label>
                                <label class="place-order__whendeliver-label__call">
                                    <input data-name='radio-11' class="place-order__whendeliver-input" type="radio" name="radio-call" value="2" />
                                    <span class="place-order__whendeliver-span"></span>
                                    Потребуется звонок оператора
                                </label>
                            </div>
                        </div>
                        <div class="place-order__agree">
                            <label class="place-order__agree-label">
                                <input onClick={() => setChecking(prev => !prev)} class="place-order__agree-input" type="checkbox" />
                                <span class="place-order__agree-span"></span>
                                Я согласен на обработку моих перс. данных в соответствии с <a href="#">Условиями</a>
                            </label>
                            <a onClick={createOrder} class="place-order__agree-link contacts__phone-booking">Оформить заказ</a>
                        </div>
                    </form>
                </div>
            </ProductWrapper>
        </>
    )
})