import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { userRows } from "./datatablesource";
import Services from "./components/services/Services";
import NewRole from "./components/newrole/Newrole";
import Designation from "./components/Designation/Designation";
import Academic from "./components/academic/Academic";
import Department from "./Departments/Department";
import Categories from "./components/categories/Categories";
import StudentGrade from "./components/grade/StudentGrade";
import Subjects from "./components/subjects/Subjects";
import SubjectsFaculties from "./components/subjects/SubjectsFaculties";
import StudentAttendance from "./components/students/StudentAttendance";
import Announcements from "./components/announcement/Announcements";
import StudentManagement from "./components/students/StudentManagement";

import EditRole from "./components/EditRole/EditRole";
import EditRolePage from "./EditRolepage";
import AddEditStudent from "./components/students/AddEditStudent";
import EmployeeManagement from "./employee/EmployeeManagement";
import AddEditEmployee from "./employee/AddEditEmployee";
import EmployeeLeaveManagement from "./employee/EmployeeLeaveManagement";
import AddEditEmployeeLeave from "./employee/AddEditEmployeeLeave";
import EmployeeAttendanceManagement from "./employee/EmployeeAttendanceManagement";
import AddEditAttendance from "./employee/AddEditAttendance";
import InstituteManagement from "./institute/InstituteManagement";
import AddEditInstitute from "./institute/AddEditInstitute";
import LeaveTypes from "./leaves/LeaveTypes";
import LeaveTypesTable from "./institute/InstituteTable";
import StudentHostelFee from "./hostel/StudentHostelFee";
import StudentHostelFeeTable from "./hostel/StudentHostelFeeTable";
import AddEditStudentHostelFee from "./hostel/AddEditStudentHostelFee";
import FeeCategories from "./fee/FeeCategories";
import AddEditFeeCategory from "./fee/AddEditFeeCategory";
import Reports from "./reports/Reports";
import AddEditReport from "./reports/AddEditReport";
import StudentHostelAttendance from "./hostel/StudentHostelAttendance";
import AddEditStudentHostelAttendance from "./hostel/AddEditStudentHostelAttendance";
import Items from "./items/Items";
import AddEditItem from "./items/AddEditItem";
import AddEditOrderItems from "./items/AddEditOrderItems";
import ItemOrderPage from "./items/ItemOrderPage";
import LeaveBalancesPage from "./leaves/LeaveBalancesPage";
import AddEditLeaveBalance from "./leaves/AddEditLeaveBalance";
import VendorPage from "./vendor/VendorPage";
import AddEditVendor from "./vendor/AddEditVendor";
import PayslipsPage from "./payslips/PayslipsPage";
import AddEditPayslip from "./payslips/ADdEditPaySlip";
import PayrollTransactionsPage from "./payslips/PayrollTransactionsPage";
import AddEditPayrollTransaction from "./payslips/AddEditPayrollTransaction";
import OvertimeRecordsPage from "./payslips/OvertimeRecordsPage";
import AddEditOvertimeRecord from "./payslips/AddEditOvertimeRecord";
import BonusesPage from "./payslips/Bonusespage";
import AddEditBonus from "./payslips/AddEditBonus";
import EmployeeLoansPage from "./payslips/EmployeeLoansPage";
import AddEditEmployeeLoan from "./payslips/AddEditEmployeeLoan";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const [users, setUsers] = useState(userRows);

  const handleAddUser = (user) => {
    const newUserID = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    user = { ...user, id: newUserID };
    setUsers([...users, user]);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />

          {/* Users Routes */}
          <Route path="users">
            <Route index element={<List data={users} setUsers={setUsers} />} />
            <Route path=":userId" element={<Single />} />
            <Route path="new" element={<New inputs={userInputs} onAddUser={handleAddUser} title="Add New User" />} />
          </Route>

          {/* Services Routes */}
          <Route path="services">
            <Route index element={<Services />} />
            <Route path=":serviceId" element={<Single />} />
            <Route path="new" element={<New inputs={productInputs} title="Add New Product" />} />
          </Route>

        

          {/* New Role Route */}
          <Route path="newrole" element={<NewRole title="Add New Role" />} />

          {/* Edit Route (Ensure This Has a Proper Component) */}
          <Route path="edit"></Route>

          <Route path="des" element={<Designation />} />
          <Route path="academic" element={<Academic />} />

          <Route path="department" element={<Department />} />
          <Route path="categories" element={<Categories />} />
          <Route path="grade" element={<StudentGrade />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="subjectfac" element={<SubjectsFaculties />} />
          <Route path="attend" element={<StudentAttendance />} />
          {/* <Route path="announcement" element={<Announcements />} /> */} 

          <Route path="student-management" element={<StudentManagement />} />
          <Route path="edits" element={<EditRolePage />} />
          <Route path="add-student" element={<AddEditStudent />} />
          <Route path="add-employee" element={<AddEditEmployee />} />

          <Route path="employee-management" element={<EmployeeManagement />} />
          <Route path="leave-management" element={<EmployeeLeaveManagement />} />

          <Route path="add-employee-leave" element={<AddEditEmployeeLeave />} />
          <Route path="/employee-attendance" element={<EmployeeAttendanceManagement/>} />
<Route path="/add-attendance/:id?" element={<AddEditAttendance />} />
<Route path="add-employee" element={<AddEditEmployee />} />
<Route path="institutes/" element={<InstituteManagement />} />
<Route path="add-institute" element={<AddEditInstitute />} />
<Route path="leave-types" element={<LeaveTypes />} />
<Route path="add-leave-type" element={<LeaveTypesTable />} />

<Route path="student-hostel-fee" element={<StudentHostelFee />} />
<Route path="add-student-hostel-fee" element={<AddEditStudentHostelFee />} />
<Route path="fee-categories" element={<FeeCategories />} />
<Route path="add-fee-category" element={<AddEditFeeCategory />} />
<Route path="reports" element={<Reports />} />

<Route path="add-report" element={<AddEditReport />} />

<Route path="student-hostel-attendance" element={<StudentHostelAttendance />} />

<Route path="add-student-hostel-attendance" element={<AddEditStudentHostelAttendance />} />
<Route path="items" element={<Items />} />

<Route path="add-item" element={<AddEditItem />} />
<Route path="add-item-order" element={<ItemOrderPage />} />
<Route path="add-order" element={<AddEditOrderItems />} />

<Route path="leave-balance" element={<LeaveBalancesPage />} />
<Route path="add-leave-balance" element={<AddEditLeaveBalance />} />
<Route path="vendors" element={<VendorPage />} />
<Route path="add-vendor" element={<AddEditVendor />} />
<Route path="payslips" element={<PayslipsPage />} />

<Route path="add-payslip" element={<AddEditPayslip />} />
<Route path="payroll-transactions" element={<PayrollTransactionsPage />} />
<Route path="add-payroll-transaction" element={<AddEditPayrollTransaction />} />
<Route path="overtime" element={<OvertimeRecordsPage />} />
<Route path="add-overtime-record" element={<AddEditOvertimeRecord />} />
<Route path="bonuses" element={<BonusesPage />} />
<Route path="add-bonus" element={<AddEditBonus />} />
<Route path="employee-loans" element={<EmployeeLoansPage />} />
<Route path="add-employee-loan" element={<AddEditEmployeeLoan />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
