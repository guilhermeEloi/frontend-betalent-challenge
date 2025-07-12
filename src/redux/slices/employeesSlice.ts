import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  id: number;
  name: string;
  job: string;
  phone: string;
  admission_date: string;
  image: string;
}

interface EmployeesState {
  employees: Employee[];
  filteredEmployees: Employee[];
  searchValue: string;
}

const initialState: EmployeesState = {
  employees: [],
  filteredEmployees: [],
  searchValue: "",
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<Employee[]>) {
      state.employees = action.payload;
      state.filteredEmployees = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    filterEmployees(state) {
      const value = state.searchValue.toLowerCase().trim();

      if (!value) {
        state.filteredEmployees = state.employees;
        return;
      }

      state.filteredEmployees = state.employees.filter((item) =>
        [item.name, item.job, item.phone].some((field) =>
          field.toLowerCase().includes(value)
        )
      );
    },
    resetFilteredEmployees(state) {
      state.filteredEmployees = state.employees;
      state.searchValue = "";
    },
  },
});

export const {
  setEmployees,
  setSearchValue,
  filterEmployees,
  resetFilteredEmployees,
} = employeesSlice.actions;

export default employeesSlice.reducer;
