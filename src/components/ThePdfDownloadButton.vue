<template>
  <button @click="downloadPdf" class="btn btn-primary">
    Download PDF
  </button>
</template>

<script>
import html2pdf from 'html2pdf.js'

export default {
  name: 'PdfDownloadButton',
  methods: {
    downloadPdf() {
      const element = document.getElementById('app');
      const originalStyle = element.style.cssText;

      // Function to restore original styles
      const restoreStyles = () => {
        element.style.cssText = originalStyle;
        window.dispatchEvent(new Event('resize'));
      };

      // Set styles for PDF generation
      element.style.width = '1000px';
      element.style.fontSize = '10px';
      window.dispatchEvent(new Event('resize'));

      // Wait for layout to adjust
      setTimeout(() => {
        const opt = {
          margin: 5,
          filename: 'bd-income-tax-calculation.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 1.5,
            useCORS: true,
            logging: true,
            letterRendering: true
          },
          jsPDF: {
            unit: 'mm',
            format: [297, 210], // A4 landscape
            orientation: 'landscape'
          }
        };

        html2pdf().set(opt).from(element).save()
            .then(() => {
              restoreStyles();
            })
            .catch((error) => {
              console.error('PDF generation failed:', error);
              restoreStyles();
            });
      }, 1000);
    }
  }
}
</script>