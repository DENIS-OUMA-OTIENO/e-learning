import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Public from './components/Public';
import DashBoardLayout from './components/DashBoardLayout';
import ChooseUser from './features/auth/chooseUser';
import ShowStudents from './features/admin/student/ShowStudents';
import ShowClassRooms from './features/admin/classRoom/ShowClassRooms';
import NewClassRoomForm from './features/admin/classRoom/NewClassRoomForm';
import ViewAdmin from './features/admin/ViewAdmin';
import NewStudent from './features/admin/student/NewStudent';
import ShowTeachers from './features/admin/teacher/ShowTeachers';
import NewTeacher from './features/admin/teacher/NewTeacher';
import ShowSubjects from './features/admin/subject/ShowSubjects'
import NewSubject from './features/admin/subject/NewSubject';
import EditSubject from './features/admin/subject/EditSubject';
import ShowLesson from './features/admin/lesson/ShowLesson';
import ShowSubjectLesson from './features/admin/lesson/ShowSubjectLesson';
import NewLesson from './features/admin/lesson/NewLesson';
import ViewLesson from './features/admin/lesson/ViewLesson';
import AdminLogin from './features/admin/auth/AdminLogin';
import RequireAuth from './features/admin/auth/RequireAuth';
import Prefetch from './features/admin/auth/Prefetch';
import PersistLogin from './features/admin/auth/PersistLogin';
import NewAdmin from './features/admin/auth/NewAdmin';
import EditLesson from './features/admin/lesson/EditLesson';

function App() {
  return (
<Routes>
  <Route path='/' element={<Layout />}>
    <Route index element={<Public />}/>
    <Route path='login' element={<AdminLogin />}/>
    <Route path='register' element={<NewAdmin />}/>

        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRole={['Student', 'Admin', 'Teacher']}/>}>
        <Route element={<Prefetch />}>
        <Route path='dash' element={<DashBoardLayout />}>
         <Route index element={<ChooseUser />}/>
      
          {/* admin routes */}
          <Route path='profile'>
           <Route index element={<ViewAdmin />}/>         
         </Route>

         {/* students routes */}
         <Route element={<RequireAuth allowedRole={['Admin', 'Teacher']}/>}>
         <Route path='students'>
           <Route index element={<ShowStudents />}/> 
           <Route path='new'>
             <Route index element={<ShowClassRooms />}/>
            <Route path=':id' element={<NewStudent />} />
            </Route>   
         </Route>
         </Route>
         

         {/* classes routes */}
         <Route element={<RequireAuth allowedRole={['Admin', 'Teacher']}/>}>

          <Route path='classrooms'>
           <Route index element={<ShowClassRooms />}/>
            <Route path='new' element={<NewClassRoomForm />}/>
         </Route>
         </Route>

         {/* teachers routes */}
         <Route element={<RequireAuth allowedRole={['Admin', 'Teacher']}/>}>
         <Route path='teachers'>
            <Route index element={<ShowTeachers />} />
           <Route path='new' element={<NewTeacher />}/>
          </Route>
          </Route>

         {/* subjects routes */}
         <Route element={<RequireAuth allowedRole={['Admin', 'Teacher']}/>}>
          <Route path='subjects'>
           <Route index element={<ShowSubjects />} />
           <Route path='new'>
             <Route index element={<ShowClassRooms />}/>
            <Route path=':id' element={<NewSubject />} />
            </Route>
           <Route path=':id' element={<EditSubject />} />
         </Route>
         </Route>

         {/* lessons routes */}
         
          <Route path='lessons'>
          <Route index element={<ShowClassRooms />}/>
          <Route path='view/:id' element={<ViewLesson />} />
          <Route path=':className' element={<ShowSubjectLesson />} />
          <Route path=':className/:subjectName' element={<ShowLesson />} /> 
          <Route path='edit/:id' element={<EditLesson />} />
           <Route path='new'>
             <Route index element={<ShowClassRooms />}/>
             <Route path=':className' element={<ShowSubjectLesson />} />
             <Route path=':className/:subjectName' element={<NewLesson />} /> 
           </Route>            
                
         </Route>   

       </Route>      {/* dash */}
       </Route>
      </Route>
      </Route>
    
  </Route>
</Routes>
  );
}

export default App;
