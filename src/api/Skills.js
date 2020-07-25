import api from './api';

async function getSkills() {
    return await api().get('skills')
}

export default {
    getSkills
}