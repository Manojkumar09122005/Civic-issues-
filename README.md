# 🏛️ CIVIC - Jharkhand Issue Reporter & Government Dashboard

A comprehensive Crowd-Sourced Issue Reporting System for Jharkhand with an integrated Government Admin Dashboard. Built with ReactJS, Django REST Framework, Firebase, and advanced role-based access control.

## 📋 System Overview

CIVIC is a full-stack solution that connects citizens with government departments for efficient issue reporting and resolution. The platform consists of:

1. **Citizen App** - Mobile-first web app for issue reporting
2. **Government Dashboard** - Comprehensive admin system for issue management
3. **Multi-Service Backend** - Django and FastAPI services with ML capabilities
4. **AI/ML Integration** - OpenAI GPT-4 + Custom ML Models for automation

## 🏗️ System Architecture

### Multi-Service Backend Architecture
The system uses a sophisticated multi-service architecture:

- **Government Backend** (Port 8000): Administrative functions and government user management
- **User Backend** (Port 8002): Citizen services, ML capabilities, and issue reporting  
- **ML Service** (Port 8001): FastAPI-based AI/ML capabilities
- **Frontend** (Port 3000): React-based user interface for both citizens and government users

### Technology Stack Integration
- **Frontend**: React 18 + TailwindCSS + OpenStreetMap/Leaflet
- **Backend**: Django + Django REST Framework + FastAPI
- **AI/ML**: OpenAI GPT-4 + Custom ML Models + Department Prediction
- **Database**: Django ORM (SQLite/PostgreSQL)
- **Authentication**: Firebase Auth + Custom Government Auth + Token-based API access

## 🔄 Complete Issue Reporting Workflow

### Phase 1: Citizen Issue Submission

#### 1.1 User Authentication
```
User opens CIVIC app → Login page (session-based auth)
↓
User enters phone number → OTP verification → Profile setup
↓
User data stored in localStorage and AuthContext
```

#### 1.2 Issue Reporting Process
```
Dashboard → Report Issue → Category Selection
↓
Location Selection (OpenStreetMap + GPS with India-wide support)
↓
Media Upload (Images/Videos with drag-and-drop)
↓
AI Analysis (Optional - if ML service is running)
↓
Description Entry (Manual or AI-assisted)
↓
Form Submission
```

#### 1.3 Frontend Submission Logic
**File**: `src/pages/ReportIssue.js`

```javascript
// Primary: AI-powered endpoint
POST /api/reports/ai
{
  user_id: string,
  phone: string,
  reporter_name: string,
  category: string,
  description: string,
  lat: number,
  lng: number,
  address: string,
  file: FormData, // First uploaded image
  context: string
}

// Fallback: Standard endpoint
POST /api/reports
{
  // Same data without AI analysis
}
```

### Phase 2: Backend Processing

#### 2.1 AI-Powered Analysis (Port 8001)
**Endpoint**: `/api/reports/ai`
**File**: `backend/civic_issues/views.py::report_with_ai`

```python
1. Receive issue data and image
2. Call ML service for image analysis
3. Use OpenAI GPT-4 for description refinement
4. Auto-assign department based on category
5. Set priority based on AI severity analysis
6. Save to database with media files
7. Return success with AI insights
```

#### 2.2 Database Storage
**Model**: `IssueReport` in `backend/civic_issues/models.py`

```python
- ID, timestamp, status (PENDING, ASSIGNED, IN_PROGRESS, RESOLVED, etc.)
- User info: user_id, phone, reporter_name
- Issue details: category, description, priority
- Location: lat, lng, address, ward, zone
- Assignment: department, assigned_to, assigned_at
- Media: media_files (JSON array of file paths)
- Tracking: created_at, updated_at, resolved_at
```

#### 2.3 Auto-Department Assignment
**Logic**: `models.py::get_department_for_category`

```python
category_mapping = {
    'garbage': 'GHMC',
    'road': 'Roads & Transport', 
    'water': 'Water Board',
    'streetlight': 'Electricity',
    'traffic': 'Traffic Police',
    'pollution': 'Pollution Control',
    'fire': 'Fire Dept',
    'health': 'Health Dept',
    # etc...
}
```

### Phase 3: Government Dashboard Access

#### 3.1 Government User Authentication
**Endpoint**: `/api/admin/login` (Port 8000)
**File**: `backend/civic_issues/admin_views.py`

```
Government login page → Username/Password → Department/Role validation
↓
Token generation → User data storage → Dashboard redirect
```

#### 3.2 Role-Based Access Control

**Super Admin**:
- View all issues across departments
- Assign issues to any department/user
- Manage users and departments
- Access all analytics

**Admin** (Department-level):
- View issues in their department only
- Assign issues to staff in their department
- Department-level analytics

**Staff**:
- View issues assigned to them
- Update status of assigned issues
- Add comments and updates

#### 3.3 Dashboard Data Fetching
**Files**: `src/pages/AdminDashboard.js`, `src/pages/StaffDashboard.js`

