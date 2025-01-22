"use client"

import { PDFViewer, Page, View, Text, Document, PDFDownloadLink, Image } from "@react-pdf/renderer"
import { styles } from './style'
import { ToRupiah } from '@/lib/toRupiah'
import useAxiosAuth from "@/hooks/useAxiosAuth"
import { useQuery } from "@tanstack/react-query"

const SettingPage = () => {

    const axiosAuth = useAxiosAuth()

    const { data: invoice, isLoading } = useQuery({
        queryKey: ["fetch.invoice"],
        queryFn: async () => {
            return await axiosAuth.get('/api/invoice')
        }
    })

    const DAY = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
    const MONTH = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

    const date = new Date()
    date.setDate(date.getDate() - 1)

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const Invoice = () => {
        return (
            <Document>
                <Page size="A4" style={[styles.page, { display: "flex", flexDirection: "column", gap: "16px" }]}>
                    <View>
                        <Text style={{ fontSize: "12px", fontWeight: "light", marginBottom: "8px" }}>{DAY[date.getDay()] + ", " + date.getDate() + " " + MONTH[date.getMonth()] + " " + date.getFullYear()}</Text>
                        <Text style={{ fontSize: "12px", fontWeight: "light", marginBottom: "8px" }}>{date.toLocaleTimeString()}</Text>
                    </View>
                    <View style={styles.header}>
                        <View style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Text style={[styles.title, styles.textBold]}>Laporan Pendapatan Bulan Ini</Text>
                            <Text style={styles.textBold}>{MONTH[date.getMonth()]}</Text>
                            <Text style={styles.textBold}>{firstDay.getDate() + " " + MONTH[date.getMonth()] + " " + date.getFullYear()} - {lastDay.getDate() + " " + MONTH[date.getMonth()] + " " + date.getFullYear()}</Text>
                        </View>
                        <View style={styles.spaceY}>
                            <Image style={{ width: "80px", height: "80px" }} src={"/logo.png"}></Image>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "#f9f9f9", padding: "24px", marginBottom: "16px" }}>
                        <View style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={styles.textBold}>Pendapatan</Text>
                                <Text style={styles.textBold}>{ToRupiah(invoice?.data.income)}</Text>
                            </View>
                            <View style={{ width: '100%', borderBottom: '1px', borderBottomColor: '#dcdcdc' }}></View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={styles.textBold}>Total Jam</Text>
                                <Text style={styles.textBold}>{invoice?.data.totalJam} Jam</Text>
                            </View>
                            <View style={{ width: '100%', borderBottom: '1px', borderBottomColor: '#dcdcdc' }}></View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={styles.textBold}>Total Order</Text>
                                <Text style={styles.textBold}>{invoice?.data.totalUser} User</Text>
                            </View>
                            <View style={{ width: '100%', borderBottom: '1px', borderBottomColor: '#dcdcdc' }}></View>
                        </View>
                        <View style={[styles.totals, { marginTop: "18px" }]}>
                            <Text style={styles.textBold}>Total Pendapatan</Text>
                            <Text style={styles.textBold}>{ToRupiah(invoice?.data.income)}</Text>
                        </View>
                    </View>

                </Page>
            </Document>
        )
    }
    return (
        <div className="w-full h-full ">
            <div className="w-full h-full">
                {
                    isLoading ? <div>Loading</div> : (
                        <PDFViewer className='w-full' width="100%" height="100%">
                            <Invoice />
                        </PDFViewer>
                    )
                }
            </div>
            <div className="mt-6 flex justify-center">
                <PDFDownloadLink document={<Invoice />} fileName="invoice.pdf">
                    <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                        Download PDF
                    </button>
                </PDFDownloadLink>
            </div>
        </div>
    )
}

export default SettingPage