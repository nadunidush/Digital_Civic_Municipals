 
import AllComplaintAdmin from '../src/admin_pages/all_complaint_admin'
import DepartmentPageAdmin from '../src/admin_pages/department_page_admin'
import ComplaintStatistic from './admin_pages/complaint_statistic'
import ComplaintDetailsPage from './admin_pages/complaint_details_page';
import ComparisonPage from './admin_pages/comparison_page';
import './App.css';
import CompletionSendCitizen from './admin_pages/completion_send_citizen_page';
import ClientProfilePage from './admin_pages/client_profile_page';

import React from 'react';
import { Route, Routes } from "react-router-dom"
import AllComplaintDep from './department_pages/all_complaint_dep_page';
import ComplaintDetailsDevPage from './department_pages/complaint_details_dep_page';
import WorkProgress from './department_pages/work_progress_page';
import SendToCitizen from './department_pages/send_to_citizen_page';
import CitizenFeedback from './department_pages/citizen_feedback_page';
import DepartmentProfile from './department_pages/department_profile_page';
import AllComplaintLeader from './team_leaders_pages/all_complaint_leader_page';
import ComplaintDetailsLeader from './team_leaders_pages/complaint_details_leader_page';
import TeamLeaderProfile from './team_leaders_pages/team_leader_profile_page';
import CreateReport from './team_leaders_pages/create_report_page';
import AllReportsLeader from './team_leaders_pages/all_reports_leader_page';
import SendReportDepartment from './team_leaders_pages/send_report_department';
import LoginPage from './login';
import SignupPage from './signup';
import HomePage from './home_page';
function App() {
  return (
    <div className=''>
      <Routes>

          {/* Login Page */}
          <Route exact path='/signup' element={<SignupPage/>}/>
          <Route exact path='/login' element={<LoginPage/>}/>
          {/* Admin Routes */}
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/allcomplaintadmin' element={<AllComplaintAdmin/>}/>
          <Route path='/department' element={<DepartmentPageAdmin/>}/>
          <Route path='/statistics' element={<ComplaintStatistic/>}/>
          <Route path='/comparison' element={<ComparisonPage/>}/>
          <Route path='/userprofile' element={<ClientProfilePage/>}/>
          <Route path='/complaintdetails/:id' element={<ComplaintDetailsPage/>}/>
          <Route path='/completioncomplaint/:id' element={<CompletionSendCitizen/>}/>

          {/* Department Routes */}
          <Route path='/allcomplaintdep' element={<AllComplaintDep/>}/>
          
          <Route path="/complaintdetailsdev/:id" element={<ComplaintDetailsDevPage />} />
          <Route path='/workprogress' element={<WorkProgress/>}/>
          <Route path='/sendtocitizen/:id' element={<SendToCitizen/>}/>
          <Route path='/citizenfeedback' element={<CitizenFeedback/>}/>
          <Route path='/departmentprofile' element={<DepartmentProfile/>}/>

          {/* Team Leaders Routes */}
          <Route path='/allcomplaintleader' element={<AllComplaintLeader/>}/>
          <Route path='/complaintdetailsleader/:id' element={<ComplaintDetailsLeader/>}/>
          <Route path='/teamleaderprofile' element={<TeamLeaderProfile/>}/>
          <Route path='/createreport' element={<CreateReport/>}/>
          <Route path='/allreportleader' element={<AllReportsLeader/>}/>
          <Route path='/sendreportdepartment/:id' element={<SendReportDepartment/>}/>
      </Routes>
    </div>
  )
}

export default App