```javascript
// Dashboard statistics
GET /api/admin/dashboard/stats
{
  total_issues: number,
  pending_issues: number,
  in_progress_issues: number,
  resolved_issues: number,
  department_breakdown: object,
  recent_issues: array
}

// Issues list with filters
GET /api/admin/issues?status=PENDING&department=GHMC&page=1
{
  data: [...issues],
  pagination: { page, total_count, total_pages }
}
```

### Phase 4: Issue Management

#### 4.1 Issue Assignment
```
Admin reviews new issues → Assigns to staff member
↓
Status changes: PENDING → ASSIGNED
↓
Activity log created → Staff receives notification
```

#### 4.2 Status Updates
**Available Statuses**:
- `PENDING`: Newly submitted, awaiting assignment
- `ASSIGNED`: Assigned to a staff member
- `IN_PROGRESS`: Staff is working on the issue
- `UNDER_REVIEW`: Awaiting review/approval
- `RESOLVED`: Issue has been fixed
- `REJECTED`: Issue was invalid/duplicate
- `CLOSED`: Final closure

#### 4.3 Comments & Activity Tracking
```
Staff adds updates → Comments saved → Activity log updated
↓
Citizens can view progress → Transparency maintained
```

## 🚀 Features

### 👥 For Citizens
- **Firebase Phone OTP Authentication** - Secure user authentication
- **Google Maps Integration** - Location selection restricted to Jharkhand region
- **Issue Categories** - Garbage, Road, Water, Streetlight, Illegal Mining, Water Scarcity
- **Media Upload** - Support for images and videos
- **Real-time Status Tracking** - Pending, In Progress, Resolved
- **Responsive Design** - Mobile-first approach with TailwindCSS
- **Modern UI/UX** - Clean, interactive, and user-friendly interface

### 🏛️ For Government Officials

#### 🔐 Role-Based Authentication
- **Super Admin**: Full control, cross-department access, manages all admins
- **Admin**: Manages complaints & assigns tasks to staff within their department
- **Staff**: Executes assigned tasks, uploads proof & updates status

#### 📊 Dashboard Analytics
- Real-time statistics and metrics with interactive charts
- Department-wise issue breakdown
- Monthly, Quarterly, and Yearly analysis
- Performance reports and analytics
- User activity logs and audit trails

#### 🎯 Issue Management
- Auto-assignment to correct departments based on category
- Priority-based workflow management
- Status tracking (Pending → Assigned → In Progress → Resolved)
- Comment system with internal/external notes
- Media file management (images/videos)
- Staff assignment and workload distribution

#### 🗺️ Advanced Features
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

## 🛠 Tech Stack

### Frontend
- **React.js 18** - Modern UI framework with functional components & hooks
- **TailwindCSS 3** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Notifications
- **Recharts** - Interactive charts and analytics
- **React Dropzone** - File upload handling

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API framework
- **FastAPI** - ML service API
- **SQLite** - Database (easily upgradeable to PostgreSQL)
- **Token Authentication** - Secure API access
- **CORS** - Cross-origin resource sharing

### Authentication & Services
- **Firebase Phone OTP** - Citizen authentication
- **Google Maps API** - Location services
- **OpenStreetMap** - Free map tiles for admin dashboard
- **Leaflet** - Interactive maps
- **ML Services** - Department prediction, description generation

### Architecture
- **Multi-Service Backend**: 3 separate services
  - **Port 8000**: Government Backend (Admin Dashboard)
  - **Port 8001**: ML Service (FastAPI)
  - **Port 8002**: User Backend (Citizen Services)
- **Frontend**: React app on Port 3000

## 🔧 Backend Services Configuration

### Service Architecture

#### 1. Government Backend (Port 8000)
- **Purpose**: Government administration and management
- **URL**: http://localhost:8000
- **API**: http://localhost:8000/api/
- **Admin**: http://localhost:8000/admin/
- **Features**:
  - Government user authentication
  - Issue management and resolution
  - Department administration
  - Analytics and reporting

#### 2. User Backend (Port 8002)
- **Purpose**: User-facing services and ML capabilities
- **URL**: http://localhost:8002
- **API**: http://localhost:8002/api/
- **Admin**: http://localhost:8002/admin/
- **Features**:
  - Citizen issue submission
  - ML-powered department prediction
  - AI description generation
  - Parking prediction services

#### 3. ML Service (Port 8001)
- **Purpose**: AI/ML capabilities and automation
- **URL**: http://localhost:8001
- **API**: http://localhost:8001/
- **Features**:
  - Department prediction from descriptions
  - AI-powered description generation
  - Image analysis and categorization
  - Parking space prediction

### Starting Backend Services

#### Option 1: Start All Services (Recommended)
```bash
cd backend
python start_all_services.py
```
This starts all three services: Government Backend, User Backend, and ML Service.

#### Option 2: Start Individual Services

