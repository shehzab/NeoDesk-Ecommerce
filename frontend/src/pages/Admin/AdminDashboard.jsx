import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "area",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        background: "#111827",
        foreColor: "#9ca3af"
      },
      tooltip: {
        theme: "dark",
        shared: true,
        intersect: false,
        y: {
          formatter: (value) => `$${value.toFixed(2)}`
        }
      },
      colors: ["#8b5cf6"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 2
      },
      title: {
        text: "Sales Analytics",
        align: "left",
        style: {
          fontSize: "18px",
          fontWeight: "600",
          color: "#e5e7eb"
        }
      },
      grid: {
        borderColor: "#1f2937",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      markers: {
        size: 4,
        colors: "#8b5cf6",
        strokeColors: "#111827",
        strokeWidth: 2,
        hover: {
          size: 6
        }
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            fontSize: "12px",
            fontWeight: "500",
            color: "#9ca3af"
          }
        },
        labels: {
          style: {
            colors: "#9ca3af",
            fontSize: "12px"
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          color: "#1f2937"
        }
      },
      yaxis: {
        title: {
          text: "Revenue ($)",
          style: {
            fontSize: "12px",
            fontWeight: "500",
            color: "#9ca3af"
          }
        },
        min: 0,
        labels: {
          style: {
            colors: "#9ca3af",
            fontSize: "12px"
          },
          formatter: (value) => `$${value.toFixed(0)}`
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -5,
        offsetX: -5,
        labels: {
          colors: "#e5e7eb"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100]
        }
      }
    },
    series: [{ name: "Revenue", data: [] }],
    
    barOptions: {
      chart: {
        type: "bar",
        fontFamily: "Inter, sans-serif",
        toolbar: {
          show: false
        },
        background: "#111827",
        foreColor: "#9ca3af"
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: "60%",
          distributed: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#ec4899"],
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: "#9ca3af"
          }
        }
      },
      yaxis: {
        title: {
          text: "Orders",
          style: {
            fontSize: "12px",
            fontWeight: "500",
            color: "#9ca3af"
          }
        },
        labels: {
          style: {
            colors: "#9ca3af"
          }
        }
      },
      grid: {
        borderColor: "#1f2937",
        strokeDashArray: 4
      },
      title: {
        text: "Weekly Orders",
        align: "left",
        style: {
          fontSize: "16px",
          fontWeight: "600",
          color: "#e5e7eb"
        }
      }
    },
    barSeries: [
      {
        name: "Orders",
        data: [25, 38, 42, 27, 34, 54, 41]
      }
    ]
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Revenue", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  const statCards = [
    {
      title: "Total Sales",
      value: isLoading ? <Loader /> : `$${sales?.totalSales.toFixed(2)}`,
      icon: <DollarSign className="text-black" size={20} />,
      bg: "bg-gradient-to-r from-purple-500 to-violet-600",
      iconBg: "bg-purple-300"
    },
    {
      title: "Customers",
      value: loading ? <Loader /> : customers?.length,
      icon: <Users className="text-black" size={20} />,
      bg: "bg-gradient-to-r from-pink-500 to-rose-500",
      iconBg: "bg-pink-300"
    },
    {
      title: "Total Orders",
      value: loadingTwo ? <Loader /> : orders?.totalOrders,
      icon: <ShoppingCart className="text-black" size={20} />,
      bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
      iconBg: "bg-cyan-300"
    }
  ];

  return (
    <div className="flex bg-black min-h-screen text-gray-200">
      {/* AdminMenu is kept, but we'll adjust the main content area */}
      <AdminMenu />
      
      {/* Main content with padding adjustments */}
      <div className="flex-1 p-8 transition-all duration-300">
        {/* Add responsive container with margins that adjust based on screen size */}
        <div className="mx-auto w-full max-w-7xl pl-16 lg:pl-20 xl:pl-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome to your admin control panel</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {statCards.map((card, index) => (
              <div 
                key={index} 
                className={`rounded-lg ${card.bg} p-6 text-white shadow-lg shadow-gray-900/30`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className={`rounded-full ${card.iconBg} p-3`}>
                    {card.icon}
                  </div>
                  <TrendingUp size={20} className="text-white/80" />
                </div>
                <p className="text-lg font-medium opacity-90">{card.title}</p>
                <h2 className="text-3xl font-bold mt-2">{card.value}</h2>
              </div>
            ))}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg shadow-gray-900/30 border border-gray-800">
              <Chart
                options={state.options}
                series={state.series}
                type="area"
                height={350}
              />
            </div>
            
            {/* Bar Chart */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg shadow-gray-900/30 border border-gray-800">
              <Chart
                options={state.barOptions}
                series={state.barSeries}
                type="bar"
                height={350}
              />
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-gray-900 rounded-lg shadow-lg shadow-gray-900/30 border border-gray-800 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Recent Orders</h3>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                View All
              </button>
            </div>
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;