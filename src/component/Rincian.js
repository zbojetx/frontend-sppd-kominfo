// import React, {
//     useEffect,
//     useState
// } from 'react';
// import { Layout, notification, PageHeader, Row, Col, Form, Input, Button, Divider, Descriptions, Select, InputNumber, Typography } from 'antd';
// import {
//     CheckCircleOutlined,
//     CloseCircleOutlined,
//     DeleteOutlined
// } from '@ant-design/icons';
// import 'antd/dist/antd.css';
// import styled from 'styled-components'
// import { useStore } from 'react-redux';
// import NumberFormat from 'react-number-format'
// import { createupdate, getall, remove, getbyid } from '../api/api';

// const Headertable = styled.p`
//     display: flex;
//     font-weight: bold;
// `


// const { Header, Sider, Content } = Layout;
// const { Option } = Select;
// const { Title } = Typography;

// function Rincian(props) {

//     const [form] = Form.useForm();
//     const [keranjangRincian, setKeranjangRincian] = useState([])
//     const [uraian, setUraian] = useState('')
//     const [volume, setVolume] = useState(0)
//     const [satuan, setSatuan] = useState('')
//     const [harga_satuan, setharga_satuan] = useState(0)
//     const [jumlah, setJumlah] = useState(0)
//     const [total, setTotal] = useState(0)
//     const [listSatuan, setListSatuan] = useState([])

//     useEffect(() => {
//         getAnggaranById()
//         attrSatuan()
//     }, [])

//     const satuan_sample = [
//         {
//             "title": 'Buah'
//         },
//         {
//             "title": 'Meter'
//         },
//         {
//             "title": 'Pcs'
//         },
//         {
//             "title": 'Lembar'
//         },
//         {
//             "title": 'Rim'
//         },
//     ]

//     const attrSatuan = async () => {
//         const url = 'getattrbyjenis'
//         const jenis = 'Satuan'
//         let attrsatuan = await getbyid(jenis, url)

//         setListSatuan(attrsatuan)
//     }

//     const getAnggaranById = async() => {

//         console.log(total)
//         const url = 'getanggaranbyid'
//         let rincian = await getbyid( props.location.state.id, url)
//         console.log(rincian.length)
//         for(let i = 0; i<rincian.length; i++){
//             setTotal(parseInt(total) + parseInt(rincian[i].jumlah))
//         }
//         setKeranjangRincian(rincian)
//     }

//     const createAnggaran = async () => {
//         const jumlahX = await parseInt(volume) * parseInt(harga_satuan)
//         await setJumlah(jumlahX)
//         setTotal(total + jumlah)
//         const id_sppd = props.location.state.id
//         let datas = {
//             id_sppd,
//             uraian,
//             volume,
//             satuan,
//             harga_satuan,
//             jumlah
//         }
//         const apiurl = 'createanggaran'
//         console.log(apiurl)
//         let createanggaran = await createupdate(datas, apiurl)
//         if (createanggaran === 1) {
//             notification.open({
//                 message: 'Data Berhasil disimpan',
//                 description:
//                     '',
//                 icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
//             });
//             // getsppd()
//             //modelTrigger()
//             getAnggaranById()
//             resetForm()
//         } else {
//             notification.open({
//                 message: 'Gagal Menyimpan Data',
//                 description:
//                     '',
//                 icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
//             });
//         }
//     }

//     const removeanggaran = async (id, jumlah) => {
//         //setTotal(parseInt(total) - parseInt(jumlah))
//         const url = 'deleteanggaran'
//         const hapus = await remove(id, url)
//         console.log(hapus)
//         if (hapus === 1) {
//             notification.open({
//                 message: 'Data Berhasil dihapus',
//                 description:
//                     '',
//                 icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
//             });
//             await setTotal(0)
//             getAnggaranById()
//         }
//     }

//     const onFinish = async (value) => {
//         const jumlahX = await parseInt(volume) * parseInt(harga_satuan)
//         await setJumlah(jumlahX)
//         console.log(jumlahX)
//         setKeranjangRincian([...keranjangRincian, { uraian, volume, satuan, harga_satuan, jumlah }])
//         setTotal(total + jumlah)
//         resetForm()
//         console.log(keranjangRincian)
//     }

//     const handleChangeSatuan = (value) => {
//         setSatuan(value)
//     }

//     const resetForm = () => {
//         setJumlah(0)
//         setVolume(0)
//         setharga_satuan(0)
//         form.resetFields()
//     }