**Government Backend Only:**
```bash
python start_government_backend.py
```

**User Backend Only:**
```bash
python start_user_backend.py
```

**ML Service Only:**
```bash
python ml_service.py
```

#### Option 3: Manual Start with Environment Variables

**Government Backend:**
```bash
set BACKEND_SERVICE_TYPE=government
python manage.py runserver 0.0.0.0:8000
```

**User Backend:**
```bash
set BACKEND_SERVICE_TYPE=user
python manage.py runserver 0.0.0.0:8002
```

**ML Service (separate terminal):**
```bash
python ml_service.py
```

## 📱 Application Components

### 👥 Citizen-Facing Features

#### 1. Login Page
- Phone number input with Firebase OTP verification
- Secure authentication flow
- Modern UI with reCAPTCHA integration

#### 2. Dashboard
- Welcome message with user information
- Issue category cards with icons
- Quick action buttons
- Statistics overview

#### 3. Report Issue
- Category selection
- Google Maps integration (Jharkhand restricted)
- Auto-location detection
- Media upload (images/videos)
- Description input
- Form validation

#### 4. My Reports
- List of all user reports
- Status indicators with color coding
- Media thumbnails
- Detailed view modal
- Status update functionality

#### 5. Profile
- User information display
- Editable profile fields
- Activity statistics
- Logout functionality

#### 6. Notifications
- Notification list with types
- Settings management
- Firebase Cloud Messaging placeholder

### 🏛️ Government Dashboard Features

#### Login Flow
1. **Department Selection** - Choose your department
2. **Role Selection** - Select your role (Super Admin/Admin/Staff)
3. **Authentication** - Enter username and password

#### Dashboard Features
- **Statistics Cards** - Key metrics at a glance
- **Department Breakdown** - Visual representation of issues by department
- **Recent Issues** - Latest reported issues
- **Performance Metrics** - Resolution times and efficiency
- **Analytics Charts** - Interactive charts with multiple time periods

#### Issue Management
- **Advanced Filtering** - Filter by status, priority, category, department
- **Search Functionality** - Full-text search across issues
- **Bulk Operations** - Select multiple issues for batch processing
- **Status Updates** - Easy status change with activity logging
- **Assignment System** - Assign issues to specific staff members
- **Staff Analytics** - Individual performance tracking

#### Analytics & Reporting
- **Multiple Chart Types** - Line, Pie, Bar (Cylindrical)
- **Time Periods** - Monthly, Quarterly, Yearly analysis
- **Role-Based Data** - Admin sees all, Staff sees only assigned
- **Export Capabilities** - Data export for further analysis

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Firebase project
- Google Maps API key

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd CIVIC
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run setup script for admin data
python setup_admin.py

# Option 1: Start all backend services (Recommended)
python start_all_services.py

# Option 2: Start individual services
# python start_government_backend.py   # Government Backend (8000)
# python start_user_backend.py         # User Backend (8002)
# python ml_service.py                 # ML Service (8001)

# Option 3: Manual setup
# python manage.py makemigrations
# python manage.py migrate
# python manage.py runserver 8000      # Government Backend
```

#### 3. Frontend Setup

```bash
# From CIVIC root directory
npm install

# Start React development server
npm start
```

#### 4. Access the Application

- **Citizen App**: http://localhost:3000
- **Government Login**: http://localhost:3000/gov
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Staff Dashboard**: http://localhost:3000/staff/dashboard
- **Government Backend API**: http://localhost:8000/api/
- **User Backend API**: http://localhost:8002/api/
- **ML Service API**: http://localhost:8001/
- **Django Admin**: http://localhost:8000/admin/

#### 5. Default Login Credentials

##### Super Admin
- **Username**: `superadmin`
- **Password**: `admin123`
- **Access**: Full system control

##### Department Admins
- **Username**: `[dept]_admin` (e.g., `ghmc_admin`)
- **Password**: `admin123`
- **Access**: Department-specific management

##### Staff Users
- **Username**: `[dept]_staff1` (e.g., `ghmc_staff1`)
- **Password**: `staff123`
- **Access**: Task execution and status updates

### Configuration
   
#### Environment Configuration
   
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   
   # Google Maps
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Backend APIs
   REACT_APP_API_URL=http://localhost:8002/api
   REACT_APP_ADMIN_API_URL=http://localhost:8000/api
   REACT_APP_ML_API_URL=http://localhost:8001
   
   # Django Settings (for production)
   SECRET_KEY=your-secret-key
   DEBUG=False
   ALLOWED_HOSTS=your-domain.com
   DATABASE_URL=postgresql://user:pass@localhost/dbname
   ```

4. **Firebase Setup**
   
   - Create a Firebase project
   - Enable Phone Authentication
   - Add your app to Firebase
   - Update the Firebase config in `src/config/firebase.js`

5. **Google Maps Setup**
   
   - Get a Google Maps API key
   - Enable Maps JavaScript API
   - Enable Places API
   - Add billing information

6. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 🔧 API Endpoints

### Citizen Services (Port 8002)
- `POST /api/reports` - Submit new issue report
- `POST /api/reports/ai` - AI-powered issue submission
- `GET /api/reports/user/{user_id}` - Get user's reports
- `GET /api/reports/all` - Get all reports
- `PUT /api/reports/{report_id}` - Update report status
- `GET /api/reports/{id}` - Get specific report
- `PATCH /api/reports/{id}/status` - Update report status

### Government Services (Port 8000)

#### Authentication
- `POST /api/admin/login` - Government user login
- `POST /api/admin/logout` - User logout

#### Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/departments` - List all departments
- `GET /api/admin/analytics` - Analytics data with time periods

#### Issue Management
- `GET /api/admin/issues` - Get issues with filtering
- `PATCH /api/admin/issues/{id}/status` - Update issue status
- `POST /api/admin/issues/{id}/comments` - Add comments
- `GET /api/admin/issues/{id}/activities` - Get issue activities
- `POST /api/admin/issues/{id}/assign` - Assign issue to staff

#### Staff Services
- `GET /api/admin/staff/issues` - Get staff assigned issues
- `PATCH /api/admin/staff/issues/{id}/status` - Staff update issue status

#### User Management
- `GET /api/admin/users` - Get department users

### ML Services (Port 8001)
- `GET /health` - Health check
- `POST /predict_department` - Predict department from description
- `POST /generate_description` - Generate description from category
- `POST /predict_parking` - Parking prediction service

## 🗺️ Technical Implementation Details

### Frontend Components

**Key Files**:
- `src/pages/ReportIssue.js` - Issue submission form with AI integration
- `src/pages/AdminDashboard.js` - Government admin interface
- `src/pages/StaffDashboard.js` - Staff member interface
- `src/components/OpenStreetMapComponent.js` - Location selection
- `src/services/locationService.js` - Enhanced location detection
- `src/config/api.js` - User services API configuration
- `src/config/adminApi.js` - Government services API configuration

### Backend Implementation

**User Endpoints** (Port 8002):
```
POST /api/reports/ai - AI-powered issue submission
POST /api/reports - Standard issue submission
GET /api/reports/user/{user_id} - User's issues
GET /api/reports/all - All issues (public)
```

**Admin Endpoints** (Port 8000):
```
POST /api/admin/login - Government login
GET /api/admin/dashboard/stats - Dashboard statistics
GET /api/admin/issues - Issues list with filters
PATCH /api/admin/issues/{id}/status - Update issue status
POST /api/admin/issues/{id}/comments - Add comments
GET /api/admin/analytics - Analytics with time periods
```

### AI/ML Integration

**ML Service Features**:
- **Image Analysis**: Analyzes uploaded images to predict appropriate department
- **Description Generation**: Creates structured descriptions from categories
- **Severity Assessment**: Determines issue priority levels
- **Department Prediction**: Auto-assigns issues to correct departments

**OpenAI Integration**: Refines ML output to:
- Create structured descriptions
- Standardize priority levels
- Ensure professional language
- Provide contextual insights

### Database Models and Schema

#### Core Models
- **Department** - Government departments with contact information
- **GovernmentUser** - Admin users with roles and permissions
- **IssueReport** - Citizen-reported issues with full lifecycle tracking
- **IssueComment** - Comments and notes from staff and admins
- **IssueActivity** - Complete audit trail of all actions
- **DepartmentStats** - Performance metrics and analytics

#### IssueReport Model Structure
```python
class IssueReport(models.Model):
    # Identity
    user_id = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    reporter_name = models.CharField(max_length=255)
    
    # Issue Details
    category = models.CharField(max_length=50)
    description = models.TextField()
    priority = models.CharField(max_length=20, default='MEDIUM')
    
    # Location
    lat = models.DecimalField(max_digits=10, decimal_places=8)
    lng = models.DecimalField(max_digits=11, decimal_places=8)
    address = models.TextField()
    ward = models.CharField(max_length=100, blank=True)
    zone = models.CharField(max_length=100, blank=True)
    
    # Status & Assignment
    status = models.CharField(max_length=20, default='PENDING')
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(GovernmentUser, on_delete=models.SET_NULL)
    
    # Media & Files
    media_files = models.JSONField(default=list)
    
    # Timestamps
    timestamp = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assigned_at = models.DateTimeField(null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
```

### Key Features
- **Auto-assignment** - Issues automatically assigned to correct departments
- **Activity Logging** - Complete audit trail of all actions
- **Media Support** - Image and video attachments with file validation
- **Location Data** - GPS coordinates and address information
- **Role-based Access** - Granular permissions and data filtering
- **Status Workflow** - Defined issue lifecycle with validation

## 🚀 Deployment & Testing

### Starting the Complete System

1. **Backend Services**:
```bash
cd backend
python start_all_services.py
```

2. **Frontend**:
```bash
cd CIVIC_2/CIVIC
npm start
```

