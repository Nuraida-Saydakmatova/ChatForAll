import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Api_url } from '../API/Api_url'
import Main_Navbar from '../Navbar';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18next';
import 'react-moment';
    
function MainWindow() {
    const [confirm, setConfirm] = useState('');
    const [code, setCode] = useState('');
    const [number, setNumber] = useState();
    const [token, setToken] = useState([]);
    const [name, setName] = useState('');
    const [user_code, setUser_code] = useState('')
    const { t } = useTranslation();


    localStorage.setItem('Token', JSON.stringify(token))

    // checking_api
    const api = () => {
        axios.post(Api_url + '/auth', {
            phone_number: number
        })
            .then((response) => {
                setConfirm(response.data.status)
                console.log(response.data.status);
            })
            .catch((error) => {
                console.log('error');
            })
    }

    // registration_api
    const register = () => {
        axios.post(Api_url + '/auth/register', {
            phone_number: number,
            verification_code: code,
            platform: 'web',
            version_code: 1,
            full_name: name
        })
            .then((response) => {
                setToken(response.data.payload.token)
            })
    }
    //login_api
    const login = () => {
        axios.post(Api_url + '/auth/login', {
            phone_number: number,
            verification_code: code,
            platform: 'web',
            version_code: 1,
        })
            .then((response) => {
                console.log(response);
            })
    }

    const phone_number = (e) => {
        setNumber(e)
    }

    const user_name = (p) => {
        setName(p)
    }

    return (
        <>
            <Main_Navbar/>
            <div className={'display'}>
                <div className={'window'}>
                    <Form>
                        <Form.Control type="number" placeholder={t("num_placeholdor")} onChange={(e) => phone_number(e.target.value)} disabled={confirm.str} />
                        <br />
                        <div style={{ margin: '10px' }}>
                            {confirm == '' ? <Button variant="dark" onClick={() => api()} disabled={number === ''}>
                                {t("btn_send")}
                            </Button> : null}
                        </div>
                        {confirm !== '' ? <div>
                            <Form>
                                <Form.Control type='number' value={code} onChange={(e) => e.target.value.length < 5 && setCode(e.target.value)} placeholder={t("code")}>
                                </Form.Control>
                                {confirm == 'not_exists_code_was_sent' || confirm == 'not_exists_code_is_sent' ?
                                    <Form>
                                        <Form.Control type='text' placeholder={t("name_placeholdor")} onChange={(e) => user_name(e.target.value)}></Form.Control>
                                        <br />
                                    </Form> : null}
                                <Button variant="dark" onClick={() => register()} style={{ margin: '140px' }}>
                                    {t("login")}
                                </Button>
                                <Button variant="light" onClick={() => login()} >
                                    Log
                                </Button>
                            </Form>
                        </div> : null}

                    </Form>

                </div>
            </div>


        </>
    )
}
export default MainWindow;

















