import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';

export interface DashboardStats {
  totalProducts: number;
  salesToday: number;
  lowStockCount: number;
  pendingOrders: number;
  totalRevenue: number;
  newCustomers: number;
  totalOrders: number;
  customerSatisfaction: number;
}


export interface RecentActivity {
  id: number;
  type: 'order' | 'product' | 'customer' | 'stock';
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
}


export interface TopProduct {
  id: number;
  name: string;
  sales: number;
  revenue: number;
  stock: number;
  trend: 'up' | 'down';
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  stats: DashboardStats = {
    totalProducts: 0,
    salesToday: 0,
    lowStockCount: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    newCustomers: 0,
    totalOrders: 0,
    customerSatisfaction: 0
  };

  // Chart Data
  salesChartData: any;
  revenueChartData: any;
  inventoryChartData: any;
  chartOptions: any;

  // Demo Data
  recentActivities: RecentActivity[] = [];
  topProducts: TopProduct[] = [];
  lowStockProducts: any[] = [];

  isLoading = true;
  isError = false;
  errorMessage = '';
  private dataSubscription!: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
    this.initializeChartOptions();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.isError = false;

    this.dataSubscription = this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.generateChartData();
        this.generateDemoData();
        this.isLoading = false;
      },
      error: (error) => {
        this.isError = true;
        this.errorMessage = 'Failed to load dashboard data. Please try again.';
        this.isLoading = false;
        console.error('Dashboard error:', error);
      }
    });
  }

  initializeChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }
    };
  }

  generateChartData(): void {
    // Sales Chart Data
    this.salesChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'This Week',
          data: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Last Week',
          data: [800, 1200, 1000, 1500, 1200, 1800, 1600],
          borderColor: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };

    // Revenue Chart Data
    this.revenueChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [65000, 59000, 80000, 81000, 78000, 85000],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(201, 203, 207, 0.8)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }
      ]
    };

    // Inventory Chart Data
    this.inventoryChartData = {
      labels: ['In Stock', 'Low Stock', 'Out of Stock'],
      datasets: [
        {
          data: [300, 45, 12],
          backgroundColor: [
            '#4CAF50',
            '#FF9800',
            '#F44336'
          ],
          hoverBackgroundColor: [
            '#45a049',
            '#e68900',
            '#da190b'
          ]
        }
      ]
    };
  }

  generateDemoData(): void {
    // Recent Activities
    this.recentActivities = [
      {
        id: 1,
        type: 'order',
        title: 'New Order Received',
        description: 'Order #ORD-0012 for $256.00',
        time: '2 minutes ago',
        icon: 'bi-cart-check',
        color: 'success'
      },
      {
        id: 2,
        type: 'product',
        title: 'Product Low Stock',
        description: 'Mojo only 3 items left',
        time: '1 hour ago',
        icon: 'bi-exclamation-triangle',
        color: 'warning'
      },
      {
        id: 3,
        type: 'customer',
        title: 'New Customer Registered',
        description: 'Akij Ahmed joined the platform',
        time: '3 hours ago',
        icon: 'bi-person-plus',
        color: 'info'
      },
      {
        id: 4,
        type: 'stock',
        title: 'Stock Updated',
        description: 'Cup Cake stock increased',
        time: '5 hours ago',
        icon: 'bi-box-arrow-in-down',
        color: 'primary'
      }
    ];

    // Top Products
    this.topProducts = [
      {
        id: 1,
        name: 'Milk Vita Butter',
        sales: 156,
        revenue: 187200,
        stock: 45,
        trend: 'up'
      },
      {
        id: 2,
        name: 'Farm Fresh Yogurt',
        sales: 128,
        revenue: 102400,
        stock: 23,
        trend: 'up'
      },
      {
        id: 3,
        name: 'ACI Pure Chinigura Rice',
        sales: 89,
        revenue: 106800,
        stock: 12,
        trend: 'down'
      },
      {
        id: 4,
        name: 'Dan Cake - Cup Cake',
        sales: 203,
        revenue: 60900,
        stock: 67,
        trend: 'up'
      }
    ];

    // Low Stock Products
    this.lowStockProducts = [
      { id: 1, name: 'Mojo', currentStock: 2, minStock: 10 },
      { id: 2, name: 'Fresh Ghee', currentStock: 3, minStock: 15 },
      { id: 3, name: 'Fresh Rice Bran Oil', currentStock: 1, minStock: 8 },
      { id: 4, name: 'Fresh Yogurt', currentStock: 4, minStock: 12 }
    ];
  }

  getTrendIcon(trend: 'up' | 'down'): string {
    return trend === 'up' ? 'bi-arrow-up-circle text-success' : 'bi-arrow-down-circle text-danger';
  }

  getStockStatus(stock: number, minStock: number): string {
    if (stock === 0) return 'Out of Stock';
    if (stock <= minStock) return 'Low Stock';
    return 'In Stock';
  }

  getStockBadgeClass(stock: number, minStock: number): string {
    if (stock === 0) return 'badge bg-danger';
    if (stock <= minStock) return 'badge bg-warning';
    return 'badge bg-success';
  }

  refreshDashboard(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}