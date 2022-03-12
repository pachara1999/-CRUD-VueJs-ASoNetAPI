const employee = {template: `
</br>
<div>
    <div class="d-flex flex-row-reverse">
        <div class="p-2 bd-highlight">
            <button type="button" class="btn btn-primary m-2 fload-end"
            data-bs-toggle="modal" data-bs-target="#exampleModal"
            @click="addClick()"> 
                Add Employee
            </button>
        </div>
    </div>
    

    <table class="table table-striped text-center">
        <thead>
            <tr>
                <th>
                Employee Id
                </th>
                <th>
                    Employee Name
                </th>
                <th>
                    Department
                </th>
                <th>
                    DOJ
                </th>
                <th>
                Options
                </th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="emp in employees">
            <td>{{ emp.EmployeeId }}</td>
            <td>{{ emp.EmployeeName }}</td>
            <td>{{ emp.Department }}</td>
            <td>{{ emp.DateOfJoining }}</td>
            <td>
                <button type="button" class="btn btn-light mr-1"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                @click="editClick(emp)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
                <button type="button" @click="deleteClick(emp.EmployeeId)"
                class="btn btn-light mr-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </td>
        </tr>
        </tbody>
    </table>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex flex-row bd-highlight mb-3">
                        <div class="p-2 w-50 bd-highlight">
                            <div class="input-group mb-3">
                                <span class="input-group-text">Employee Name</span>
                                <input type="text" class="form-control" v-model="EmployeeName">
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Department</span>
                                <select class="form-select" v-model="Department">
                                    <option v-for="dep in departments">
                                        {{ dep.DepartmentName }}
                                    </option>
                                </select>
                            </div>

                            <div class="input-group mb-3">
                                <span class="input-group-text">Date Of Join</span>
                                <input type="date" class="form-control" v-model="DateOfJoining">
                            </div>
                        </div>
                        <div class="p-2 w-50 bd-highlight">
                            <img width="250px" height="250px" src="PhotoPath+PhotoFileName" />
                            <input type="file" class="m-2" @change="imageUpload()">
                        </div>
                    </div>
                    <button type="button" @click="createClick()"
                    v-if="EmployeeId==0" class="btn btn-primary">
                        Create
                    </button>
                    <button type="button" @click="updateClick()"
                    v-if="EmployeeId!=0" class="btn btn-primary">
                        Update
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>`,

  data() {
    return {
      departments: [],
      employees:[],
      modalTitle : "",
      EmployeeId: 0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png",
      PhotoPath : variables.PHOTO_URL,
      EmployeesWithoutFilter : []
    };
  },
  methods: {
    refreshData() {
      axios.get(variables.API_URL + "employee").then((response) => {
        this.employees = response.data;
      });

      axios.get(variables.API_URL + "department").then((response) => {
        this.departments = response.data;
      });
    },
    addClick() {
        this.modalTitle = "Add Employee";
        this.EmployeeId = 0;
        this.EmployeeName = "" ;
        this.Department = "" ;
        this.DateOfJoining = "" ;
        this.PhotoFileName = "anonymous.png";
    },
    editClick(emp) {
        this.modalTitle = "Edit Employee";
        this.EmployeeId = emp.EmployeeId;
        this.EmployeeName = emp.EmployeeName ;
        this.Department = emp.Department ;
        this.DateOfJoining = emp.DateOfJoining ;
        this.PhotoFileName = emp.PhotoFileName ;
    },
    createClick() {
        axios.post(variables.API_URL+"employee", {
            EmployeeName : this.EmployeeName,
            Department : this.Department,
            DateOfJoining : this.DateOfJoining,
            PhotoFileName : this.PhotoFileName
        }).then((response) => {
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick() {
        axios.put(variables.API_URL+"employee", {
            EmployeeId : this.EmployeeId,
            EmployeeName : this.EmployeeName,
            Department : this.Department,
            DateOfJoining : this.DateOfJoining,
            PhotoFileName : this.PhotoFileName
        }).then((response) => {
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id) {
        if(!confirm('Are you sure you want to delete this ?'))
        {
            return;
        }
        axios.delete(variables.API_URL+"employee/"+id)
        .then((response) => {
            this.refreshData();
            alert(response.data);
        });
    },
    imageUpload(event){
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        axios.post(
            variables.API_URL + "employee/savefile",          
        formData)
        .then((response) => {
            this.PhotoFileName = response.data;
        });
    },
  },
  mounted: function () {
    this.refreshData();
  },
};