//     return (
//         <Content
//             className="site-layout-background"
//             style={{
//                 margin: '24px 16px',
//                 padding: 24,
//                 //minHeight: 280,
//             }}
//         >
//             <Form form={form} name="horizontal_login" layout="inline" onFinish={createAnggaran} style={{ backgroundColor: '#0984e3', padding: 20, }}>
//                 <Row style={{ width: '100%', marginBottom: 5, backgroundColor: '#0984e3' }}>
//                     <Col xs={24} sm={24} md={24} lg={12} xl={12}>
//                         <Title level={4} style={{ color: 'white' }}>Rincian Anggaran Perjalanan</Title>
//                     </Col>
//                     <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
//                         <Title level={2} style={{ color: 'white' }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></Title>
//                     </Col>
//                 </Row>

//                 <Divider />
//                 <Row style={{ width: '100%', marginBottom: 5, backgroundColor: '#0984e3' }} >

//                     <Col xs={24} sm={24} md={6} lg={10} xl={10}>
//                         <Form.Item
//                             name="uraian"
//                             rules={[{ required: true, message: 'Uraian Tidak Boleh Kosong' }]}
//                         >
//                             <Input
//                                 autoFocus
//                                 value={uraian}
//                                 style={{ borderRadius: 5, height: 40, borderWidth: 0 }}
//                                 placeholder="Uraian"
//                                 onChange={(e) => setUraian(e.target.value)}
//                             />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={24} md={6} lg={2} xl={2}>
//                         <Form.Item
//                             name="volume"
//                             rules={[{ required: true, message: 'Kosong' }]}
//                         >
//                             <Input
//                                 placeholder="Volume"
//                                 value={volume}
//                                 style={{ borderRadius: 5, height: 40, borderWidth: 0 }}
//                                 onChange={(e) => setVolume(e.target.value)}
//                             />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={2} sm={4} md={6} lg={4} xl={4}>
//                         <Form.Item
//                             name="satuan"
//                             rules={[{ required: true, message: 'kosong' }]}
//                         >
//                             <Select defaultValue="" style={{ borderRadius: 5, height: '100%', borderWidth: 0 }} onChange={handleChangeSatuan} value={satuan}>
//                                 <Option value="">Satuan</Option>
//                                 {listSatuan.map((data) =>
//                                     <Option value={data.nama_attr}>{data.nama_attr}</Option>
//                                 )}
//                             </Select>
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={24} md={6} lg={4} xl={4}>
//                         <Form.Item
//                             name="harga_satuan"
//                             rules={[{ required: true, message: 'Tidak Noleh Kosong' }]}
//                         >
//                             {/* <Input
//                                 prefix={<span style={{ fontWeight: 'bold' }}>Rp</span>}
//                                 placeholder="Harga Satuan"
//                                 value={harga_satuan}
//                                 onChange={(e) => setharga_satuan(e.target.value)}
//                                 style={{ alignItems: 'flex-end' }}
//                             /> */}
//                             <InputNumber
//                                 defaultValue={100000}
//                                 formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                                 parser={value => value.replace(/\$\s?|(,*)/g, '')}
//                                 style={{ borderRadius: 5, height: 40, borderWidth: 0, width: '100%' }}
//                                 value={harga_satuan}
//                                 onChange={value => { setharga_satuan(value); setJumlah(parseInt(volume) * parseInt(value)) }}
//                             />
//                         </Form.Item>
//                     </Col>
//                     <Col xs={2} sm={4} md={6} lg={4} xl={4}>
//                         <Form.Item
//                             name="jumlah"
//                             style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
//                         >
//                             <p style={{ fontWeight: 'bold', fontSize: 25, float: 'right', color: 'white' }}><NumberFormat thousandSeparator={true} displayType={'text'} value={parseInt(volume) * parseInt(harga_satuan)} /></p>
//                         </Form.Item>
//                     </Col>
//                     <Col xs={24} sm={24} md={24} lg={24} xl={24}>
//                         <Form.Item shouldUpdate={true}>
//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 block
//                                 primary
//                             >
//                                Simpan / Enter
//                                 </Button>
//                         </Form.Item>
//                     </Col>
//                 </Row>
//             </Form>


