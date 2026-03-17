# 🏛️ Government Admin Dashboard

A comprehensive admin dashboard for managing civic issues reported by citizens in Jharkhand. Built with React.js, Django REST Framework, and advanced role-based access control.

## 🚀 Features

### 🔐 Role-Based Authentication
- **Super Admin**: Full control, cross-department access, manages all admins
- **Admin**: Manages complaints & assigns tasks to staff within their department
- **Staff**: Executes assigned tasks, uploads proof & updates status

### 📊 Dashboard Analytics
- Real-time statistics and metrics
- Department-wise issue breakdown
- Performance reports and analytics
- User activity logs and audit trails

### 🎯 Issue Management
- Auto-assignment to correct departments based on category
- Priority-based workflow management
- Status tracking (Pending → Assigned → In Progress → Resolved)
- Comment system with internal/external notes
- Media file management (images/videos)

### 🗺️ Advanced Features
- OpenStreetMap integration with Leaflet
- Location-based issue filtering
- Advanced search and filtering capabilities
- Bulk operations and batch processing
- Export functionality for reports

## 🏢 Departments Supported

1. **GHMC (Municipal)** - Garbage, street maintenance
2. **Traffic Police** - Traffic violations, road safety
3. **Electricity** - Power outages, streetlights
4. **Water Board** - Water supply, quality issues
5. **Roads & Transport (RTO)** - Road conditions, transport
6. **Pollution Control** - Environmental issues
7. **Fire Dept** - Emergency services
8. **Health Dept** - Public health issues
9. **Education** - School infrastructure
10. **Forest** - Illegal mining, deforestation
11. **Disaster Mgmt** - Emergency response
12. **Women & Child Welfare** - Social services
13. **Revenue** - Land records, taxation
14. **Panchayat Raj** - Rural development
15. **Housing Board** - Housing projects

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern UI framework
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API framework
- **SQLite** - Database (easily upgradeable to PostgreSQL)
- **Token Authentication** - Secure API access
- **CORS** - Cross-origin resource sharing

### Maps & Location
- **OpenStreetMap** - Free map tiles
- **Leaflet** - Interactive maps
- **Geolocation API** - Location services

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Backend Setup

```bash
cd CIVIC/backend

# Install dependencies
pip install -r requirements.txt

# Run setup script
python setup_admin.py

# Start Django server
python manage.py runserver
```

### 2. Frontend Setup

```bash
cd CIVIC

# Install dependencies
npm install

# Start React development server
npm start
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Admin Login**: http://localhost:3000/government-login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/

## 🔑 Default Login Credentials

### Super Admin
- **Username**: `superadmin`
- **Password**: `admin123`
- **Access**: Full system control

### Department Admins
- **Username**: `[dept]_admin` (e.g., `ghmc_admin`)
- **Password**: `admin123`
- **Access**: Department-specific management

### Staff Users
- **Username**: `[dept]_staff1` (e.g., `ghmc_staff1`)
- **Password**: `staff123`
- **Access**: Task execution and status updates

## 📱 User Interface

### Login Flow
1. **Department Selection** - Choose your department
2. **Role Selection** - Select your role (Super Admin/Admin/Staff)
3. **Authentication** - Enter username and password

### Dashboard Features
- **Statistics Cards** - Key metrics at a glance
- **Department Breakdown** - Visual representation of issues by department
- **Recent Issues** - Latest reported issues
- **Performance Metrics** - Resolution times and efficiency

### Issue Management
- **Advanced Filtering** - Filter by status, priority, category, department
- **Search Functionality** - Full-text search across issues
- **Bulk Operations** - Select multiple issues for batch processing
- **Status Updates** - Easy status change with activity logging
- **Assignment System** - Assign issues to specific staff members

## 🔧 API Endpoints

### Authentication
- `POST /api/admin/login` - Government user login
- `POST /api/admin/logout` - User logout

### Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/departments` - List all departments

### Issue Management
- `GET /api/admin/issues` - Get issues with filtering
- `PATCH /api/admin/issues/{id}/status` - Update issue status
- `POST /api/admin/issues/{id}/comments` - Add comments
- `GET /api/admin/issues/{id}/activities` - Get issue activities

### User Management
- `GET /api/admin/users` - Get department users

## 🗄️ Database Schema

### Core Models
- **Department** - Government departments
- **GovernmentUser** - Admin users with roles
- **IssueReport** - Citizen-reported issues
- **IssueComment** - Comments and notes
- **IssueActivity** - Activity logs and audit trail
- **DepartmentStats** - Performance metrics

### Key Features
- **Auto-assignment** - Issues automatically assigned to correct departments
- **Activity Logging** - Complete audit trail of all actions
- **Media Support** - Image and video attachments
- **Location Data** - GPS coordinates and address information

## 🔒 Security Features

- **Role-Based Access Control (RBAC)** - Granular permissions
- **Token Authentication** - Secure API access
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side validation
- **Audit Logging** - Complete activity tracking
- **IP Logging** - Login attempt monitoring

## 📊 Analytics & Reporting

### Dashboard Metrics
- Total issues reported
- Pending vs resolved issues
- Department-wise breakdown
- Priority distribution
- Average resolution time
- User activity statistics

### Performance Tracking
- Issue resolution rates
- Department efficiency metrics
- Staff performance indicators
- Response time analytics
- Citizen satisfaction tracking

## 🚀 Deployment

### Production Setup
1. **Database**: Upgrade to PostgreSQL for production
2. **Static Files**: Configure static file serving
3. **Environment Variables**: Set production environment variables
4. **SSL/HTTPS**: Enable secure connections
5. **Load Balancing**: Configure for high availability

### Environment Variables
```env
# Django Settings
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com

# Database
DATABASE_URL=postgresql://user:pass@localhost/dbname

# Frontend
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Real-time Notifications** - WebSocket integration
- **Mobile App** - React Native mobile application
- **AI Integration** - Automated issue categorization
- **Advanced Analytics** - Machine learning insights
- **Multi-language Support** - Internationalization
- **API Documentation** - Swagger/OpenAPI documentation
- **Automated Testing** - Comprehensive test suite
- **CI/CD Pipeline** - Automated deployment

---

**Built with ❤️ for Jharkhand Government**

*Empowering citizens and government officials to work together for a better Jharkhand.*

