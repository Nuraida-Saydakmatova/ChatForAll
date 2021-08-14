import React from 'react';
import Navbar from '../Navbar';
import { DiAndroid, DiApple } from "react-icons/di";
import { BsFillChatDotsFill } from "react-icons/bs";

const More_information = () => {
    return (
        <>
            <Navbar />
            <div className={'p'}>
                <div className={'main'}>
                    <div className={'textOfMoreInf'}>
                    </div>
                    <img className={'phone'} src='https://www.transparentpng.com/thumb/-iphone-x/oBDh6k-iphone-white-mockup-png-image-free-download-searchpng.png'></img>
                    <div>
                        <img className={'laptop'} src='https://pngimg.com/uploads/macbook/macbook_PNG101761.png'></img>
                    </div>
                    <img className={'phone-bc'} src='https://i.redd.it/53ai7pq847ny.jpg'></img>
                    <BsFillChatDotsFill className={'Chat-icon'} />
                    <h1 className={'Chat'}>Chat for all</h1>
                    <div className={'block1'}>
                        <h4>
                            Удобный доступ ко всем сообщениям
                        </h4>
                        Используйте Chat в качестве отдельного сервиса или прямо в Gmail. Благодаря интегрированным инструментам вы можете отслеживать все свои деловые коммуникации и выбирать наиболее подходящий способ общения.
                        <div className={'d-flex g mt-3 '}>
                            <DiAndroid style={{ fontSize: '25px' }} className={'mt-2'} />
                            <p className={'m-0 ml-3'}>  ANDROID</p>
                        </div>
                        <div className={'d-flex g mt-3 '}>
                            <DiApple style={{ fontSize: '25px' }} className={'mt-2'} />
                            <p className={'m-0 ml-3'}>IOS</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className={'inf'}>
                <div className={'inf1'}>
                    <div className={'inf1_1'}>
                        <h2>
                            Приложение Chat for All
                        </h2>
                        Chat for All — это бесплатное приложение, разработанное специально для владельцев малого бизнеса. Создайте каталог, чтобы представить свои товары и услуги. Упростите общение с клиентами, используя инструменты автоматизации, сортировки и быстрых ответов на сообщения.
                        WhatsApp также помогает средним и крупным компаниям предоставлять поддержку клиентам и доставлять им важные уведомления. Подробнее о WhatsApp Business API.
                    </div>
                </div>
                <div className={'inf1'}>
                    <div className={'inf1_1'}>
                        <h2>
                            Приложение Chat for All
                        </h2>
                        Chat for All — это бесплатное приложение, разработанное специально для владельцев малого бизнеса. Создайте каталог, чтобы представить свои товары и услуги. Упростите общение с клиентами, используя инструменты автоматизации, сортировки и быстрых ответов на сообщения.
                        WhatsApp также помогает средним и крупным компаниям предоставлять поддержку клиентам и доставлять им важные уведомления. Подробнее о WhatsApp Business API.
                    </div>
                </div>
            </div>
            <div className={'thanks'}>
                Thank u 
            </div>
        </>
    )
}   
export default More_information;
// 0554153597 Раяна