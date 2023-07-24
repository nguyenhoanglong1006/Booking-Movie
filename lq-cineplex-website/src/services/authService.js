import request from '~/utils/request';

const register = (username, email, password, role) => {
    try {
        return request.post('auth/signup', {
            username,
            email,
            password,
            role,
        });
    } catch (err) {
        console.log(err);
    }
};

const login = async (username, password) => {
    return request
        .post('auth/signin', {
            username,
            password,
        })
        .then((response) => {
            if (response.data.username) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = async () => {
    localStorage.removeItem('user');
    return request.post('auth/signout').then((response) => {
        return response.data;
    });
};

export async function getAccountUserById(id) {
    try {
        const res = await request.get(`auth/user/${id}`);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

export async function updateAccountUser(userAcc) {
    try {
        const res = await request.put('auth/user', userAcc);
        return res.data;
    } catch (e) {
        console.log(e);
    }
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    getAccountUserById,
    updateAccountUser,
};

export default AuthService;
