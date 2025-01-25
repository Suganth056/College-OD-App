import React from 'react';
import './App.css';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
// import AdminDashboardRoot from './Layout_Folder/AdminDashboardRoot';

import SideNavBar from './LoginPages/SideNavBar';
import SignUpStudent from './StudentsFolder/SignUpStudent';
import AdvisorLogin from './AdvisorFolder/AdvisorLogin';
import SignUpAdvisor from './AdvisorFolder/SignUpAdvisor';
import LoginHOD from './HOD_Folder/LoginHOD';
import SignUpHOD from './HOD_Folder/SignUpHOD';
import LoginPrincipal from './PrincipalFolder/LoginPrincipal';
import SignUpPrincipal from './PrincipalFolder/SignUpPrincipal';
import LoginAdmin from './Admin_Folder/LoginAdmin';
import SignUpAdmin from './Admin_Folder/SignUpAdmin';



import StudentDashBoard from './StudentsFolder/OD_INFO_FOLDER/NextPages/StudentDashBoard';
import StudentReqPage from './StudentsFolder/OD_INFO_FOLDER/NextPages/StudentReqPage';
import StudentEditProfile from './StudentsFolder/OD_INFO_FOLDER/NextPages/StudentEditProfile';
import StudentInnerRoot from './Layout_Folder/StudentInnerRoot';
import InnerDetail from './StudentsFolder/OD_INFO_FOLDER/NextPages/InnerDetail';


// Advisor Profile Opening......

import AdvisorRoot from './Layout_Folder/AdvisorRoot';
import AdvisorDashboard from './AdvisorFolder/NextPageComponents/AdvisorDashboard';
import AdvisorEditProfile from './AdvisorFolder/NextPageComponents/AdvisorEditProfile';
import StudentODDetail from './Common/StudentODDetail';
import AdvisorInnerRoot from './Layout_Folder/AdvisorInnerRoot';

// Advisor Profile Closing ..........


// hod Profile Opening......

import HODRoot from './Layout_Folder/HODRoot'
import HodDashboard from './HOD_Folder/NextComponents/HodDashboard';
import HodEditProfile from './HOD_Folder/NextComponents/HodEditProfile';
import HodInnerRoot from './Layout_Folder/HodInnerRoot';

// hod Profile Closing ..........

// principal Profile Opening......

import PrincipalRoot from './Layout_Folder/PrincipalRoot';
import PrincipalDashBoard from './PrincipalFolder/NextComponents/PrincipalDashboard';
import PrincipalEditProfile from './PrincipalFolder/NextComponents/PrincipalEditProfile';
import PrincipalInnerRoot from './Layout_Folder/PrincipalInnerRoot';

// principal Profile Closing ..........


import AdminEntryRoot from './Layout_Folder/AdminEntryRoot';
import StudentEntry from './Admin_Folder/NEXT_PAGES/EntryPages/StudentEntry';
import AdvisorEntry from './Admin_Folder/NEXT_PAGES/EntryPages/AdvisorEntry';
import HODEntry from './Admin_Folder/NEXT_PAGES/EntryPages/HODEntry';
import PrincipalEntry from './Admin_Folder/NEXT_PAGES/EntryPages/PrincipalEntry';
import AdminEntry from './Admin_Folder/NEXT_PAGES/EntryPages/AdminEntry';


import LayoutRoot from './Layout_Folder/LayoutRoot';
import RootStudent from './Layout_Folder/RootStudent';
import AdminDashboardRoot from './Layout_Folder/AdminDashboardRoot';
import AdminEditProfile from './Admin_Folder/NEXT_PAGES/AdminEditProfile';

import NotFound from './Common/NotFound';



function App() {

  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/*' element={<LayoutRoot />}>
        <Route index element={<SideNavBar />}/>
        <Route path='studaccountcreation' element={<SignUpStudent />} />
        <Route path='advisorlogin' element={<AdvisorLogin />} />
        <Route path='advisorsignup' element={<SignUpAdvisor />} />
        <Route path='hodlogin' element={<LoginHOD />}/>
        <Route path='hodsignup' element={<SignUpHOD />}/>
        <Route path='principallogin' element={<LoginPrincipal />}/>
        <Route path='principalsignup' element={<SignUpPrincipal />}/>
        <Route path='adminlogin' element={<LoginAdmin />}/>
        <Route path='adminsignup' element={<SignUpAdmin />}/>

        <Route path='student-dashboard/*' element={<RootStudent />}>
          <Route path='dashboard' element={<StudentDashBoard/>} />
          <Route path='od-req-det/*' element={<StudentInnerRoot />}>
              <Route index element={<StudentReqPage />}/>
              <Route path='inner' element={<InnerDetail />}/>
          </Route>
          <Route path='edit-profile' element={<StudentEditProfile />} />
        </Route>


                  {/* Advisor Section Started */}
        
        <Route path='advisor-dashboard/*' element={<AdvisorRoot />}>
            <Route path='dashboard/*' element={<AdvisorInnerRoot />} >
                <Route index element={<AdvisorDashboard />} />
                <Route path='innerDetail' element={<StudentODDetail />}/>
            </Route>
            <Route path='edit-profile' element={<AdvisorEditProfile />} />
        </Route>
                      {/* Advisor Section Ended */}


                      {/* HOD Section Started */}

        <Route path='hod-dashboard/*' element={<HODRoot />}>
            <Route path='dashboard/*' element={<HodInnerRoot />} >
                <Route index element={<HodDashboard />} />
                <Route path='innerDetail' element={<StudentODDetail />}/>
            </Route>
            <Route path='edit-profile' element={<HodEditProfile />} />
        </Route>


                      {/* Hod Section Ended */}



                      {/* Principal Section Started */}

        <Route path='principal-dashboard/*' element={<PrincipalRoot />}>
            <Route path='dashboard/*' element={<PrincipalInnerRoot />} >
                <Route index element={<PrincipalDashBoard />} />
                <Route path='innerDetail' element={<StudentODDetail />}/>
            </Route>
            <Route path='edit-profile' element={<PrincipalEditProfile />} />
        </Route>


                      {/* Principal Section Ended */}


        <Route path='admin-dashboard/*' element={<AdminDashboardRoot />}> 
          
          <Route path='dashboard/*' element={<AdminEntryRoot />}>
             <Route path='student-entry' element={<StudentEntry />} />
             <Route path='advisor-entry' element={<AdvisorEntry />} />
             <Route path='HOD-entry' element={<HODEntry/>} />
             <Route path='principal-entry' element={<PrincipalEntry />} />
             <Route path='admin-entry' element={<AdminEntry />} />
            
          </Route>
          <Route path='edit-profile' element={<AdminEditProfile />} />
        </Route>


        <Route path="/*" element={<NotFound />} />
      </Route>





    )
  )
  return (
    <RouterProvider router={router} className="App">

    </RouterProvider>
  ); 
}



export default App;
