import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of, delay } from 'rxjs'; // <-- delay from 'rxjs'

interface UserStats {
  walletBalance: number;
  loyaltyPoints: number;
  ordersThisMonth: number;
  pendingDeliveries: number;
  savedItems: number;
  coupons: number;
  lastLoginAt: string;
}

interface OrderSummary {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

interface SupportTicket {
  id: string;
  subject: string;
  status: 'Open' | 'Pending' | 'Resolved';
  createdAt: string;
}

interface RecommendedProduct {
  id: number;
  name: string;
  price: number;
  badge?: 'New' | 'Hot' | 'Sale';
}

/** Payload interface so payload.recentOrders / recommendations never go "red" */
interface UserDashboardPayload {
  stats: UserStats;
  ordersChartData: any;
  spendChartData: any;
  recentOrders: OrderSummary[];
  tickets: SupportTicket[];
  recommendations: RecommendedProduct[];
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  stats: UserStats = {
    walletBalance: 0,
    loyaltyPoints: 0,
    ordersThisMonth: 0,
    pendingDeliveries: 0,
    savedItems: 0,
    coupons: 0,
    lastLoginAt: ''
  };

  // charts
  ordersChartData: any;
  spendChartData: any;
  chartOptions: any;

  // lists
  recentOrders: OrderSummary[] = [];
  tickets: SupportTicket[] = [];
  recommendations: RecommendedProduct[] = [];

  isLoading = true;
  isError = false;
  errorMessage = '';

  private sub?: Subscription;

  ngOnInit(): void {
    this.initChartOptions();
    this.loadData();
  }

  initChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(0,0,0,.08)' } }
      }
    };
  }

  loadData(): void {
    this.isLoading = true;
    this.isError = false;

    // ডेमো: এখানে আপনার UserDashboardService ব্যবহার করুন
    const demo$ = of(this.mockPayload()).pipe(delay(600));

    this.sub = demo$.subscribe({
      next: (payload: UserDashboardPayload) => {
        this.stats = payload.stats;

        // এই দুই লাইন আগে "লাল" হচ্ছিল—এখন payload টাইপড, আর লাল হবে না
        this.recentOrders = payload.recentOrders;
        this.recommendations = payload.recommendations;

        // বাকি ডেটা
        this.ordersChartData = payload.ordersChartData;
        this.spendChartData = payload.spendChartData;
        this.tickets = payload.tickets;

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = 'Failed to load user dashboard. Please try again.';
      }
    });
  }

  refresh(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // helpers
  statusBadge(status: OrderSummary['status']): string {
    switch (status) {
      case 'Processing': return 'badge bg-warning';
      case 'Shipped':    return 'badge bg-info';
      case 'Delivered':  return 'badge bg-success';
      case 'Cancelled':  return 'badge bg-danger';
    }
  }

  // ---- Mock payload (replace with service) ----
  private mockPayload(): UserDashboardPayload {
    return {
      stats: {
        walletBalance: 5200,
        loyaltyPoints: 1240,
        ordersThisMonth: 6,
        pendingDeliveries: 2,
        savedItems: 9,
        coupons: 3,
        lastLoginAt: new Date().toLocaleString()
      },
      ordersChartData: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets: [
          {
            label: 'Orders',
            data: [1, 2, 1, 3, 2, 4, 3],
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13,110,253,.1)',
            fill: true,
            tension: .4
          }
        ]
      },
      spendChartData: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [
          {
            label: 'Spend (৳)',
            data: [3200, 2800, 4100, 3900, 4200, 4500],
            backgroundColor: [
              'rgba(13,110,253,.85)',
              'rgba(25,135,84,.85)',
              'rgba(255,193,7,.85)',
              'rgba(220,53,69,.85)',
              'rgba(111,66,193,.85)',
              'rgba(32,201,151,.85)'
            ],
            borderColor: ['#0d6efd','#198754','#ffc107','#dc3545','#6f42c1','#20c997'],
            borderWidth: 1
          }
        ]
      },
      recentOrders: [
        { id: 'ORD-1042', date: '2025-10-29', total: 1560, status: 'Delivered' },
        { id: 'ORD-1043', date: '2025-10-29', total: 820,  status: 'Processing' },
        { id: 'ORD-1044', date: '2025-10-28', total: 2310, status: 'Shipped' },
        { id: 'ORD-1045', date: '2025-10-27', total: 450,  status: 'Cancelled' }
      ],
      tickets: [
        { id: 'T-301', subject: 'Order delay', status: 'Pending',  createdAt: '2025-10-28' },
        { id: 'T-298', subject: 'Refund request', status: 'Open',   createdAt: '2025-10-26' },
        { id: 'T-295', subject: 'Address change', status: 'Resolved', createdAt: '2025-10-24' }
      ],
      recommendations: [
        { id: 1, name: 'Milk Vita Butter 100gm', price: 150, badge: 'Hot' },
        { id: 2, name: 'Farm Fresh Milk Powder 1L', price: 910, badge: 'Sale' },
        { id: 3, name: 'ACI Pure Chinigura Rice 1kg', price: 310, badge: 'New' },
        { id: 4, name: 'Mojo 1L', price: 60 }
      ]
    };
  }
}
