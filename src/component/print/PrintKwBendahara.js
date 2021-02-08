import React from 'react';
import { Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    PrinterOutlined,
    DollarCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid } from '../../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
//import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import NumberFormat from 'react-number-format'
import moment from 'moment';
import renderHTML from 'react-render-html';
import 'moment/locale/id';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
moment.locale('id')

const terbilang = require('angka-menjadi-terbilang')

export class ComponentToPrintKwitansiBendahara extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            penggunaAnggaran: [],
            bendaharaPengeluaran: [],
            listPegawai: [],
            listSppd: [],
            penandatangan: [],
            penandatangankeuangan: [],
            kabkota: [],
            provinsi: [],
            instansi: [],
            pengikut: [],
            anggaran: [],
            total: 0
        };
    }

    componentDidMount() {
        this.getSppdByIdForPrint(this.props.dataToPrint)
        this.getPegawaiAll()
    }
    // const [listPegawai, setListPegawai] = useState([])
    // const [listSppd, setListSppd] = useState([])
    // const [penandatangan, setPenandatangan] = useState([])
    // const [kabkota, setKabKota] = useState([])
    // const [provinsi, setProvinsi] = useState([])
    // const [instansi, setInstansi] = useState([])
    // const [pengikut, setPengikut] = useState([])

    // useEffect(() => {
    //     console.log(props.dataToPrint)
    // }, [])

    async getSppdByIdForPrint(id) {
        const url = 'getsppdbyidforprint'
        let sppdbyid = await getbyid(id, url)

        this.setState({
            listPegawai: sppdbyid.pegawai[0],
            listSppd: sppdbyid.sppd[0],
            penandatangan: sppdbyid.penandatangan[0],
            penandatangankeuangan: sppdbyid.penandatangankeuangan[0],
            kabkota: sppdbyid.kab_kota[0],
            provinsi: sppdbyid.provinsi[0],
            instansi: sppdbyid.instansi[0],
            pengikut: sppdbyid.pengikut,
            anggaran: sppdbyid.anggaran
        })
        const { anggaran, total } = this.state
        console.log(anggaran.length)
        let tootal = 0
        for (let i = 0; i < anggaran.length; i++) {
            tootal += parseInt(anggaran[i].jumlah)
            console.log(tootal)
            //setTotal(parseInt(total) + parseInt(rincian[i].jumlah))
            this.setState({
                total: tootal
            })
        }
        console.log(sppdbyid)
    }


    async getPegawaiAll() {
        const url = 'getpegawai'
        let pegawai = await getall(url)

        console.log('Pegawai')
        console.log(pegawai.filter(asn => asn.jabatan === "Bendahara"))
        let bndhrpengeluaran = pegawai.filter(asn => asn.jabatan === "Bendahara Pengeluaran")
        let pgnanggaran = pegawai.filter(asn => asn.jabatan === "Pengguna Anggaran")
        this.setState({
            bendaharaPengeluaran: bndhrpengeluaran[0],
            penggunaAnggaran : pgnanggaran[0]
        })
    }

    render() {
        const { listPegawai, listSppd, penandatangan, kabkota, provinsi, instansi, pengikut, anggaran, total, penandatangankeuangan, penggunaAnggaran, bendaharaPengeluaran } = this.state
        return (
            <table style={{ fontSize: 12, width: '100%' }}>
                <table style={{ width: '100%', marginBottom: 10 }}>
                    <tbody>
                        <tr>
                            <center><td style={{ fontSize: 18, color: 'black' }}><b>KUITANSI</b></td></center>
                            <center><td style={{ fontSize: 12, color: 'black' }}><b>Nomor : ______________________________________________</b></td></center>
                        </tr>
                    </tbody>
                </table>
                <table style={{ marginBottom: 20 }}>
                    <tbody>
                        <tr>
                            <td>Sudah Terima Dari</td>
                            <td>:</td>
                            <td><b>KUASA PENGGUNA ANGGARAN DINAS KOMINFO DAN INFORMATIKA KOTA SINGKAWANG</b></td>
                        </tr>
                        <tr>
                            <td>Uang Sejumlah</td>
                            <td>:</td>
                            <td style={{ backgroundColor: '#dfe6e9', width: '80%' }}><i><b>{(terbilang(total)).toUpperCase()} RUPIAH</b></i></td>
                        </tr>
                        <tr>
                            <td>Uang Pembayaran</td>
                            <td>:</td>
                            <td>Belanja Perjalanan Dinas ASN {listPegawai.nama_pegawai} ke {kabkota.nama} untuk kegiatan {renderHTML(listSppd.maksud || '')}</td>
                        </tr>

                    </tbody>
                </table>

                <table style={{ width: '100%', border: '1px solid black' }}>
                    <tbody style={{ width: '100%' }}>
                        <tr style={{ width: '100%', border: '1px solid black' }}>

                            <td style={{ border: '1px solid black', textAlign: 'left', padding: 10, width: '50%' }}>
                                Terbilang Rp : <NumberFormat thousandSeparator={true} displayType={'text'} value={total} />
                            </td>
                            <td style={{ border: '1px solid black', textAlign: 'right', padding: 10, width: '50%' }}>
                                <center>
                                    Singkawang, ___________________________________20__ <br />
                                    Yang Menerima,
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <b>( {listPegawai.nama_pegawai} )</b><br />
                                    <b>NIP. {listPegawai.nip}</b>
                                </center>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <table style={{ width: '100%', border: '1px solid black' }}>
                    <tbody style={{ width: '100%' }}>
                        <tr style={{ width: '100%', border: '1px solid black' }}>
                            <td style={{ border: '1px solid black', padding: 10, width: '33%' }}>
                            <center>
                                    Mengetahui dan Setuju dibayar :<br />
                                    <b>Pengguna Anggaran <br />Dinas Kominfo Kota Singkawang</b>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <b>{penggunaAnggaran.nama_pegawai}</b><br />
                                    <b>{penggunaAnggaran.pangkat_gol}</b><br />
                                    <b>NIP. {penggunaAnggaran.nip}</b>
                                </center>
                            </td>
                            <td style={{ border: '1px solid black', padding: 10, width: '33%' }}>
                                <center>Dibukukan : </center> <br />
                                Tanggal : ___________________________________________________________________________ <br />
                                Nomor   : ___________________________________________________________________________ <br />
                            </td>
                            <td style={{ border: '1px solid black', textAlign: 'right', padding: 10, width: '33%' }}>
                            <center>
                                    Lunas dibayar :<br />
                                    <b>Bendahara Pengeluaran</b>
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <b>{bendaharaPengeluaran.nama_pegawai}</b><br />
                                    <b>NIP. {bendaharaPengeluaran.nip}</b>
                                </center>
                            </td>
                        </tr>

                    </tbody>
                </table>

                <hr />

                {/* <table style={{ width: '100%', marginBottom: 10, textAlign: 'center' }}>
                    <tbody>
                        <tr>
                            <td style={{ fontSize: 16, color: 'black' }}>KUITANSI</td>
                        </tr>
                        <tr>
                            <td style={{ fontSize: 14, color: 'black' }}><b>Nomor</b></td>
                        </tr>
                    </tbody>
                </table>
                <table >
                    <tbody style={{ width: '100%' }}>
                        <tr style={{ width: '100%'}}>
                            <td style={{ padding: 10 }}>Telah Terima Dari</td>
                            <td style={{ padding: 10 }}>:</td>
                            <td style={{ textAlign: 'right', padding: 10 }}>  </td>
                        </tr>
                        <tr style={{ width: '100%'}}>
                            <td style={{ padding: 10 }}>Uang Sejumlah</td>
                            <td style={{ padding: 10 }}>:</td>
                            <td style={{ textAlign: 'right', padding: 10 }}> {terbilang(total)} rupiah</td>
                        </tr>
                        <tr style={{ width: '100%'}}>
                            <td style={{ padding: 10 }}>Untuk Pembayaran</td>
                            <td style={{ padding: 10 }}>:</td>
                            <td style={{ textAlign: 'right', padding: 10 }}>  </td>
                        </tr>
                        <tr>
                            <td colSpan='3' style={{ border: '1px solid black', textAlign: 'center', padding: 10, fontStyle: 'italic', fontWeight: 'bold' }}>Total</td>
                            <td style={{ border: '1px solid black', textAlign: 'right', padding: 10, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></td>
                        </tr>
                        <tr>
                            <td colSpan='5' style={{ border: '1px solid black', textAlign: 'center', padding: 10, fontStyle: 'italic', fontWeight: 'bold' }}>{terbilang(total)} rupiah</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{ width: '100%' }}>
                    <tr >
                        <td style={{ width: '50%', padding: 20 }}>
                            <br />
                            Telah dibayar sejumlah <b>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></b><br />
                            {() => {
                                if (penandatangankeuangan === null || undefined) {
                                    return <></>
                                } else {
                                    return (<>
                                        {penandatangankeuangan.jabatan},
                            <br />
                                        <br />
                                        <br />
                                        <br />
                                        <b>{penandatangankeuangan.nama_pegawai}<br /></b>
                                        <b>NIP. {penandatangankeuangan.nip} <br /></b>
                                    </>
                                    )
                                }
                            }}
                        </td>
                        <td style={{ width: '50%', padding: 20 }}>
                            {instansi.kota}, <b>{moment().format('LL')}</b><br />
                            Telah menerima uang sejumlah  <b>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></b><br />
                            Yang Menerima,
                            <br />
                            <br />
                            <br />
                            <br />
                            <b>{listPegawai.nama_pegawai}</b><br />
                            <b>NIP. {listPegawai.nip}</b>
                        </td>
                    </tr>
                </table> */}
            </table>
        );
    }

}