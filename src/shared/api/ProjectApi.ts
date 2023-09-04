import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5182/api/",
});


instance.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Access-Control-Allow-Origin"] = "*";
    return config;
});

function getProject(id : string){
    return instance.get(`/projects/${id}`, )
        .then(response => {
            return {
                status: response.status,
                data: response.data
            };
        })
        .catch(error => {
            return {
                data: "error",
                status: error.response.status,
                error: error.response.statusText
            };
        })
}
function getProjects(){
    return instance.get('/projects')
        .then(response => {
            return{
                status: response.status,
                data: response.data
            }
        })
        .catch(error => {
            return {
                data: "error",
                status: error.status,
                message: error.response
            };
        })
}

export const projectApi = {
    project: getProject,
    projects: getProjects,
}