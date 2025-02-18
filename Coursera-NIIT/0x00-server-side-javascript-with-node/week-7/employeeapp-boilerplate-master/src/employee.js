const employeeList = [
  {
    id: "1",
    employeeName: "nameofemp",
    employeeSalary: 50000,
    employeeAge: 42,
    dateOfJoining: "2006-06-30T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "2",
    employeeName: "nameofemp2",
    employeeSalary: 35000,
    employeeAge: 52,
    dateOfJoining: "2003-09-15T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "3",
    employeeName: "nameofemp3",
    employeeSalary: 60000,
    employeeAge: 58,
    dateOfJoining: "2004-11-06T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "4",
    employeeName: "nameofemp4",
    employeeSalary: 5000,
    employeeAge: 50,
    dateOfJoining: "2005-03-17T00:00:00.000Z",
    profileImage: "image_url"
  },
  {
    id: "5",
    employeeName: "nameofemp5",
    employeeSalary: 50000,
    employeeAge: 36,
    dateOfJoining: "2010-07-07T00:00:00.000Z",
    profileImage: "image_url"
  }
]

const getEmployeeOverFifty = (employeeData) => new Promise((resolve, reject) => {
  if (employeeData.length == 0) {
    reject("Empty Array")
  } else {
    resolve(employeeData.filter((member) =>  member.employeeAge > 50).length)
  }
})

const getTotalNoOfDaysSinceJoining = (employeeData) => new Promise((resolve, reject) => {
  // Write the code here
  if (employeeData.length == 0) {
    reject("Empty Array")
  } else {
    resolve(employeeData.map(emp => Math.floor((new Date().getTime() - new Date(emp.dateOfJoining).getTime()) / (1000 * 3600 * 24))))
  }
}

)
// getTotalNoOfDaysSinceJoining(employeeList).then(res => console.log(res));
module.exports = { getEmployeeOverFifty, getTotalNoOfDaysSinceJoining }
