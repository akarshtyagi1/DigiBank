import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generatePdf(data: any[], headers: string[], fileName: string) {
    console.log('in pdf service');
    const table = {
      headerRows: 1,
      widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
      body: [headers, ...data],
    };

    const pdfDefinition = {
      content: [
        { text: 'Table Report', style: 'header' },
        {
          table: table,
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(pdfDefinition).download(`${fileName}.pdf`);
  }
}
