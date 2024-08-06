import axios from 'axios';

const useProjectStore = axios.create({
    baseURL: 'http://localhost:8080/project',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export default {
    createPost(postData, files) {
        const formData = new FormData();
        formData.append('req', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
        files.forEach(file => {
            formData.append('files', file);
        });
        return useProjectStore.post('/create', formData)
            .catch(error => {
                console.error('Error creating post:', error.response ? error.response.data : error.message);
                throw error;
            });
    },
    readPost(idx) {
        return useProjectStore.get('/read', { params: { idx } })
            .catch(error => {
                console.error('Error reading post:', error.response ? error.response.data : error.message);
                throw error;
            });
    },
    readAllPosts() {
        return useProjectStore.get('/read-all')
            .catch(error => {
                console.error('Error reading all posts:', error.response ? error.response.data : error.message);
                throw error;
            });
    },
    updatePost(postData, files) {
        const formData = new FormData();
        formData.append('req', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
        if (files) {
            files.forEach(file => {
                formData.append('files', file);
            });
        }
        return useProjectStore.put('/update', formData)
            .catch(error => {
                console.error('Error updating post:', error.response ? error.response.data : error.message);
                throw error;
            });
    },
    deletePost(idx) {
        return useProjectStore.delete('/delete', { params: { idx } })
            .catch(error => {
                console.error('Error deleting post:', error.response ? error.response.data : error.message);
                throw error;
            });
    }
};