//             <Row style={{ width: '100%', marginBottom: 5, marginTop: 20 }} >
//                 <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #bdc3c7', padding: 5 }}>
//                     <Headertable>No</Headertable>
//                 </Col>
//                 <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 10 }}>
//                     <Headertable>Uraian</Headertable>
//                 </Col>
//                 <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 10 }}>
//                     <Headertable>Volume</Headertable>
//                 </Col>
//                 <Col xs={2} sm={4} md={6} lg={8} xl={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 10 }}>
//                     <Headertable>Satuan</Headertable>
//                 </Col>
//                 <Col xs={2} sm={4} md={6} lg={8} xl={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 10 }}>
//                     <Headertable>Harga Satuan</Headertable>
//                 </Col>
//                 <Col xs={2} sm={4} md={6} lg={8} xl={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 10 }}>
//                     <Headertable>Jumlah</Headertable>
//                 </Col>
//                 <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 10 }}>
//                     <Headertable>#</Headertable>
//                 </Col>
//             </Row>

//             {keranjangRincian !== null && keranjangRincian.map((item, index) =>
//                 <Row style={{ width: '100%', marginBottom: 5, }} >
//                     <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #bdc3c7', padding: 5 }}>
//                         <Headertable>{index + 1}</Headertable>
//                     </Col>
//                     <Col xs={2} sm={4} md={6} lg={8} xl={8} style={{ borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 5 }}>
//                         <Headertable>{item.uraian}</Headertable>
//                     </Col>
//                     <Col xs={2} sm={2} md={2} lg={2} xl={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 5 }}>
//                         <Headertable>{item.volume}</Headertable>
//                     </Col>
//                     <Col xs={2} sm={4} md={6} lg={8} xl={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 5 }}>
//                         <Headertable>{item.satuan}</Headertable>
//                     </Col>
//                     <Col xs={2} sm={4} md={6} lg={8} xl={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 5 }}>
//                         <Headertable><NumberFormat thousandSeparator={true} displayType={'text'} value={item.harga_satuan} /></Headertable>
//                     </Col>
//                     <Col xs={2} sm={4} md={6} lg={8} xl={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 5 }}>
//                         <Headertable><NumberFormat thousandSeparator={true} displayType={'text'} value={item.jumlah} /></Headertable>
//                     </Col>
//                     <Col xs={1} sm={1} md={1} lg={1} xl={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#bdc3c7', borderTopStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#bdc3c7', borderBottomStyle: 'solid', borderRightWidth: 1, borderRightColor: '#bdc3c7', borderRightStyle: 'solid', padding: 5 }}>
//                         <Headertable> <Button key="hapus" onClick={() => removeanggaran(item.id, item.jumlah)} style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} ></Button></Headertable>
//                     </Col>
//                 </Row>
//             )}

//         </Content >
//     )
// }

// export default Rincian;

