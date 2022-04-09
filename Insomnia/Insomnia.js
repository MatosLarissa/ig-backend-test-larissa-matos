import axios from "axios";

// USER

// signup =>
const signup = {
    method: 'POST',
    url: 'https://ig-backend-test-larissa-matos.herokuapp.com/user/signup',
    headers: { 'Content-Type': 'application/json' },
    data: {
        name: 'Amanda',
        lastName: 'Fernanda',
        cpf: '24557587970',
        email: 'fm@email.com',
        password: 'tesTe12'
    }
};

axios.request(signup).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});


// login =>
const login = {
    method: 'POST',
    url: 'https://ig-backend-test-larissa-matos.herokuapp.com/user/login',
    headers: { 'Content-Type': 'application/json' },
    data: { email: 'fm@email.com', password: 'tesTe12' }
};

axios.request(login).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});


// update profile =>
const update = {
    method: 'PUT',
    url: 'https://ig-backend-test-larissa-matos.herokuapp.com/user/profile/update',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyODA4NDgwLTlmNjMtNDVmOS04ZmQ5LTYzY2M0ZGVjNGQ5YyIsImlhdCI6MTY0OTUzMDY4MiwiZXhwIjoxNjQ5NTMzNjgyfQ.wRNdRvHI_g3HTWEsOjpU4ySSWFyyUlzJxsOUwFXw0WM'
    },
    data: { name: 'Roberto', lastName: 'Lagosta' }
};

axios.request(update).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});


// TASK

// create task =>
const createTask = {
    method: 'POST',
    url: 'https://ig-backend-test-larissa-matos.herokuapp.com/task/creatTask',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyODA4NDgwLTlmNjMtNDVmOS04ZmQ5LTYzY2M0ZGVjNGQ5YyIsImlhdCI6MTY0OTUzMDY4MiwiZXhwIjoxNjQ5NTMzNjgyfQ.wRNdRvHI_g3HTWEsOjpU4ySSWFyyUlzJxsOUwFXw0WM'
    },
    data: {title: 'lavar', done: 'false', date: '2022/04/07'}
  };
  
  axios.request(createTask).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

 // Get all task by user => 
 const getAllTaskByUser = {
    method: 'GET',
    url: 'https://ig-backend-test-larissa-matos.herokuapp.com/task/',
    headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyODA4NDgwLTlmNjMtNDVmOS04ZmQ5LTYzY2M0ZGVjNGQ5YyIsImlhdCI6MTY0OTUzMDY4MiwiZXhwIjoxNjQ5NTMzNjgyfQ.wRNdRvHI_g3HTWEsOjpU4ySSWFyyUlzJxsOUwFXw0WM'
    }
  };
  
  axios.request(getAllTaskByUser).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

 // Get task by id or status => 
const getTaskByIdOrStatus = {
  method: 'GET',
  url: 'https://ig-backend-test-larissa-matos.herokuapp.com/task/getTask',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyODA4NDgwLTlmNjMtNDVmOS04ZmQ5LTYzY2M0ZGVjNGQ5YyIsImlhdCI6MTY0OTUzMDY4MiwiZXhwIjoxNjQ5NTMzNjgyfQ.wRNdRvHI_g3HTWEsOjpU4ySSWFyyUlzJxsOUwFXw0WM'
  },
  data: {done: 'true'}
};

axios.request(getTaskByIdOrStatus).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

 // Update task => 
 const updateTask = {
    method: 'PUT',
    url: 'https://ig-backend-test-larissa-matos.herokuapp.com/task/update/07587169-35a9-41cc-9e9d-c03b538150f8',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyODA4NDgwLTlmNjMtNDVmOS04ZmQ5LTYzY2M0ZGVjNGQ5YyIsImlhdCI6MTY0OTUzMDY4MiwiZXhwIjoxNjQ5NTMzNjgyfQ.wRNdRvHI_g3HTWEsOjpU4ySSWFyyUlzJxsOUwFXw0WM'
    },
    data: {title: 'comer'}
  };
  
  axios.request(updateTask).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

 // Delete task => 
 const deleteTask = {
    method: 'DELETE',
    url: 'https://ig-backend-test-larissa-matos.herokuapp.com/task/delete/07587169-35a9-41cc-9e9d-c03b538150f8',
    headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgyODA4NDgwLTlmNjMtNDVmOS04ZmQ5LTYzY2M0ZGVjNGQ5YyIsImlhdCI6MTY0OTUzMDY4MiwiZXhwIjoxNjQ5NTMzNjgyfQ.wRNdRvHI_g3HTWEsOjpU4ySSWFyyUlzJxsOUwFXw0WM'
    }
  };
  
  axios.request(deleteTask).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
