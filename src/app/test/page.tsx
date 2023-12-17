"use client";

import { CardPdf } from "@/pdf/Card";
import { PDFViewer } from "@react-pdf/renderer";

export default function PersonalCardPage() {
    return (<>
        <PDFViewer width="100%" height="400" className="app" >
            <CardPdf
                client="Advanced Cure"
                doctor="Mesoun"
                patient="ffv"
                fileNo="434"
                orderNo="2"
                issueddate="12/08/2023"
            />
        </PDFViewer>
    </>)
}