# CIVIC Issue Reporting & Management Workflow

## 📋 Overview

This document explains the complete end-to-end workflow for issue reporting and management in the CIVIC platform, from citizen submission to government resolution.

## 🏗️ System Architecture

### Dual-Service Backend Architecture
- **Government Backend** (Port 8000): Administrative functions and government user management
- **User Backend** (Port 8001): Citizen services, ML capabilities, and issue reporting
- **Frontend** (Port 3000): React-based user interface for both citizens and government users

### Technology Stack
- **Frontend**: React 18 + TailwindCSS + OpenStreetMap/Leaflet
- **Backend**: Django + Django REST Framework
- **AI/ML**: OpenAI GPT-4 + Custom ML Models
- **Database**: Django ORM (SQLite/PostgreSQL)
- **Authentication**: Firebase Auth + Custom Government Auth

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

## 🛠️ Technical Implementation Details

### Frontend Components

**Key Files**:
- `src/pages/ReportIssue.js` - Issue submission form
- `src/pages/AdminDashboard.js` - Government admin interface
- `src/pages/StaffDashboard.js` - Staff member interface
- `src/components/OpenStreetMapComponent.js` - Location selection
- `src/services/locationService.js` - Enhanced location detection

### Backend Endpoints

**User Endpoints** (Port 8001):
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
```

### AI/ML Integration

**ML Service**: Analyzes uploaded images to:
- Predict appropriate department
- Generate issue description
- Assess severity level

**OpenAI Integration**: Refines ML output to:
- Create structured descriptions
- Standardize priority levels
- Ensure professional language

## 🚀 Deployment & Testing

### Starting the System

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
- **User API**: http://localhost:8001/api
- **Government API**: http://localhost:8000/api

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
```

## 🔐 Security & Permissions

### Authentication Levels
- **Citizens**: Session-based auth with localStorage
- **Government**: Token-based auth with role validation
- **API**: Permission decorators and role checking

### Data Protection
- Input validation on all endpoints
- SQL injection prevention via Django ORM
- File upload restrictions and validation
- Location bounds checking (India-wide)

## 📈 Monitoring & Analytics

### Dashboard Metrics
- Total issues by department
- Resolution time analytics
- Status distribution
- Priority breakdown
- Geographic heat maps

### Performance Tracking
- API response times
- AI service availability
- Database query optimization
- Frontend loading metrics

## 🚧 Future Enhancements

1. **Real-time Notifications** - WebSocket integration
2. **Mobile App** - React Native implementation
3. **Advanced Analytics** - ML-powered insights
4. **Citizen Feedback** - Rating and review system
5. **Integration APIs** - Third-party service connections

---

This workflow ensures a seamless, transparent, and efficient issue resolution process from citizen reporting to government action, leveraging modern web technologies and AI capabilities.