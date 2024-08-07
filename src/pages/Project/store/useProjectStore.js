import axios from 'axios';
import { ref } from 'vue';

const projectApi = axios.create({
    baseURL: 'http://localhost:8080/project',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const useProjectStore = () => {
    const projectDataList = ref([]);

    const readAllPosts = async () => {
        try {
            const response = await projectApi.get('/read-all');
            const data = Array.isArray(response.data) ? response.data : [];
            projectDataList.value = data.map(post => ({
                id: post.idx,
                projectTitle: post.title,
                projectDescription: post.contents,
                courseNum: post.courseNum,
                gitUrl: post.gitUrl,
                sourceUrl: post.sourceUrl,
                teamName: post.teamName,
                nameList: post.students
            }));
        } catch (error) {
            console.error('Error reading all posts:', error.response ? error.response.data : error.message);
            throw error;
        }
    };

    return {
        projectDataList,
        readAllPosts,
        createPost(postData, files) {
            const formData = new FormData();
            formData.append('req', new Blob([JSON.stringify(postData)], { type: 'application/json' }));
            files.forEach(file => {
                formData.append('files', file);
            });
            return projectApi.post('/create', formData)
                .catch(error => {
                    console.error('Error creating post:', error.response ? error.response.data : error.message);
                    throw error;
                });
        },
        readPost(idx) {
            return projectApi.get('/read', { params: { idx } })
                .catch(error => {
                    console.error('Error reading post:', error.response ? error.response.data : error.message);
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
            return projectApi.put('/update', formData)
                .catch(error => {
                    console.error('Error updating post:', error.response ? error.response.data : error.message);
                    throw error;
                });
        },
        deletePost(idx) {
            return projectApi.delete('/delete', { params: { idx } })
                .catch(error => {
                    console.error('Error deleting post:', error.response ? error.response.data : error.message);
                    throw error;
                });
        }
    };
};