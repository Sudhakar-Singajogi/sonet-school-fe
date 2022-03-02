import React from 'react';

function Login() {
    console.log('hey am login');
    sessionStorage.setItem("accessToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQXJ1biIsImVtYWlsIjoibGF0aGEubW9oYW5AbWFpbGluYXRvciIsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJzY2hvb2xJZCI6MSwiaWF0IjoxNjM4OTY3NjkzLCJleHAiOjE2MzkwNjM2OTN9.BwpuZJCCFvemMhx2CWwUgFdhodN0Pop4fCyzzjTBJNk");
    sessionStorage.setItem("refreshToken", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiQXJ1biIsImVtYWlsIjoibGF0aGEubW9oYW5AbWFpbGluYXRvciIsInVzZXJJZCI6MSwicm9sZUlkIjoxLCJzY2hvb2xJZCI6MSwiaWF0IjoxNjM4OTY3NjkzfQ.jTtraQ33DbfGYQ5FkozYVt2Cod_ACh7yenCoTu2Fyn4");
  return (<div><h2>Hello Login page</h2></div>);
}

export default Login;
