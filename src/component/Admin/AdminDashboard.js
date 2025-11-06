import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const VendorDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [productStocks, setProductStocks] = useState({});
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('day'); // 'day', 'week', 'month'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = () => {
    axios.get('http://localhost:8080/api/stocks/all-stocks')
      .then((res) => {
        const data = res.data;

        // Aggregate stocks by product name
        const aggregatedStocks = {};
        data.forEach(stock => {
          const productName = stock.product?.productName || 'Unknown Product';

          if (!aggregatedStocks[productName]) {
            aggregatedStocks[productName] = {
              productName: productName,
              inStock: 0,
              outStock: 0,
              currentStock: 0
            };
          }

          aggregatedStocks[productName].inStock += stock.inStock || 0;
          aggregatedStocks[productName].outStock += stock.outStock || 0;
          aggregatedStocks[productName].currentStock =
            aggregatedStocks[productName].inStock - aggregatedStocks[productName].outStock;
        });

        setStocks(data);
        setProductStocks(aggregatedStocks);
      })
      .catch((err) => console.error('Error fetching stocks:', err));
  };

  const productStockArray = Object.values(productStocks);

  // Filter stocks based on report type and date
  const getFilteredStocks = () => {
    const currentDate = new Date(selectedDate);
    
    switch (reportType) {
      case 'day':
        return stocks; // Return all stocks for daily report
        
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        
        // Since we don't have date field in stock, return all stocks
        // In a real scenario, you would filter by stock creation/update date
        return stocks;
        
      case 'month':
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
        // Since we don't have date field in stock, return all stocks
        // In a real scenario, you would filter by stock creation/update date
        return stocks;
        
      default:
        return stocks;
    }
  };

  // Calculate profit for individual stock
  const calculateProfit = (stock) => {
    try {
      const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
      const sellingPrice = parseFloat(stock.sellingPrice) || 0;
      const quantitySold = parseInt(stock.outStock) || 0;
      
      const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
      return profitPerUnit * quantitySold;
    } catch (error) {
      console.error('Error calculating profit for stock:', stock.stockId, error);
      return 0;
    }
  };

  // Calculate profit margin percentage
  const calculateProfitMargin = (stock) => {
    try {
      const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
      const sellingPrice = parseFloat(stock.sellingPrice) || 0;
      
      if (buyingPrice <= 0) return 0;
      
      const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
      return Math.max(0, margin);
    } catch (error) {
      return 0;
    }
  };

  // Get shelf name from stock
  const getShelfName = (stock) => {
    if (!stock.product?.shelf) return 'No Shelf Assigned';
    return `${stock.product.shelf.shelfName} - ${stock.product.shelf.locationDescription}`;
  };

  // Get report title based on type and date
  const getReportTitle = () => {
    const date = new Date(selectedDate);
    switch (reportType) {
      case 'day':
        return `Daily Stock Report - ${date.toLocaleDateString()}`;
      case 'week':
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `Weekly Stock Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
      case 'month':
        return `Monthly Stock Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      default:
        return 'Stock Report';
    }
  };

  // Download PDF Report with all stock data
  const downloadPDFReport = () => {
    setLoading(true);
    
    const filteredStocks = getFilteredStocks();
    
    // Calculate totals
    const totalProfit = filteredStocks.reduce((sum, stock) => sum + calculateProfit(stock), 0);
    const totalInvestment = filteredStocks.reduce((sum, stock) => 
      sum + (parseFloat(stock.latestPurchasePrice) || 0) * (parseInt(stock.currentStock) || 0), 0
    );

    // Create report data with all stock details
    const reportData = {
      title: getReportTitle(),
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalStocks: filteredStocks.length,
        totalProducts: new Set(filteredStocks.map(stock => stock.product?.productName)).size,
        totalProfit: totalProfit,
        totalInvestment: totalInvestment,
        totalInStock: filteredStocks.reduce((sum, stock) => sum + (parseInt(stock.inStock) || 0), 0),
        totalOutStock: filteredStocks.reduce((sum, stock) => sum + (parseInt(stock.outStock) || 0), 0),
        totalCurrentStock: filteredStocks.reduce((sum, stock) => sum + (parseInt(stock.currentStock) || 0), 0)
      },
      stocks: filteredStocks.map(stock => ({
        stockId: stock.stockId,
        productName: stock.product?.productName || 'N/A',
        shelfLocation: getShelfName(stock),
        inStock: stock.inStock || 0,
        outStock: stock.outStock || 0,
        currentStock: stock.currentStock || 0,
        status: stock.status || 'N/A',
        buyingPrice: parseFloat(stock.latestPurchasePrice || 0).toFixed(2),
        sellingPrice: parseFloat(stock.sellingPrice || 0).toFixed(2),
        profit: calculateProfit(stock).toFixed(2),
        margin: calculateProfitMargin(stock).toFixed(1) + '%'
      }))
    };

    // Generate PDF
    generatePDF(reportData);
  };

  // Generate PDF using jsPDF - FIXED VERSION
  const generatePDF = (reportData) => {
    // Import jsPDF dynamically
    import('jspdf').then((jsPDFModule) => {
      const { jsPDF } = jsPDFModule;
      const pdf = new jsPDF();
      
      // Set initial y position
      let yPosition = 20;
      
      // Add title
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('COMPLETE STOCK REPORT', 105, yPosition, { align: 'center' });
      yPosition += 10;
      
      // Add report details
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Report: ${reportData.title}`, 20, yPosition);
      yPosition += 6;
      pdf.text(`Generated: ${reportData.generatedAt}`, 20, yPosition);
      yPosition += 15;
      
      // Add summary section
      pdf.setFontSize(12);
      pdf.setTextColor(40, 40, 40);
      pdf.text('SUMMARY', 20, yPosition);
      yPosition += 8;
      
      pdf.setFontSize(9);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Total Stock Entries: ${reportData.summary.totalStocks}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Products: ${reportData.summary.totalProducts}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Profit: Tsh ${reportData.summary.totalProfit.toFixed(2)}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Investment: Tsh ${reportData.summary.totalInvestment.toFixed(2)}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total In Stock: ${reportData.summary.totalInStock}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Out Stock: ${reportData.summary.totalOutStock}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Current Stock: ${reportData.summary.totalCurrentStock}`, 20, yPosition);
      yPosition += 15;
      
      // Add table headers - FIXED: Proper header implementation
      pdf.setFontSize(9);
      
      // Table headers configuration
      const headers = ['Product', 'Shelf', 'In', 'Out', 'Current', 'Status', 'Buying', 'Selling', 'Profit', 'Margin'];
      const columnWidths = [32, 28, 12, 12, 15, 18, 18, 18, 18, 16];
      
      // Draw header background
      pdf.setFillColor(59, 89, 152); // Blue background
      pdf.rect(10, yPosition, 186, 8, 'F');
      
      // Add header text - FIXED: Set text color to white before writing headers
      pdf.setTextColor(255, 255, 255); // White text
      let xPosition = 12;
      
      headers.forEach((header, index) => {
        pdf.text(header, xPosition, yPosition + 6);
        xPosition += columnWidths[index];
      });
      
      yPosition += 12; // Move down for data rows
      
      // Reset text color for data rows
      pdf.setTextColor(0, 0, 0); // Black text
      
      // Add table rows
      pdf.setFontSize(8);
      
      reportData.stocks.forEach((stock, index) => {
        // Check if we need a new page
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
          
          // Add headers on new page
          pdf.setFontSize(9);
          pdf.setFillColor(59, 89, 152);
          pdf.rect(10, yPosition, 186, 8, 'F');
          
          pdf.setTextColor(255, 255, 255);
          xPosition = 12;
          headers.forEach((header, idx) => {
            pdf.text(header, xPosition, yPosition + 6);
            xPosition += columnWidths[idx];
          });
          
          yPosition = 32; // Move down for data rows
          pdf.setFontSize(8);
          pdf.setTextColor(0, 0, 0);
        }
        
        // Alternate row colors for better readability
        if (index % 2 === 0) {
          pdf.setFillColor(245, 245, 245); // Light gray for alternate rows
          pdf.rect(10, yPosition - 4, 186, 6, 'F');
        }
        
        // Reset fill color for text
        pdf.setFillColor(255, 255, 255);
        
        xPosition = 12;
        
        // Product Name (truncate if too long)
        pdf.text(stock.productName.substring(0, 18), xPosition, yPosition);
        xPosition += columnWidths[0];
        
        // Shelf Location (truncate if too long)
        pdf.text(stock.shelfLocation.substring(0, 12), xPosition, yPosition);
        xPosition += columnWidths[1];
        
        // In Stock
        pdf.text(stock.inStock.toString(), xPosition, yPosition);
        xPosition += columnWidths[2];
        
        // Out Stock
        pdf.text(stock.outStock.toString(), xPosition, yPosition);
        xPosition += columnWidths[3];
        
        // Current Stock
        pdf.text(stock.currentStock.toString(), xPosition, yPosition);
        xPosition += columnWidths[4];
        
        // Status (truncate if too long)
        pdf.text(stock.status.substring(0, 10), xPosition, yPosition);
        xPosition += columnWidths[5];
        
        // Buying Price
        pdf.text(stock.buyingPrice, xPosition, yPosition);
        xPosition += columnWidths[6];
        
        // Selling Price
        pdf.text(stock.sellingPrice, xPosition, yPosition);
        xPosition += columnWidths[7];
        
        // Profit
        pdf.text(stock.profit, xPosition, yPosition);
        xPosition += columnWidths[8];
        
        // Margin
        pdf.text(stock.margin, xPosition, yPosition);
        
        yPosition += 6;
      });
      
      // Add footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
        pdf.text('Generated by Stock Management System', 105, 290, { align: 'center' });
      }
      
      // Save PDF
      const fileName = `stock_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
      pdf.save(fileName);
      setLoading(false);
    }).catch(error => {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report');
      setLoading(false);
    });
  };

  // Download CSV Report with all stock data
  const downloadCSVReport = () => {
    setLoading(true);
    
    const filteredStocks = getFilteredStocks();
    
    // Calculate totals
    const totalProfit = filteredStocks.reduce((sum, stock) => sum + calculateProfit(stock), 0);
    const totalInvestment = filteredStocks.reduce((sum, stock) => 
      sum + (parseFloat(stock.latestPurchasePrice) || 0) * (parseInt(stock.currentStock) || 0), 0
    );

    const reportData = {
      title: getReportTitle(),
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalStocks: filteredStocks.length,
        totalProducts: new Set(filteredStocks.map(stock => stock.product?.productName)).size,
        totalProfit: totalProfit,
        totalInvestment: totalInvestment,
        totalInStock: filteredStocks.reduce((sum, stock) => sum + (parseInt(stock.inStock) || 0), 0),
        totalOutStock: filteredStocks.reduce((sum, stock) => sum + (parseInt(stock.outStock) || 0), 0),
        totalCurrentStock: filteredStocks.reduce((sum, stock) => sum + (parseInt(stock.currentStock) || 0), 0)
      },
      stocks: filteredStocks.map(stock => ({
        stockId: stock.stockId,
        productName: stock.product?.productName || 'N/A',
        shelfLocation: getShelfName(stock),
        inStock: stock.inStock || 0,
        outStock: stock.outStock || 0,
        currentStock: stock.currentStock || 0,
        status: stock.status || 'N/A',
        buyingPrice: parseFloat(stock.latestPurchasePrice || 0).toFixed(2),
        sellingPrice: parseFloat(stock.sellingPrice || 0).toFixed(2),
        profit: calculateProfit(stock).toFixed(2),
        margin: calculateProfitMargin(stock).toFixed(1) + '%'
      }))
    };

    // Create CSV content
    const csvContent = createCSVContent(reportData);
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `stock_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setLoading(false);
  };

  // Create CSV content from report data
  const createCSVContent = (reportData) => {
    const headers = ['Stock ID', 'Product Name', 'Shelf Location', 'In Stock', 'Out Stock', 'Current Stock', 'Status', 'Buying Price', 'Selling Price', 'Profit', 'Margin'];
    const csvRows = [];
    
    // Add header
    csvRows.push(headers.join(','));
    
    // Add data rows
    reportData.stocks.forEach(stock => {
      const row = [
        stock.stockId,
        `"${stock.productName}"`,
        `"${stock.shelfLocation}"`,
        stock.inStock,
        stock.outStock,
        stock.currentStock,
        `"${stock.status}"`,
        stock.buyingPrice,
        stock.sellingPrice,
        stock.profit,
        stock.margin
      ];
      csvRows.push(row.join(','));
    });
    
    // Add summary
    csvRows.push('');
    csvRows.push('SUMMARY');
    csvRows.push(`Total Stock Entries,${reportData.summary.totalStocks}`);
    csvRows.push(`Total Products,${reportData.summary.totalProducts}`);
    csvRows.push(`Total Profit,Tsh${reportData.summary.totalProfit.toFixed(2)}`);
    csvRows.push(`Total Investment,Tsh${reportData.summary.totalInvestment.toFixed(2)}`);
    csvRows.push(`Total In Stock,${reportData.summary.totalInStock}`);
    csvRows.push(`Total Out Stock,${reportData.summary.totalOutStock}`);
    csvRows.push(`Total Current Stock,${reportData.summary.totalCurrentStock}`);
    csvRows.push('');
    csvRows.push(`Report Title,${reportData.title}`);
    csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
    return csvRows.join('\n');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Navigation />
      <div style={{ flex: 1, padding: '20px', marginTop: '20px', width: "1598px", marginLeft: '250px', overflow: 'hidden' }}>
        {/* Fixed Header Section */}
        <div style={{ position: 'sticky', top: 0, backgroundColor: '#f5f7fa', zIndex: 10, paddingBottom: '20px' }}>
          <h2 style={{ margin: '20px 0 30px 0', textAlign: 'center', backgroundColor: "blanchedalmond", fontWeight: '600', color: '#2c3e50', fontSize: '28px', width: "1300px", overflow: "hidden" }}>
            📦 Stock Overview
          </h2>

          {/* Download Report Section */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center', 
            marginBottom: '20px',
            gap: '15px',
            marginRight: '20px'
          }}>
            {/* Report Download Section */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              backgroundColor: '#f8f9fa',
              padding: '10px 15px',
              borderRadius: '8px',
              border: '1px solid #dee2e6'
            }}>
              {/* Date Selection */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
                  Select Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '5px',
                    border: '1px solid #ced4da',
                    backgroundColor: 'white',
                    fontSize: '12px'
                  }}
                />
              </div>

              {/* Report Type Selection */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
                  Report Type:
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '5px',
                    border: '1px solid #ced4da',
                    backgroundColor: 'white',
                    fontSize: '12px'
                  }}
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                </select>
              </div>
              
              <button
                onClick={downloadPDFReport}
                disabled={loading}
                style={{
                  padding: '5px 13px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  opacity: loading ? 0.7 : 1
                }}
              >
                📄 {loading ? 'Generating...' : 'PDF Report'}
              </button>

              <button
                onClick={downloadCSVReport}
                disabled={loading}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  opacity: loading ? 0.7 : 1
                }}
              >
                📊 {loading ? 'Generating...' : 'CSV Report'}
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Cards Section Only */}
        <div style={{ 
          height: 'calc(100vh - 280px)', 
          overflowY: 'auto', 
          padding: '10px 20px 20px 20px',
          margin: '0 -20px'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '25px', 
            justifyItems: 'center' 
          }}>
            {productStockArray.map((product, index) => (
              <div
                key={product.productName}
                style={{
                  borderRadius: "18px",
                  padding: "25px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "320px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  background: index % 2 === 0 ? "linear-gradient(135deg, #e3f2fd, #bbdefb)" : "linear-gradient(135deg, #ffebee, #ffcdd2)",
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: index % 2 === 0 ? '#2196f3' : '#f44336' }}></div>
                <h3 style={{ color: "#263238", fontSize: "20px", margin: "15px 0", fontWeight: '600' }}>{product.productName}</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: 'rgba(33, 150, 243, 0.1)', display: 'inline-block', marginBottom: '8px' }}>
                      <span style={{ fontSize: '24px', color: '#2196f3' }}>📥</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>In Stock</p>
                    <p style={{ fontSize: "18px", color: "#2196f3", fontWeight: 'bold', margin: 0 }}>{product.inStock}</p>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: 'rgba(244, 67, 54, 0.1)', display: 'inline-block', marginBottom: '8px' }}>
                      <span style={{ fontSize: '24px', color: '#f44336' }}>📤</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>Out Stock</p>
                    <p style={{ fontSize: "18px", color: "#f44336", fontWeight: 'bold', margin: 0 }}>{product.outStock}</p>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(38, 50, 56, 0.05)' }}>
                  <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>Current Stock</p>
                  <p style={{ fontSize: "22px", color: "#263238", fontWeight: 'bold', margin: 0 }}>{product.currentStock}</p>
                </div>
              </div>
            ))}

            {productStockArray.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#78909c' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
                <h3 style={{ color: '#546e7a', marginBottom: '10px' }}>No stock data available</h3>
                <p>Stocks will appear here once they are added to the system</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
