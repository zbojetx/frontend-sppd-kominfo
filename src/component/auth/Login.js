import React, { useEffect, useState } from 'react'
import { Layout, Modal, Row, Col, notification } from 'antd'
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { Link, browserHistory } from 'react-router';
import {
    login,
} from './../../api/api';
import {
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const endpoint = process.env.REACT_APP_ENDPOINT_URL

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const InputBoxAbove = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px 5px 0px 0px ;
`;
const InputBoxCenter = styled.div`
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    border-bottom: 1px solid #a5b1c2;
    padding: 10px;
`;

const InputBoxBottom = styled.div`
    border-bottom: 1px solid #a5b1c2;
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 0px 0px 5px 5px;
`;

const Input = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;
const Title = styled.h1`
    font-family: 'Bree Serif', serif;
`;

const SubTitle = styled.h2`
    font-family: 'Bree Serif', serif;
`;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;

const Button = styled.button`
    margin-top: 20px;
    background-color:#4b7bec;
    border: 1px solid #4b7bec;
    border-radius: 5px;
    color: white;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        border: 1px solid #3498db;
        font-weight: bold;
    }
`;

const Linkto = styled.button`
    background-color:#fff;
    border: 0px;
    margin-top: 20px;
    color: black;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        font-weight: bold;
    }
`;

const App = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignUp] = useState(false);
    const [namainstansi, setNamaInstansi] = useState('');
    const [email, setEmail] = useState('');
    const [messagebox, setMmessageBox] = useState(false)
    const [message, setMessage] = useState('')
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    useEffect(() => {
        //localStorage.clear();
        const savedDatas = localStorage.getItem('isLogin')
        console.log(`endpoint ${endpoint}`)
        console.log(`save data ${savedDatas}`)
        if (savedDatas !== null && savedDatas.accessToken !== null) {
            dispatch({ type: "SAVEDATAS" })
            browserHistory.push('/instansi')
        } else {
            console.log('null')
        }
    }, [])

    const loginFunc = async () => {
        if (username === '' || password === '') {
            notification.open({
                message: 'Gagal Login',
                description:
                    'Form username atau password tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                username,
                password
            }
            const cek = await login(datas)
            if (cek === 1) {
                browserHistory.push('/instansi')
                const savedDatas = JSON.parse(localStorage.getItem('isLogin'))
                console.log(savedDatas)
            } else {
                notification.open({
                    message: 'username atau password tidak sesuai',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }

    const toggleSignUp = async () => {
        setSignUp(!signup)
    }

    const togglemessagebox = async () => {
        setMmessageBox(!messagebox)
    }

    return (
      
        <div className="form-body">
            <div className="website-logo">
                <a href="#">
                    <div className="logo">
                        <img className="logo-size" src={require('./../../assets/images/sambas.png')} alt="" />
                    </div>
                </a>
            </div>
            <div className="row">
                <div className="img-holder">
                    <div className="bg"></div>
                    <div className="info-holder">
                        <img src={require('./../../assets/images/graphic2.svg')} alt="" />
                    </div>
                </div>
                <div className="form-holder">
                    <div className="form-content">
                        <div className="form-items">
                            <h3>Superdinas</h3>
                            <p>Surat Perintah Perjalanan Dinas</p>
                            {/* <div className="page-links">
                                <a href="#" onClick={() => setSignUp(false)} className="active">Login</a><a href="#" onClick={() => setSignUp(true)}>Register</a>
                            </div> */}
                            {signup ? (
                                <>
                                    {/* <form>
                                        <input class="form-control" type="text" name="name" placeholder="Nama BLUD" onChange={e => setNamaBlud(e.target.value)} required />
                                        <input class="form-control" type="email" name="email" placeholder="E-mail Address" onChange={e => setEmail(e.target.value)} required />
                                        <input class="form-control" type="text" name="username" placeholder="Username" onChange={e => setUsername(e.target.value)} required />
                                    </form>
                                    <div class="form-button">
                                        <button class="ibtn" onClick={registerFunc} >Register</button>
                                    </div> */}
                                </>
                            )
                                : (
                                    <>
                                        <form>
                                            <input className="form-control" type="text" name="username" placeholder="Username" onChange={e => setUsername(e.target.value)} required />
                                            <input className="form-control" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                                        </form>
                                        <div className="form-button">
                                            <button id="submit" type="submit" className="ibtn" onClick={loginFunc}>Login</button>
                                        </div>
                                    </>
                                )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default App