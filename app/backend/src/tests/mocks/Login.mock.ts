import { IUser } from '../../Interfaces/users/IUser';

export const userMock: IUser = {
  id: 1,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
    // senha: secret_user
};

export const correctLoginBody = {
  email: 'user@user.com',
  password: 'secret_user'
};

export const incorrectLoginBody = {
  email: 'wrogn@email.com',
  password: 'incorrect_password'
};

export const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODc2NDU3OTUsImV4cCI6MTY4NzczMjE5NX0.u7b03Ijisf4j7gfFH1AUo5SZ-SOXJkX7Fu-Shkx_p0A';