3. **Testing End-to-End Flow**:
```bash
cd backend
python test_e2e_flow.py
```

### Access Points

- **Citizen Portal**: http://localhost:3000
- **Government Login**: http://localhost:3000/gov
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Staff Dashboard**: http://localhost:3000/staff/dashboard
- **User API**: http://localhost:8002/api
- **Government API**: http://localhost:8000/api
- **ML Service**: http://localhost:8001
- **Django Admin**: http://localhost:8000/admin/

### Environment Configuration

Set the `BACKEND_SERVICE_TYPE` environment variable for manual starts:
- `user` - For user backend services
- `government` - For government backend services

### Frontend Configuration
The frontend automatically detects the correct backend URLs:
- User services: `http://localhost:8002/api`
- Government services: `http://localhost:8000/api`
- ML services: `http://localhost:8001`

## 📊 Data Flow Summary

```
1. CITIZEN SUBMISSION
   User App → ReportIssue.js → POST /reports/ai → ML Analysis → Database

2. GOVERNMENT ACCESS  
   Gov Login → AdminDashboard.js → GET /admin/issues → Display Issues

3. ISSUE MANAGEMENT
   Staff Updates → PATCH /admin/issues/{id}/status → Activity Log → Database

4. REAL-TIME SYNC
   Database Changes → API Responses → Frontend Updates → User Notifications

5. ANALYTICS FLOW
   Data Aggregation → Chart Generation → Interactive Dashboards → Insights
```

## 🛠️ Troubleshooting

### Common Issues

#### Port Conflicts
If you encounter port conflicts:
1. Check if ports 8000, 8001, or 8002 are already in use
2. Kill existing processes: `netstat -ano | findstr :8000` (Windows)
3. Use different ports by modifying the startup scripts

#### Service Communication
- Frontend communicates with both backends based on the service type
- ML service is part of the user backend infrastructure
- Government backend handles administrative functions

#### Environment Variables
Make sure to set the correct environment variables:
```bash
# For government backend
set BACKEND_SERVICE_TYPE=government

# For user backend (default)
set BACKEND_SERVICE_TYPE=user
```

#### Database Issues
1. **Migration errors** - Delete `db.sqlite3` and run migrations again
2. **Data inconsistency** - Run `python setup_admin.py` to reset admin data
3. **Permission errors** - Check file permissions on database file

#### CORS Issues
- Check `CORS_ALLOWED_ORIGINS` in settings.py
- Ensure frontend URL is whitelisted
- Verify API endpoints are being called correctly

### Debug Mode
- Set `DEBUG = True` in settings.py for detailed error messages
- Check browser console for frontend errors
- Monitor backend logs for API request/response details

## 🗺️ Database Schema

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
- **Role-based Access** - Granular permissions and data filtering

## 🔒 Security Features & Monitoring

### Multi-layered Security
- **Multi-layered Authentication** - Firebase OTP for citizens, token auth for government
- **Role-Based Access Control (RBAC)** - Granular permissions with department isolation
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Server-side validation on all endpoints
- **SQL Injection Prevention** - Django ORM protection
- **File Upload Security** - Media file validation and restrictions
- **Audit Logging** - Complete activity tracking
- **IP Logging** - Login attempt monitoring
- **Location Validation** - Jharkhand region restriction
- **reCAPTCHA Integration** - Bot protection

### Authentication Levels
- **Citizens**: Session-based auth with localStorage
- **Government**: Token-based auth with role validation
- **API**: Permission decorators and role checking

### Data Protection
- Input validation on all endpoints
- SQL injection prevention via Django ORM
- File upload restrictions and validation
- Location bounds checking (India-wide)
- Secure media file handling

### Monitoring & Analytics

#### Dashboard Metrics
- Total issues by department with trend analysis
- Resolution time analytics with performance tracking
- Status distribution with real-time updates
- Priority breakdown analysis
- Geographic heat maps for issue clustering
- User activity statistics

#### Performance Tracking
- API response times monitoring
- AI service availability metrics
- Database query optimization
- Frontend loading performance
- Issue resolution rates
- Department efficiency metrics
- Staff performance indicators
- Response time analytics
- Citizen satisfaction tracking

## 📊 Analytics & Reporting

### Dashboard Metrics
- Total issues reported
- Resolution rates and performance tracking
- Department-wise breakdown with interactive charts
- Priority distribution analysis
- Timeline analysis (Monthly, Quarterly, Yearly)
- Staff performance indicators

### Chart Types
- **Line Charts** - Trend analysis over time
- **Pie Charts** - Status and category distribution
- **Bar Charts** - Priority and department breakdowns
- **Cylindrical Charts** - 3D visualization effects
- **Stacked Charts** - Multi-dimensional data analysis

