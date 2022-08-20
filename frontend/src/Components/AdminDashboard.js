import { Outlet } from "react-router-dom"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { useEffect, useState } from "react"
import "./AdminDashboard.css"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const AdminDashboard = () => {

  const [productData, setProductData] = useState(null)
  const [productLoading, setProductLoading] = useState(false)
  const [stockData, setstockData] = useState({});
  const [price, setprice] = useState({});


  const extractData = (data, labelfield, datafield) => {
    const result = { labels: [], data: [] }
    data.map((item) => {
      result.labels.push(item[labelfield]);
      result.data.push(item[datafield]);
    }
    )
    console.log(result);
    return result
  }

  //for product details
  const loadProductData = () => {
    setProductLoading(true)
    fetch("http://localhost:5000/data/getall").then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data)
          setProductLoading(false)
          setProductData(data)

          setstockData(extractData(data, "title", "stock"));
          setprice(extractData(data, "title", "price"));

        })
      }
    })
  }
  useEffect(() => {
    loadProductData()
  }, [])


  const displayStockChart = () => {

    return <Bar data={
      {
        labels: stockData.labels,
        datasets: [
          {
            label: "Stock",
            data: stockData.data,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }
    } />
  }


  const displayPriceChart = () => {

    return <Bar data={
      {
        labels: price.labels,
        datasets: [
          {
            label: "Price",
            data: price.data,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }
    } />
  }

  return (
    <div>
      <div className="container">
        <div className="chart-1">
          {displayStockChart()}
        </div>
        <div className="chart-2">
          {displayPriceChart()}
        </div>
        <div className="chart-1">
          {displayStockChart()}
        </div>
        <div className="chart-2">
          {displayPriceChart()}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard;
