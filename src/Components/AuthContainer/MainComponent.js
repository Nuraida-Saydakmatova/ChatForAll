import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Form,
    Card,
    Button,
    Nav,
    Spinner,
    FormControl
} from 'react-bootstrap';
import { UserContext, LanguageContext } from '../contexts';
import { useTranslation } from 'react-i18next';
import { FiSend } from "react-icons/fi";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiOutlineGlobal } from "react-icons/ai";
import requester from '../utils/requester';
import Moment from 'react-moment';
import { FiArrowLeft } from "react-icons/fi";
import Pusher from 'pusher-js';



const MainContainer = () => {

    const { t } = useTranslation();
    const [language, setLanguage] = useContext(LanguageContext);
    const [fulName, setFulName] = useState();
    const [spinner, setSpinner] = useState(false);
    const [inputChat, setInputChat] = useState();
    const [send_message, setSend_message] = useState([])


    const [user, setUser] = useContext(UserContext);

    const inputChatValue = (v) => {
        setInputChat(v)
    }

    const exitHandler = () => {
        setUser(null)
    }

    const use = (img) => {
        setSpinner(true)
        requester.post('/auth/me', {
            picture: img
        })
            .then((res) => {
                console.log(res);
                setUser(res.data.payload)

            }).finally((r) => {
                setSpinner(false)
            })
    }

    const name1 = (v) => {
        setFulName(v)
    }
    const btn_name = () => {
        requester.post('/auth/me', {
            full_name: fulName,
        })
            .then((res) => {
                console.log(res);
                setUser(res.data.payload)

            })
            .catch((error) => {
                console.log('error');

            })
    }
    const message = () => {
        requester.post('/message', {
            text: inputChat
        })
            .then((res) => {
                //setUser(res.data.payload)
            })
    }


    useEffect(() => {
        requester.get('/message')
            .then((res) => {
                setSend_message(res.data.payload)
            })
    }, [])

    useEffect(() => {
        Pusher.logToConsole = true
        const LocStr = localStorage.getItem('token')
        const pusher = new Pusher('ff370aa33e475c9cef73', {
            cluster : "ap2",
            // authEndpoint: "https://api.chat.besoft.kg/broadcasting/auth",
            // auth:{
            //     headers:{
            //         'Authorization': "Bearer " + LocStr
            //     }
            // }
        });
        const massage = pusher.subscribe("message")
        massage.bind('on-create' , (data) => {
            setSend_message(d => [...d, data.item]);

        })
        
    }, [])

    return (
        <>
            <div className={'block_all_home'}>
                <div className={'block_left_home'}>
                    <FiArrowLeft onClick={() => exitHandler()} style={{ color: 'white', fontSize: '35px' }} />
                    {!spinner ? <Form.Label><div style={{ backgroundImage: user.picture ? `url(https://api.chat.besoft.kg/${user.picture.path.original})` : `url(https://i1.wp.com/slovami.net/wp-content/uploads/2018/04/1-36-1024x1024.jpg)` }} className={'profil_img '}>
                        <input accept='image/*' type='file' className='inpFile' onChange={(e) => use(e.target.files[0])}></input>
                    </div></Form.Label> : <Spinner animation="border" />}
                    <hr className={'hr'} />
                    <div>
                        <Card.Title onChange={(e) => setUser(e.target.value)}> {t('full_name')}:{user.full_name}
                        </Card.Title>
                        <div style={{ display: 'flex' }}>
                            <FormControl  className={'form'} onChange={(e) => name1(e.target.value)} />
                            <Button variant={'dark'} onClick={() => btn_name()}>Name</Button>
                        </div>
                        <hr className={'hr'} />
                        <Card.Subtitle className="mb-2 text-muted">{t('phone_number')}:{user.phone_number}</Card.Subtitle>
                        <hr className={'hr'} />
                        <Card.Subtitle className="mb-2 text-muted">{t('last_activity')}: <Moment fromNow ago>{user.last_action}</Moment></Card.Subtitle>
                        <hr className={'hr'} />
                        <div>
                        <AiOutlineGlobal style={{ fontSize: '20px', marginLeft: '15px' }} />   
                            <select onChange={(e) => setLanguage(e.target.value)} as='select' value={language} className={'select'}>
                                <option value="en">English</option>
                                <option value="ru">Руский</option>
                            </select>
                        </div>
                    </div>
                </div>
        
                <div className={'block_rigth_home'}>
                    <div className={'w-100 heder_home'}>
                        <div style={{ fontSize: "30px" }}>
                            <BsFillChatDotsFill style={{ color: 'white', fontSize: '35px' }} />
                            {t("Chat")}
                        </div>
                        <Nav.Link href="/all">{t("participants")}</Nav.Link>
                    </div>
                    <div className={"block_chat flex-grow-1 w-100"}>
                        <div
                            style={{ overflowY: "scroll" }}
                            className={
                                "d-flex flex-column justify-content-end align-items-start"
                            }
                        >
                            {send_message.map((v) => {
                                return (
                                    <>
                                        <span
                                            className={`sms ${user.id === v.user_id ? "align-self-end" : ""
                                                }`}
                                        >
                                            {v.text}
                                        </span>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <div className={'block_input_chat'}>
                        <input onChange={(e) => inputChatValue(e.target.value)} className={'input_chat'} type="text" placeholder={t("typing")} ></input>
                        <FiSend style={{ fontSize: "30px", }} onClick={() => message()} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default MainContainer;