### Analytics Features
- **Role-based Data** - Admin sees all data, Staff sees only assigned work
- **Time Period Filtering** - Monthly, Quarterly, Yearly views
- **Interactive Charts** - Built with Recharts library
- **Export Capabilities** - Data export functionality
- **Real-time Updates** - Live data refresh

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        600: '#0284c7',
      },
      jharkhand: {
        green: '#059669',
        orange: '#ea580c',
        red: '#dc2626',
      }
    }
  }
}
```

### Issue Categories
Modify categories in `src/pages/Dashboard.js` and `src/pages/ReportIssue.js`:

```javascript
const issueCategories = [
  {
    id: 'garbage',
    name: 'Garbage',
    icon: Trash2,
    color: 'bg-red-500',
    description: 'Report garbage and waste issues'
  },
  // ... add more categories
];
```

### Firebase Configuration
Update `src/config/firebase.js` with your Firebase project details:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### API Configuration
Update API configurations in `src/config/`:

```javascript
// src/config/api.js (User services)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8002/api',
});

// src/config/adminApi.js (Government services)
const adminApi = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:8000/api',
});
```

## 📱 Mobile Responsiveness

The app is built with a mobile-first approach:
- Responsive grid layouts
- Touch-friendly buttons and inputs
- Bottom navigation for mobile devices
- Optimized media handling
- Adaptive charts and analytics
- Government dashboard optimized for tablets

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Production Deployment

#### Production Setup
1. **Database**: Upgrade to PostgreSQL for production
2. **Static Files**: Configure static file serving (nginx/Apache)
3. **Environment Variables**: Set production environment variables
4. **SSL/HTTPS**: Enable secure connections
5. **Load Balancing**: Configure for high availability
6. **Monitoring**: Set up application monitoring and logging
7. **Backup Strategy**: Implement database backup procedures
8. **Security Hardening**: Additional security measures for production

#### Environment Variables for Production
```env
# Django Settings
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com

# Database
DATABASE_URL=postgresql://user:pass@localhost/dbname

# Frontend URLs
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_ADMIN_API_URL=https://your-admin-api-domain.com/api
REACT_APP_ML_API_URL=https://your-ml-api-domain.com

# Service Configuration
BACKEND_SERVICE_TYPE=user
# or BACKEND_SERVICE_TYPE=government
```

#### Production Considerations
- Use proper web servers (nginx, Apache)
- Configure environment variables properly
- Use separate databases for each service if needed
- Set up proper logging and monitoring
- Configure SSL/TLS certificates
- Implement rate limiting and security headers
- Set up automated backups
- Configure CI/CD pipelines

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

## 🚀 Future Enhancements & Roadmap

### Phase 1: Enhanced Citizen Features
- Firebase Cloud Messaging for real-time notifications
- Offline support with service workers
- Advanced analytics and reporting for citizens
- Multi-language support (Hindi, Bengali, etc.)
- Community features and social sharing
- Citizen feedback and rating system
- Issue tracking with QR codes

### Phase 2: Advanced Government Features
- Real-time Notifications - WebSocket integration
- Mobile App - React Native mobile application
- Advanced Analytics - Machine learning insights
- Multi-language Support - Complete internationalization
- API Documentation - Swagger/OpenAPI documentation
- Automated Testing - Comprehensive test suite
- CI/CD Pipeline - Automated deployment
- Integration with existing government systems

### Phase 3: System-Wide Enhancements
- **Microservices Architecture** - Further service decomposition
- **Advanced ML Models** - Enhanced prediction accuracy
- **Blockchain Integration** - Transparency and audit trails
- **IoT Device Integration** - Automatic issue detection
- **GIS Analysis** - Advanced geographic information systems
- **Performance Optimization** - Caching and CDN integration
- **Big Data Analytics** - Large-scale data processing
- **Voice Interface** - Voice-powered issue reporting

### Phase 4: Innovation & Integration
- **AI Chatbot** - 24/7 citizen support
- **Predictive Analytics** - Issue prevention
- **Smart City Integration** - IoT sensor networks
- **Cross-Platform Mobile** - Native mobile applications
- **AR/VR Support** - Immersive issue visualization
- **API Ecosystem** - Third-party integrations
- **Machine Learning** - Automated categorization and routing

## 🔍 Usage Examples & Best Practices

### Creating Issue Reports
```javascript
// Standard issue submission
const response = await api.post('/reports', {
  user_id: 'user123',
  phone: '+911234567890',
  category: 'garbage',
  description: 'Garbage pile near main road',
  lat: 23.6102,
  lng: 85.2799,
  media_files: ['url1', 'url2']
});

// AI-powered submission with image analysis
const formData = new FormData();
formData.append('user_id', 'user123');
formData.append('category', 'road');
formData.append('file', imageFile);
formData.append('context', 'Pothole on main street');

const aiResponse = await api.post('/reports/ai', formData);
```

### Government Dashboard Operations
```javascript
// Get filtered issues
const issues = await adminApi.get('/admin/issues?status=PENDING&department=GHMC');