import React, {
    useEffect,
    useState
} from 'react';
import { Layout, notification, PageHeader, Row, Col, Form, Input, Button, Divider, Descriptions, Select, InputNumber, Typography, Modal } from 'antd';
import {
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import styled from 'styled-components'
import { useStore } from 'react-redux';
import NumberFormat from 'react-number-format'
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import './../assets/css/table.css'

const Headertable = styled.p`
    display: flex;
    font-weight: bold;
`

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;


const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

function Kurir(props) {

    const [form] = Form.useForm();
    const [modal, setModal] = useState(false)
    const [keranjangRincian, setKeranjangRincian] = useState([])
    const [uraian, setUraian] = useState('')
    const [volume, setVolume] = useState(0)
    const [satuan, setSatuan] = useState('')
    const [harga_satuan, setharga_satuan] = useState(0)
    const [jumlah, setJumlah] = useState(0)
    const [idRincian, setIdRincian] = useState('')
    const [uraianForUpdate, setUraianForUpdate] = useState('')
    const [volumeForUpdate, setVolumeForUpdate] = useState(0)
    const [satuanForUpdate, setSatuanForUpdate] = useState('')
    const [hargaSatuanForUpdate, setHargaSatuanForUpdate] = useState(0)
    const [jumlahForUpdate, setJumlahForUpdate] = useState('')
    const [total, setTotal] = useState(0)
    const [listSatuan, setListSatuan] = useState([])

    useEffect(() => {
        console.log(props.location.state.kode_blud)
        getRincianAnggaranBySppd()
        attrSatuan()
    }, [])

    const modalTrigger = () => {
        setModal(!modal)
    }

    const attrSatuan = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Satuan'
        let attrsatuan = await getbyid(jenis, url)

        setListSatuan(attrsatuan)
    }

    const getRincianAnggaranBySppd = async () => {
        // const kode_rekening = ''
        // const tahun_anggaran = ''
        // const kode_rekening = ''
        const datas = {
            kode_blud: props.location.state.kode_blud,
            tahun_anggaran: props.location.state.tahun_anggaran,
            kode_rekening: props.location.state.kode_rekening
        }
        console.log(total)
        const url = 'getanggaranbyid'
        let rincian = await getbyid(props.location.state.id, url)
        console.log("Halo Bos")
        console.log(rincian)

        setTotal(rincian.jumlahtotal[0].total)
        setKeranjangRincian(rincian.datas)
    }

    const getAnggaranById = async (idx) => {
        setIdRincian(idx)
        const datas = {
            id: idx,
            //    payload : {
            //         uraian: uraianForUpdate,
            //         volume: volumeForUpdate,
            //         satuan: satuanForUpdate,
            //         harga_satuan: hargaSatuanForUpdate,
            //         jumlah: jumlahForUpdate
            //    }
        }
        const url = 'getrinciananggaranbyid'
        let rincian = await getallpost(datas, url)
        console.log("FOR UPDATE")
        console.log(rincian.anggaran[0])

        //setKeranjangRincian(rincian.anggaran[0])
        setUraianForUpdate(rincian.anggaran[0].uraian)
        setVolumeForUpdate(rincian.anggaran[0].volume)
        setSatuanForUpdate(rincian.anggaran[0].satuan)
        setHargaSatuanForUpdate(rincian.anggaran[0].harga_satuan)
        setJumlahForUpdate(rincian.anggaran[0].jumlah)

        modalTrigger()
    }

    const createAnggaran = async () => {
        const jumlahX = await parseInt(volume) * parseInt(harga_satuan)
        await setJumlah(jumlahX)
        setTotal(total + jumlah)
        const id_sppd = props.location.state.id
        let datas = {
            id_sppd,
            uraian,
            volume,
            satuan,
            harga_satuan,
            jumlah
        }
        const apiurl = 'createanggaran'
        console.log(apiurl)
        let createanggaran = await createupdate(datas, apiurl)
        if (createanggaran === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            // getsppd()
            //modelTrigger()
            getRincianAnggaranBySppd()
            resetForm()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const updaterinciananggaran = async () => {
        const datas = {
            id: idRincian,
            payload: {
                uraian: uraianForUpdate,
                volume: volumeForUpdate,
                satuan: satuanForUpdate,
                harga_satuan: hargaSatuanForUpdate,
                jumlah: jumlahForUpdate
            }
        }
        const apiurl = 'updaterinciananggaran'
        let createanggaran = await createupdate(datas, apiurl)
        if (createanggaran === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            // getsppd()

            getRincianAnggaranBySppd()
            modalTrigger()
            resetForm()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const removeanggaran = async (id, jumlah) => {
        //setTotal(parseInt(total) - parseInt(jumlah))
        const url = 'deleteanggaran'
        const hapus = await remove(id, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            await setTotal(0)
            getRincianAnggaranBySppd()
        }
    }



    const onFinish = async (value) => {
        const jumlahX = await parseInt(volume) * parseInt(harga_satuan)
        await setJumlah(jumlahX)
        console.log(jumlahX)
        setKeranjangRincian([...keranjangRincian, { uraian, volume, satuan, harga_satuan, jumlah }])
        setTotal(total + jumlah)
        resetForm()
        console.log(keranjangRincian)
    }

    const handleChangeSatuan = (value) => {
        setSatuan(value)
    }

    const handleChangeSatuanForUpdate = (value) => {
        setSatuanForUpdate(value)
    }

    const resetForm = () => {
        setJumlah(0)
        setVolume(0)
        setharga_satuan(0)
        form.resetFields()
    }


    return (
        <Content
            // className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                //minHeight: 280,
            }}
        >
            <Form form={form} name="horizontal_login" layout="inline" onFinish={createAnggaran} style={{ backgroundColor: '#0984e3', padding: 20, }}>
                <Row style={{ width: '100%', marginBottom: 5, backgroundColor: '#0984e3' }}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Title level={4} style={{ color: 'white' }}>Input Rencana Anggaran</Title>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Title level={2} style={{ color: 'white' }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></Title>
                    </Col>
                </Row>

                <Divider />
                <Row style={{ width: '100%', marginBottom: 5, backgroundColor: '#0984e3' }} >

                    <Col xs={24} sm={24} md={6} lg={10} xl={10}>
                        <Form.Item
                            name="uraian"
                            rules={[{ required: true, message: 'Uraian Tidak Boleh Kosong' }]}
                        >
                            <Input
                                autoFocus
                                value={uraian}
                                placeholder="Uraian"
                                onChange={(e) => setUraian(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={2} xl={2}>
                        <Form.Item
                            name="volume"
                            rules={[{ required: true, message: 'Kosong' }]}
                        >
                            <Input
                                placeholder="Volume"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={4} xl={4}>
                        <Form.Item
                            name="satuan"
                            rules={[{ required: true, message: 'kosong' }]}
                        >
                            <Select defaultValue="" style={{ borderRadius: 5, height: '100%', borderWidth: 0 }} onChange={handleChangeSatuan} value={satuan}>
                                <Option value="">Satuan</Option>
                                {listSatuan.map((data) =>
                                    <Option value={data.nama_attr}>{data.nama_attr}</Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={4} xl={4}>
                        <Form.Item
                            name="harga_satuan"
                            rules={[{ required: true, message: 'Tidak Noleh Kosong' }]}
                        >
                            {/* <Input
                                prefix={<span style={{ fontWeight: 'bold' }}>Rp</span>}
                                placeholder="Harga Satuan"
                                value={harga_satuan}
                                onChange={(e) => setharga_satuan(e.target.value)}
                                style={{ alignItems: 'flex-end' }}
                            /> */}
                            <InputNumber
                                defaultValue={100000}
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                style={{ width: '100%' }}
                                value={harga_satuan}
                                onChange={value => { setharga_satuan(value); setJumlah(parseInt(volume) * parseInt(value)) }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={2} sm={4} md={6} lg={4} xl={4}>
                        <Form.Item
                            name="jumlah"
                            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
                        >
                            <p style={{ fontWeight: 'bold', fontSize: 25, float: 'right', color: 'white' }}><NumberFormat thousandSeparator={true} displayType={'text'} value={parseInt(volume) * parseInt(harga_satuan)} /></p>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item shouldUpdate={true}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                primary
                            >
                                Simpan / Enter
                                </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>


            <Row style={{ width: '100%', marginBottom: 5, marginTop: 20, backgroundColor: 'white' }} >
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <table style={{ width: '100%' }} className="table1">
                        <tr>
                            <th>No</th>
                            <th>Uraian</th>
                            <th>Volume</th>
                            <th>Satuan</th>
                            <th>Harga Satuan</th>
                            <th>Jumlah</th>
                            <th>#</th>
                        </tr>
                        {keranjangRincian !== null && keranjangRincian.map((item, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.uraian}</td>
                                <td>{item.volume}</td>
                                <td>{item.satuan}</td>
                                <td><NumberFormat thousandSeparator={true} displayType={'text'} value={item.harga_satuan} /></td>
                                <td><NumberFormat thousandSeparator={true} displayType={'text'} value={item.jumlah} /></td>
                                <td> <Button key="hapus" onClick={() => getAnggaranById(item.id)} style={{ marginLeft: 10 }} type="primary" icon={<EditOutlined />} /> <Button key="hapus" onClick={() => removeanggaran(item.id, item.jumlah)} style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} /></td>
                            </tr>
                        )}
                    </table>
                </Col>
            </Row>

            <Modal
                title="Edit Rincian Anggaran"
                centered
                visible={modal}
                onOk={updaterinciananggaran}
                onCancel={modalTrigger}
            >
                <Label>Uraian</Label>
                <Input value={uraianForUpdate} onChange={(e) => setUraianForUpdate(e.target.value)} style={{ marginBottom: 10, width: '100%' }} />
                <Label>Volume</Label>
                <InputNumber
                    defaultValue={100000}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ marginBottom: 10, width: '100%' }}
                    value={volumeForUpdate}
                    onChange={value => { setVolumeForUpdate(value); setJumlahForUpdate(parseInt(hargaSatuanForUpdate) * parseInt(value)) }}
                />
                <Label>Satuan</Label>
                <Select defaultValue="" style={{ marginBottom: 10, width: '100%', borderWidth: 0 }} onChange={handleChangeSatuanForUpdate} value={satuanForUpdate}>
                    <Option value="">Satuan</Option>
                    {listSatuan.map((data) =>
                        <Option value={data.nama_attr}>{data.nama_attr}</Option>
                    )}
                </Select>
                <Label>Harga Satuan</Label>
                <InputNumber
                    defaultValue={100000}
                    formatter={value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ marginBottom: 10, width: '100%' }}
                    value={hargaSatuanForUpdate}
                    onChange={value => { setHargaSatuanForUpdate(value); setJumlahForUpdate(parseInt(volumeForUpdate) * parseInt(value)) }}
                />
                <Label>Jumlah</Label>
                <span >Rp <NumberFormat thousandSeparator={true} style={{ fontSize: 20, fontWeight: 'bold' }} displayType={'text'} value={jumlahForUpdate} /></span>
            </Modal>
        </Content >
    )
}

export default Kurir;