// Assign issue to staff
const assignment = await adminApi.post(`/admin/issues/${issueId}/assign`, {
  assigned_to: staffId
});

// Update issue status
const statusUpdate = await adminApi.patch(`/admin/issues/${issueId}/status`, {
  status: 'IN_PROGRESS',
  comment: 'Work started'
});

// Get analytics data
const analytics = await adminApi.get('/admin/analytics?period=monthly&staff_id=15');
```

### Best Practices

#### For Citizens:
1. **Provide Clear Descriptions** - Include specific location details
2. **Upload Quality Images** - Clear photos help staff understand issues
3. **Choose Correct Category** - Proper categorization speeds up resolution
4. **Monitor Progress** - Check status updates regularly

#### For Government Users:
1. **Regular Status Updates** - Keep citizens informed
2. **Proper Assignment** - Match issues to appropriate staff skills
3. **Documentation** - Add detailed comments for transparency
4. **Analytics Review** - Use data to improve department efficiency

#### For Developers:
1. **Error Handling** - Implement comprehensive error handling
2. **Logging** - Maintain detailed logs for debugging
3. **Performance** - Monitor API response times
4. **Security** - Regular security updates and patches

---

**Built with ❤️ for Jharkhand Government**

*Empowering citizens and government officials to work together for a better Jharkhand.*

## 🎆 Complete System Features Summary

✅ **Complete Multi-Service Architecture** - Government, User, and ML services
✅ **Citizen Issue Reporting** - Firebase Auth with AI-powered submission
✅ **Government Dashboard** - Role-based access with comprehensive management
✅ **Advanced Analytics** - Interactive charts with multiple time periods
✅ **Staff Assignment** - Workflow management with status tracking
✅ **ML-Powered Features** - Department prediction and description generation
✅ **Mobile-First Design** - Responsive UI with touch-friendly interfaces
✅ **Real-Time Status Tracking** - Complete issue lifecycle management
✅ **Comprehensive Security** - Multi-layered authentication and authorization
✅ **Multi-Department Support** - 15+ government departments integrated
✅ **Production-Ready Architecture** - Scalable and maintainable codebase
✅ **AI Integration** - OpenAI GPT-4 and custom ML models
✅ **Interactive Maps** - OpenStreetMap integration with location services
✅ **Media Management** - Image and video upload with validation
✅ **Activity Logging** - Complete audit trail for transparency
✅ **Performance Monitoring** - Analytics and reporting for optimization

## 📚 Documentation Navigation

This comprehensive README consolidates information from:
- `README.md` - Main project documentation
- `ADMIN_DASHBOARD_README.md` - Government dashboard details
- `ISSUE_REPORTING_WORKFLOW.md` - Complete workflow documentation
- `backend/BACKEND_SERVICES_README.md` - Service architecture
- `backend/README.md` - Backend implementation details

For specific implementation details, refer to the relevant sections above or explore the codebase directly.

## 🌐 Project Links & Resources

- **Source Code**: [Available in project directory]
- **Documentation**: This comprehensive README
- **API Documentation**: Available through Django REST Framework browsable API
- **Issue Tracker**: Use the application itself for reporting issues!
- **Government Portal**: http://localhost:3000/gov
- **Citizen Portal**: http://localhost:3000

---

**CIVIC Platform - Connecting Citizens with Government for Better Governance**

---

# 🅿️ CIVIC Portal - Comprehensive Parking Service Implementation

## Overview

This document outlines the complete implementation of the parking service features for the CIVIC Portal. The system provides a comprehensive parking management solution with real-time availability, AI predictions, booking management, and payment integration.

## 🚀 Features Implemented

### User-Facing Features

#### 1. **Find Nearby Parking**
- **Map-based display** of nearest available parking slots using OpenStreetMap
- **Advanced filters**: Vehicle type (2W/4W/EV), facility type (Open/Covered/Underground), price range, free parking
- **Real-time availability** updates every 30 seconds
- **AI-powered predictions** for parking demand using ML models

#### 2. **Book Parking Slot**
- **Smart booking system** with date/time selection
- **Dynamic cost estimation** based on duration and vehicle type
- **QR code generation** for booking confirmation
- **OTP verification** system for security
- **Multiple payment options**: UPI, Cards, Wallets, Cash

#### 3. **Parking Slot Availability**
- **Real-time status** showing free/occupied slots
- **Predictive analytics** for future availability
- **Nearby alerts** when slots become available
- **Occupancy rate visualization** with color coding

#### 4. **My Parking History**
- **Comprehensive booking history** with status tracking
- **Categorized bookings**: Upcoming, Completed, Cancelled
- **Cost tracking** and spending analytics
- **Download invoice/receipt** functionality (PDF generation ready)

#### 5. **Notifications System**
- **Booking reminders** before scheduled time
- **Availability alerts** for nearby free slots
- **Overstay warnings** with grace period
- **Payment confirmations** and status updates

#### 6. **Payment Integration**
- **Multi-payment support**: UPI, Credit/Debit Cards, Digital Wallets
- **Secure transaction handling** with confirmation
- **Invoice generation** with transaction details
- **Payment history** tracking

#### 7. **Rating & Feedback System**
- **Multi-dimensional ratings**: Overall, Cleanliness, Safety, Accessibility
- **Comment system** for detailed feedback
- **Admin visibility controls** for feedback management
- **Rating aggregation** for zone quality assessment

#### 8. **Multi-Language Support**
- **Language context integration** ready for Telugu, Hindi, English
- **Localized content** for all parking features
- **Cultural adaptation** for Indian parking scenarios

### 🏗️ Technical Architecture

#### Backend Implementation

##### Database Models
1. **ParkingZone**: Core parking location data
2. **ParkingBooking**: Booking management with status tracking
3. **ParkingSubscription**: Subscription plans (Daily/Monthly/Yearly)
4. **ParkingFeedback**: User rating and feedback system
5. **ParkingNotification**: Real-time notification management
6. **ParkingAnalytics**: Revenue and usage analytics

##### API Endpoints
```
/api/parking/zones/                    # Parking zones CRUD
/api/parking/zones/availability/       # Real-time availability
/api/parking/zones/{id}/nearby-alerts/ # Nearby slot alerts
/api/parking/bookings/                 # Booking management
/api/parking/bookings/history/         # User booking history
/api/parking/subscriptions/            # Subscription management
/api/parking/feedback/                 # Rating and feedback
/api/parking/notifications/            # Notification system
/api/parking/analytics/                # Revenue analytics
```

### 🗄️ Database Schema

#### ParkingZone Model
```python
class ParkingZone(models.Model):
    name = models.CharField(max_length=200)
    zone_type = models.CharField(choices=ZoneType.choices)
    facility_type = models.CharField(choices=FacilityType.choices)
    address = models.TextField()
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    
    # Capacity for different vehicle types
    total_slots_2w = models.IntegerField(default=0)
    total_slots_4w = models.IntegerField(default=0)
    total_slots_ev = models.IntegerField(default=0)
    
    # Dynamic pricing
    price_per_hour_2w = models.DecimalField(max_digits=6, decimal_places=2)
    price_per_hour_4w = models.DecimalField(max_digits=6, decimal_places=2)
    price_per_hour_ev = models.DecimalField(max_digits=6, decimal_places=2)
    
    # Features and amenities
    is_free = models.BooleanField(default=False)
    has_security = models.BooleanField(default=True)
    has_cctv = models.BooleanField(default=True)
    has_lighting = models.BooleanField(default=True)
    is_24x7 = models.BooleanField(default=False)
```

### 🚀 Setup and Installation

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Setup parking zones data
python setup_parking_data.py

# Start services
python start_all_services.py
```

#### Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm start
```

### 📊 Sample Data

The system includes 8 pre-configured parking zones in Ranchi:
1. **Central Mall Parking** - Shopping complex with covered parking
2. **Ranchi Railway Station** - Open parking with high capacity
3. **RIMS Hospital** - Multi-level parking for medical facility
4. **Ranchi University** - Educational institution parking
5. **Commercial Complex** - Business district parking
6. **Residential Complex** - Community parking
7. **IT Park Office Complex** - Underground tech park parking
8. **Rock Garden** - Free public park parking

### 🔧 API Usage Examples

#### Get Available Parking Zones
```javascript
const zones = await parkingApiService.getParkingZones({
  zone_type: 'COMMERCIAL',
  facility_type: 'COVERED',
  is_free: false
});
```

#### Create a Booking
```javascript
const booking = await parkingApiService.createBooking({
  user_id: 'user123',
  zone: zoneId,
  vehicle_type: '4W',
  vehicle_number: 'HR01AB1234',
  start_time: '2024-01-20T10:00:00Z',
  end_time: '2024-01-20T14:00:00Z',
  estimated_cost: 80.00
});
```

### 🎯 Key Benefits

1. **User Experience**
   - Intuitive interface with real-time updates
   - Multi-language support for diverse users
   - Comprehensive booking management

2. **Business Value**
   - Revenue tracking and analytics
   - Efficient space utilization
   - Customer feedback integration

3. **Technical Excellence**
   - Scalable architecture
   - Real-time data processing
   - AI-powered predictions

4. **Government Integration**
   - Seamless integration with CIVIC portal
   - Department-wise management
   - Analytics and reporting

### 🔮 Future Enhancements

1. **Advanced AI Features**
   - Traffic pattern prediction
   - Dynamic pricing based on demand
   - Personalized recommendations

2. **Mobile Integration**
   - Native mobile app
   - Push notifications
   - Offline booking capabilities

3. **IoT Integration**
   - Smart sensors for real-time occupancy
   - Automated gate systems
   - Environmental monitoring

---

**Implementation Status**: ✅ **COMPLETE**

**Last Updated**: January 2024

**Developed for**: Jharkhand State Government CIVIC Portal

















